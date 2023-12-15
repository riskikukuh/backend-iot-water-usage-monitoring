import * as express from "express"
import * as bodyParser from 'body-parser';
import * as httpServer from 'http';
import { Server } from "socket.io"
import { AppDataSource } from "./data-source"
import { errorMiddleware } from "./middleware/ErrorMiddleware"
import { setupSocketWaterUsage } from "./controllers/WaterUsageController"
import { initializeFCM } from "./services/NotificationService"
import { apiRouter } from "./route/ApiRoute"

AppDataSource.initialize().then(async () => {

    initializeFCM()

    const port = parseInt(process.env.PORT) || 3000
    const host = process.env.HOST || "0.0.0.0"

    const app: express.Express = express()
    const server = new httpServer.Server(app)
    const socket = new Server(server, {
        path: '/updateWaterUsage'
    })

    app.use(bodyParser.json())
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )

    const setupedSocket = setupSocketWaterUsage(socket)
    const socketMiddleware = function (req, res, next) {
        res.io = socket
        next()
    }
    app.use(socketMiddleware)
    app.use(apiRouter);
    app.use(errorMiddleware)


    server.listen(port, host, () => {
        console.log(`# Iot Monitoring Water Usages Started, listening at http://${host}:${port}`);
    })


    // let minute = 1
    // console.log("Start debug")
    // schedule.scheduleJob('*/1 * * * * *', async function() {
    //     console.log("Inserted")
    //     const min = Math.ceil(1);
    //     const max = Math.floor(5000);
    //     const randomUsage = Math.floor(Math.random() * (max - min) + min); // The maximum is
    //     const now = new Date()
    //     const day = now.getDate()
    //     const month = now.getMonth()
    //     const year = now.getFullYear()

    //     minute += 1

    //     const usageAt = +new Date(year, month, day, 0, minute, 0)
    //     await create(randomUsage, usageAt, "liter/m") 
    // })


}).catch(error => console.log(error))



