import { AppDataSource } from "./data-source"
import { getUserById } from "./services/UserService"
import { createBillNonApi } from "./controllers/BillController"
import { initializeFCM, pushFCMNotification } from "./services/NotificationService"
import { NotificationType } from "./utils/NotificationUtil"
import { AppOptions, credential, ServiceAccount, messaging } from "firebase-admin";

AppDataSource.initialize().then(async () => {
    
    initializeFCM()

    const now = new Date()
    now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    const userId = 'c47158fd-069d-40ae-bb10-9bdfe1b6fd56'
    
    const topic = `notifications.${userId}`
    
    const message = {
        notification: {
            title: "Test title",
            body: "Test desc / body",
        },
        topic,
    }

    const messageId = await messaging().send(message)
    console.log(messageId);
})