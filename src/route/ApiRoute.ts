import { Router } from "express"
import { AuthError } from "../utils/errors/AuthError";
import { configRouter } from "../route/ConfigRoute"
import { authRouter } from "../route/AuthRoute"
import { userRouter } from "../route/UserRoute"
import { waterUsageRouter } from "../route/WaterUsageRoute"
import { notificationRouter } from "../route/NotificationRoute"
import { billRouter } from "../route/BillRoute"

const apiRouter = Router()

apiRouter.use('/api', authRouter)
apiRouter.use('/api', userRouter)
apiRouter.use('/api', waterUsageRouter)
apiRouter.use('/api', notificationRouter)
apiRouter.use('/api', configRouter)
apiRouter.use('/api', billRouter)

export {
    apiRouter,
}