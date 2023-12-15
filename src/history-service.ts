import * as schedule from "node-schedule"
import { AppDataSource } from "./data-source"
import { create } from "./services/HistoryService"
import { getAllUser } from "./services/UserService"
import { UserRole } from "./utils/RoleUtil"

AppDataSource.initialize().then(async () => {
    console.log("Start History Service")
    
    // const userIdTesting = '9d0a806d-0fd5-4558-bedf-f9e5a660a246'

    schedule.scheduleJob('0 0 * * *', async function() {

        const now = new Date()
        now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()

        const allUser = await getAllUser(true, UserRole.CUSTOMER)
        for (let i = 0; i < allUser.length; i++) {
            try {
                const user = allUser[i]
                const { id } = user

                const startDate = +new Date(year, month, day - 1, 0, 0, 0)
                const endDate = +new Date(year, month, day, 0, 0, 0)

                console.log(`# Aggregating usage for 1 day, start: ${startDate} end: ${endDate}`)

                const aggregateId = await create(id, startDate, endDate)
                console.log(`Success make aggregate with id: ${aggregateId}`)
            } catch (err) {
                console.error(`History Scheduler error: ${err}`)
            }            
        }
    })
})