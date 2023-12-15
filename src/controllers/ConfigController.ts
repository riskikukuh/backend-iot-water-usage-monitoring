import { 
    setTresholdSystem, 
    setTreshold,
    getTresholdSystem,
    getTreshold,
    setTimeNotificationMuted
} from "../services/ConfigService"
import { NotificationMutedTimeValidator, TresholdSystemValidator, TresholdValueValidator } from "../utils/validator/ConfigValidator"
import { validate } from "../utils/validator/ValidatorUtil"

async function getTresholdSystemHandler(req, res, next) {
    try {
        const tresholdSystem = await getTresholdSystem()
        res.statusCode = 200
        res.json({
            success: true,
            data: {
                active: tresholdSystem,
            }
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

async function getTresholdHandler(req, res, next) {
    try {
        const tresholdSystem = await getTresholdSystem()
        const tresholdValue = await getTreshold()
        res.statusCode = 200
        res.json({
            success: true,
            data: {
                active: tresholdSystem,
                value: tresholdValue,
            }
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

async function setTresholdSystemHandler(req, res, next) {
    try {
        const { active } = req.body
        const schema = new TresholdSystemValidator()
        schema.active = active
        await validate(schema)
        await setTresholdSystem(active)
        res.statusCode = 200
        res.json({
            success: true,
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

async function setTresholdHandler(req, res, next) {
    try {

        const { value } = req.body
        const check = new TresholdValueValidator()
        check.value = value

        await validate(check)

        const isTresholdActive = await getTresholdSystem()
        if (!isTresholdActive) {
            res.statusCode = 403
            res.json({
                status: false,
                message: 'Treshold system is not activated',
            })
            return
        }

        await setTreshold(value)
        
        res.statusCode = 200
        res.json({
            success: true,
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

async function setTimeNotificationMutedHandler(req, res, next) {
    try {

        const { time } = req.body
        const check = new NotificationMutedTimeValidator()
        check.time = time

        await validate(check)

        const timeMuted = check.timeToMillis()
        const now = +new Date()
        
        await setTimeNotificationMuted(now+timeMuted)

        res.statusCode = 200
        res.json({
            success: true,
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

export {
    setTresholdSystemHandler,
    setTresholdHandler,
    getTresholdHandler,
    getTresholdSystemHandler,
    setTimeNotificationMutedHandler,
}