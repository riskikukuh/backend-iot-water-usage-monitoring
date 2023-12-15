import { notificationRouter } from "../route/NotificationRoute"
import { 
    getAll, 
    pushFCMNotification, 
    setAllNotifRead, 
    setNotifReadOn, 
    verifyNotification,
    create,
} from "../services/NotificationService"
import { NotificationType } from "../utils/NotificationUtil"
import { 
    GetNotificationsValidator, 
    ReadNotificationValidator,
} from "../utils/validator/NotificationValidator"
import { validate } from "../utils/validator/ValidatorUtil"

async function testPush(req, res, next) {
    try {
        const idPelangganDemo1 = "c47158fd-069d-40ae-bb10-9bdfe1b6fd56"
        await pushFCMNotification(idPelangganDemo1, "Test title", "Test description", NotificationType.ALERT)
        res.json({
            success: true,
        })
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function getAllNotif(req, res, next) {
    try {
        const { id } = req.auth
        const { type, read } = req.query
        const errorCheck = new GetNotificationsValidator()
        errorCheck.type = type?.toUpperCase()
        errorCheck.read = read

        await validate(errorCheck)

        const notifications = await getAll(id, errorCheck.typeStrToNotifType(), errorCheck.read)
        res.statusCode = 200
        res.json({
            success: true,
            data: notifications,
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

async function readSingleNotification(req, res, next) {
    try {
        const { id } = req.auth
        const { notificationId } = req.params

        const body = new ReadNotificationValidator()
        body.notificationId = notificationId

        await validate(body)
        
        await verifyNotification(notificationId, id)

        await setNotifReadOn(notificationId)

        res.status(200).json({
            success: true,
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

async function readAllNotification(req, res, next) {
    try {
        const { id } = req.auth
        await setAllNotifRead(id)
        res.status(200).json({
            success: true,
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

export {
    getAllNotif,
    readSingleNotification,
    readAllNotification,
    testPush
}