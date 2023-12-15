import * as schedule from "node-schedule"
import { AppDataSource } from "./data-source"
import { createBillNonApi } from "./controllers/BillController"
import { getAllUser } from "./services/UserService"
import { UserRole } from "./utils/RoleUtil"
import { initializeFCM } from "./services/NotificationService"

AppDataSource.initialize().then(async () => {
    
    initializeFCM()

    console.log("Start Bill Service")
    
    schedule.scheduleJob('0 0 L * *', async function() {

        const now = new Date()
        now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()

        const allUser = await getAllUser(true, UserRole.CUSTOMER)
        for (let i = 0; i < allUser.length; i++) {
            const user = allUser[i]
            const { id, firstname } = user

            const startDate = +new Date(year, month - 1, 1, 0, 0, 0)
            const endDate = +new Date(year, month, day, 0, 0, 0)

            console.log(`# Generating bill for 1 month for ${firstname}, start: ${+startDate} end: ${+endDate}`)
            const billId = await createBillNonApi(id, startDate, endDate)

            // const aggregateId = await create(id, startDate, endDate)
            console.log(`Success make bill with id: ${billId}`)
        }
    })
})