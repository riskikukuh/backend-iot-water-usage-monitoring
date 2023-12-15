import { AppDataSource } from "./data-source"
import { getUserById } from "./services/UserService"
import { createBillNonApi } from "./controllers/BillController"
import { initializeFCM } from "./services/NotificationService"

AppDataSource.initialize().then(async () => {
    
    initializeFCM()

    const now = new Date()
    now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    const userId = 'c47158fd-069d-40ae-bb10-9bdfe1b6fd56'

    const user = await getUserById(userId)
    const { id, firstname } = user

    // const startDate = +new Date(year, month - 1, 1, 0, 0, 0)
    const startDate = +new Date(year, month, 1, 0, 0, 0)
    const endDate = +new Date(year, month, day, 0, 0, 0)

    console.log(`# Generating bill for 1 month for ${firstname}, start: ${+startDate} end: ${+endDate}`)

    const billId = await createBillNonApi(id, startDate, endDate)
    console.log(`Success generate bill with id: ${billId}`)
})