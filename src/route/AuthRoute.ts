import { Router } from "express"
import { 
    postLoginHandler,
} from "../controllers/AuthController"

const authRouter = Router()

authRouter.post("/auth/login", postLoginHandler)

export {
    authRouter,
}