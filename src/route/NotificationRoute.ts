import { Router } from "express"
import { 
    getAllNotif,
    readAllNotification,
    readSingleNotification,
    testPush,
} from "../controllers/NotificationController"
import { jwtMiddleware } from "../utils/AuthUtil"

const notificationRouter = Router()

notificationRouter.get("/notifications", jwtMiddleware(), getAllNotif)

notificationRouter.post("/notifications/read/:notificationId", jwtMiddleware(), readSingleNotification)

notificationRouter.post("/notifications/read", jwtMiddleware(), readAllNotification)

notificationRouter.post("/testing", testPush)

export {
    notificationRouter,
}