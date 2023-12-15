import * as schedule from "node-schedule"
import { AppDataSource } from "./data-source"
import { create } from "./services/HistoryService"
import { getUserById } from "./services/UserService"
import { UserRole } from "./utils/RoleUtil"

AppDataSource.initialize().then(async () => {
    console.log("Manual History Service started")
    
    const targetUserId = 'c47158fd-069d-40ae-bb10-9bdfe1b6fd56'

    const now = new Date()
    now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    console.log(now)
    console.log(+now)

    const user = await getUserById(targetUserId)
    const { id } = user

    const startDate = +new Date(year, month, day - 1, 0, 0, 0)
    const endDate = +new Date(year, month, day, 0, 0, 0)

    console.log(`# Aggregating usage for 1 day, start: ${startDate} end: ${endDate}`)

    const aggregateId = await create(id, startDate, endDate)
    console.log(`Success make aggregate with id: ${aggregateId}`)
})