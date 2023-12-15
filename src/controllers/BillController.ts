import { User } from "../entity/User"
import {
    getAll,
    create,
    getPaidBillByStatus,
    getBillById,
    editStatusBill,
} from "../services/BillService"
import {
    getProfile, getUserById
} from "../services/UserService"
import {
    getUsageAndPriceByDate
} from "../services/HistoryService"
import { getUnit } from "../services/ConfigService"
import {
    pushFCMNotification, 
    create as createNotification
} from "../services/NotificationService"
import { NotificationType } from "../utils/NotificationUtil"
import { UnauthorizedError } from "../utils/errors/UnauthorizedError"
import { BillStatus } from "../utils/BillUtil"
import { PostPayBillOfficerValidator } from "../utils/validator/BillValidator"
import { validate } from "../utils/validator/ValidatorUtil"
import { UserRole } from "../utils/RoleUtil"

const monthNames = [
    "Januari", 
    "Februari", 
    "Maret", 
    "April", 
    "Mei", 
    "Juni",
    "Juli", 
    "Agustus", 
    "September", 
    "Oktober", 
    "November", 
    "Desember"
];

async function getAllBill(req, res, next) {
    try {
        const { id } = req.auth
        const bills = await getAll(id)
        res.status(200).json({
            success: true,
            data: bills,
        })
    } catch (err) {
        next(err)
    }
}

async function postPayBillOfficer(req, res, next) {
    try {
        const { id } = req.auth
        const user = await getUserById(id)
        if (user.role.toUpperCase() != UserRole.OFFICER) {
            throw new UnauthorizedError()
        }
        const { bill_id, status } = req.body
        const schema = new PostPayBillOfficerValidator()
        schema.bill_id = bill_id
        schema.status = status
        await validate(schema)

        const bill = await getBillById(bill_id)
        const billDate = new Date(bill.start_date)
        const localMonth = monthNames[billDate.getMonth()]

        await editStatusBill(bill_id, status)

        if (status == BillStatus.PAID) {
            const title = `Pembayaran berhasil untuk bulan ${localMonth}!`
            const description = `Tagihan pemakaian air anda telah lunas untuk bulan ${localMonth}`
            await pushFCMNotification(bill.user_id, title, description, NotificationType.ALERT)
        }
        
        res.status(200).json({
            success: true
        })
    } catch (err) {
        next(err)
    }
}

async function getPaidBillOfficer(req, res, next) {
    try {
        const { id } = req.auth
        const user = await getUserById(id)
        if (user.role.toUpperCase() != UserRole.OFFICER) {
            throw new UnauthorizedError()
        }
        const newBills = []
        const bills = await getPaidBillByStatus(BillStatus.PAID);
        bills.forEach((bill) => {
            const temp = bill
            const { user, user_id, ...billData} = temp
            const newBill = {
                ...billData,
                user: {
                    id: user_id,
                    firstname: user.firstname,
                    email: user.email,
                    address: user.address,
                },
            }
            newBills.push(newBill)
        })
        res.status(200).json({
            success: true,
            data: newBills,
        })
    } catch (err) {
        next(err)
    }
}

async function getUnpaidBillOfficer(req, res, next) {
    try {
        const { id } = req.auth
        const user = await getUserById(id)
        if (user.role.toUpperCase() != UserRole.OFFICER) {
            throw new UnauthorizedError()
        }
        const newBills = []
        const bills = await getPaidBillByStatus(BillStatus.UNPAID);
        bills.forEach((bill) => {
            const temp = bill
            const { user, user_id, ...billData} = temp
            const newBill = {
                ...billData,
                user: {
                    id: user_id,
                    firstname: user.firstname,
                    email: user.email,
                    address: user.address,
                },
            }
            newBills.push(newBill)
        })
        res.status(200).json({
            success: true,
            data: newBills,
        })
    } catch (err) {
        next(err)
    }
}

async function createBillNonApi(userId: string, startDate: number, endDate: number) {
    try {
        // const unit = await getUnit()
        const unit = "meter"
        const user = await getProfile(userId)
        const { totalUsage } = await getUsageAndPriceByDate(userId, startDate, endDate)
        const totalBill = Math.round(totalUsage * user.price_per_meter)
        // const billId = ''
        const billId = await create(userId, {
            waterUsage: totalUsage,
            startDate,
            endDate,
            nominal: totalBill,
            pricePerMeter: user.price_per_meter,
            unit,
        })
        const now = new Date(startDate)
        
        const thisMonthName = monthNames[now.getMonth()]

        const billTitle = `Tagihan untuk bulan ${thisMonthName}`
        const billDescription = `
            Halo tagihan untuk bulan ${thisMonthName} telah dibuat.
            Tagihan pemakaian air anda sebesar ${totalBill} dengan pemakaian sebesar ${totalUsage} ${unit}, dengan harga per meter ${user.price_per_meter}
        `

        if (billId) {
            const messageId = await pushFCMNotification(userId, billTitle, billDescription, NotificationType.REMINDER)
            await createNotification(userId, billTitle, billDescription, NotificationType.REMINDER, messageId)
        }

        return billId
    } catch (err) {
        console.error(`# createNonApi: ${err}`)
    }
}


// Disabled
// async function createBill(req, res, next) {
//     try {
//         const { id } = req.auth


//         const billId = await create(id, {})
//         res.status(201).json({
//             success: true,
//             data: 
//         })
//     } catch (err) {
//         next(err)
//     }
// }

export {
    getAllBill,
    createBillNonApi,
    getPaidBillOfficer,
    getUnpaidBillOfficer,
    postPayBillOfficer,
}