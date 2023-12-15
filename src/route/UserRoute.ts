import { Router } from "express"
import { 
    getProfileHandler,
    postCreateUserHandler,
    updateConfiguration,
    getOfficerUsers,
} from "../controllers/UserController"
import { jwtMiddleware } from "../utils/AuthUtil"

const userRouter = Router()

// Officer
userRouter.get("/users", jwtMiddleware(), getOfficerUsers)

userRouter.get("/user/profile", jwtMiddleware(), getProfileHandler)

userRouter.post('/user', postCreateUserHandler)

userRouter.post('/user/config', jwtMiddleware(), updateConfiguration)


export {
    userRouter,
}