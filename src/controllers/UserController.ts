import { getTodayUsage } from "../services/WaterUsageService"
import { getHistories } from "../services/HistoryService"
import { getProfile, create, edit, getUserById, getAllUser } from "../services/UserService"
import { rawToSafeUser } from "../utils/mapper/UserMapper"
import { AddUserValidator, UpdateUserCustomerConfigurationValidator, UpdateUserOfficerConfigurationValidator } from "../utils/validator/UserValidator"
import { validate } from "../utils/validator/ValidatorUtil"
import { UserRole } from "../utils/RoleUtil"
import { UnauthorizedError } from "../utils/errors/UnauthorizedError"
import { NotFoundError } from "../utils/errors/NotFoundError"

async function getProfileHandler(req, res, next) {
    try {
        const { id } = req.auth
        const user = rawToSafeUser(await getProfile(id))

        const now = new Date()
        const month = now.getMonth()
        const year = now.getFullYear()
        
        const startDate = +new Date(year, month, 1, 0, 0, 0)
        const endDate = +new Date(year, month +1, 1, 0, 0, 0)

        const dailyUsages = await getTodayUsage(id)
        const monthlyUsages = await getHistories(id, startDate, endDate)

        let totalMonthlyUsages = 0
        for (let i = 0; i < dailyUsages.length; i++) {
            const usage = dailyUsages[i]
            if (usage.unit.includes('liter')) {
                totalMonthlyUsages += usage.usage / 1000
            } else if (usage.unit.includes('meter')) {
                totalMonthlyUsages += usage.usage
            }
        }
        for (let i = 0; i < monthlyUsages.length; i++) {
            const usage = monthlyUsages[i]
            totalMonthlyUsages += usage.water_usage
        }

        user['monthly_usage'] = totalMonthlyUsages

        res.status(200).json({
            success: false,
            data: user,
        })
    } catch (err) {
        next(err)
    }
}

async function getOfficerUsers(req, res, next) {
    try {
        const { id } = req.auth
        const user = await getUserById(id)
        console.log(user)
        if (user.role.toUpperCase() != UserRole.OFFICER) {
            throw new UnauthorizedError()
        }
        const users = (await getAllUser(null, UserRole.CUSTOMER)).map((user) => {
            const { password, ...data } = user
            return data
        })
        res.status(200).json({
            success: true,
            data: users,
        })
    } catch (err) {
        next(err)
    }
}

async function updateConfiguration(req, res, next) {
    try {
        const { id } = req.auth
        const user = await getUserById(id)
        if (user.role.toUpperCase() == UserRole.CUSTOMER) {
            const { tresholdSystem, treshold } = req.body

            const schema = new UpdateUserCustomerConfigurationValidator()
            schema.tresholdSystem = tresholdSystem
            schema.treshold = treshold

            await validate(schema)
            await edit(id, { tresholdSystem, treshold})
        } else if (user.role.toUpperCase() == UserRole.OFFICER) {
            const { user_id, pricePerMeter } = req.body

            const targetUser = await getUserById(id)
            if (!targetUser) {
                throw new NotFoundError()
            }

            const schema = new UpdateUserOfficerConfigurationValidator()
            schema.pricePerMeter = pricePerMeter
            schema.user_id = user_id

            await validate(schema)
            await edit(user_id, {pricePerMeter})
        }
        
        res.status(200).json({
            success: true,
        })
    } catch (err) {
        next(err)
    }
}

async function postCreateUserHandler(req, res, next) {
    try {
        const {  email, firstname, lastname, address, latitude, longitude, password } = req.body

        const schema = new AddUserValidator()
        schema.email = email
        schema.firstname = firstname
        schema.lastname = lastname
        schema.address = address
        schema.latitude = latitude
        schema.longitude = longitude
        schema.password = password

        await validate(schema)

        const insertedId = await create(req.body)
        
        res.status(200).json({
            success: false,
            data: {
                id: insertedId,
            },
        })
    } catch (err) {
        next(err)
    }
}

export {
    getProfileHandler,
    postCreateUserHandler,
    updateConfiguration,
    getOfficerUsers,
}