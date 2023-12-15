import { Router } from "express"
import { 
    addWaterUsageHandler, 
    getTodayWaterUsageHandler, 
    getHistoyWaterUsageHandler,
    getMonthlyWaterUsageHandler,
} from "../controllers/WaterUsageController"
import { jwtMiddleware } from "../utils/AuthUtil"

const waterUsageRouter = Router()

/* Insert water usage */
waterUsageRouter.post("/waterUsage", addWaterUsageHandler)

/* Get Water usage for today */
waterUsageRouter.get("/waterUsage/today", jwtMiddleware(), getTodayWaterUsageHandler)

waterUsageRouter.get("/waterUsage/monthly", jwtMiddleware(), getMonthlyWaterUsageHandler)

/* Get History Water usage */
waterUsageRouter.get("/waterUsage/history", jwtMiddleware(), getHistoyWaterUsageHandler)

export {
    waterUsageRouter,
}