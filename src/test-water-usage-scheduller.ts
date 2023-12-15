import * as schedule from "node-schedule"
import { AppDataSource } from "./data-source"
import { create } from "./services/WaterUsageService"
import * as dotenv from "dotenv"
import axios from "axios"

dotenv.config()

AppDataSource.initialize().then(async () => {
    
    console.log("Start Dummy water usage")

    const host = process.env.HOST
    const port = parseInt(process.env.PORT)
    // const userIdTesting = '9d0a806d-0fd5-4558-bedf-f9e5a660a246'
    const demoPelanggan1 = 'c47158fd-069d-40ae-bb10-9bdfe1b6fd56'
    const userId = demoPelanggan1
    const unit = 'liter/m'
    
    console.log("Start debug")
    let counter = 0

    const now = new Date()
    let day = now.getDate()
    let month = now.getMonth()
    let year = now.getFullYear()
    let hour = now.getHours()
    let minute = now.getMinutes()

    hour = 0
    minute = 0   

    schedule.scheduleJob('* * * * *', async function() {
        counter += 1

        const requestBody = {
            user_id: userId,
            usage: Math.floor(Math.random() * (130 - 0) + 0),
            unit: "liter/m",
            usage_at: +new Date(),
        }

        try {
            const { data, status } = await axios.post(`http://${host}:${port}/api/waterUsage`, requestBody, {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
            })
            if (status == 201) {
                console.log(`# Add Water usage result ${status}, with id: ${data.data.id}`)
            } else {
                console.log(`# Add Water Usage error`)
                console.log(AppDataSource)
                console.log(status)
            }
            
            
        } catch (error) {
            console.log(`Unexpected error: ${error}`)
        }
    })
})