import { Router } from "express"
import { 
    getAllBill,
    getUnpaidBillOfficer,
    getPaidBillOfficer,
    postPayBillOfficer,
} from "../controllers/BillController"
import { jwtMiddleware } from "../utils/AuthUtil"

const billRouter = Router()

billRouter.get("/bills", jwtMiddleware(), getAllBill)

billRouter.get('/bills/paid', jwtMiddleware(), getPaidBillOfficer)

billRouter.get('/bills/unpaid', jwtMiddleware(), getUnpaidBillOfficer)

billRouter.post('/bills/pay', jwtMiddleware(), postPayBillOfficer)

// Disabled
// billRouter.post('/bills', jwtMiddleware(), postCreateUserHandler)


export {
    billRouter,
}