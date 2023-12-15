import { IsNull, MoreThan } from "typeorm";
import { NotificationType } from "../utils/NotificationUtil"
import { AppDataSource } from "../data-source";
import { Notification } from "../entity/Notification";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { AppOptions, credential, ServiceAccount, messaging } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

import * as serviceAccountKey from "../../service-accounts/firebase-adminsdk.json"
import { ClientError } from "../utils/errors/ClientError";
import { UnauthorizedError } from "../utils/errors/UnauthorizedError";

async function getAll(userId: string, typeParam: NotificationType | null = null, read: boolean | null = null): Promise<Notification[]> {
    try {
        const notifications = await AppDataSource.getRepository(Notification).find({
            where: {
                type: typeParam ? typeParam : null,
                user_id: userId,
                read_on: read != null ? read ? MoreThan(0) : 0 : null,
            },
            order: {
                created_at: 'DESC',
            }
        })

        return notifications
    } catch (err) {
        throw err
    }
}

function initializeFCM() {
    const serviceAccount = credential.cert(serviceAccountKey as ServiceAccount)
    initializeApp({
        credential: serviceAccount,
    })
}

async function pushFCMNotification(user_id: string, title: string, description: string, type: NotificationType): Promise<string> {
    const topic = `notifications.${user_id}`
    
    const message = {
        notification: {
            title,
            body: description,
        },
        topic,
    }

    const messageId = await messaging().send(message)
    await create(user_id, title, description, type, messageId)
    return messageId
}

async function create(user_id: string, title: string, description: string, type: NotificationType, messageId: string): Promise<string> {
    try {
        const notification = new Notification()
        notification.title = title
        notification.user_id = user_id
        notification.description = description
        notification.type = type
        notification.message_id = messageId
        notification.created_at = +new Date()

        const insertedNotification = await AppDataSource.getRepository(Notification).save(notification)
        return insertedNotification.id
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function verifyNotification(notifId: string, userId: string | null = null) {
    const notif = await AppDataSource.getRepository(Notification).findOneBy({
        id: notifId,
    })
    if (!notif) {
        throw new NotFoundError('Notification not found')
    }
    if (userId) {
        if (notif.user_id != userId) {
            throw new UnauthorizedError('Unauthorized Error!')
        }
    }
}

async function setNotifReadOn(notifId: string) {
    try {
        const notification = await AppDataSource.getRepository(Notification).findOne({
            where: {
                id: notifId,
                read_on: 0,
            }
        })
        if (notification) {
            notification.read_on = +new Date()
            await AppDataSource.getRepository(Notification).save(notification)
        }
    } catch (err) {
        throw err
    }
}

async function setAllNotifRead(userId: string): Promise<boolean> {
    try {
        const notifications = await AppDataSource.getRepository(Notification).findBy({
            read_on: 0,
            user_id: userId,
        })
        const time = +new Date()
        for (let i = 0; i < notifications.length; i++) {
            const notif = notifications[i]
            notif.read_on = time
        }
        await AppDataSource.getRepository(Notification).save(notifications)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export {
    create,
    setNotifReadOn,
    initializeFCM,
    pushFCMNotification,
    getAll,
    verifyNotification,
    setAllNotifRead,
}