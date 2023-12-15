import { Router } from "express"
import { 
    getTresholdHandler,
    getTresholdSystemHandler,
    setTimeNotificationMutedHandler,
    setTresholdHandler,
    setTresholdSystemHandler,
} from "../controllers/ConfigController"

const configRouter = Router()

configRouter.get("/config/tresholdSystem", getTresholdSystemHandler)

configRouter.post("/config/tresholdSystem", setTresholdSystemHandler)

configRouter.get("/config/treshold", getTresholdHandler)

configRouter.post("/config/treshold", setTresholdHandler)

configRouter.post("/config/muteNotification", setTimeNotificationMutedHandler)

export {
    configRouter,
}