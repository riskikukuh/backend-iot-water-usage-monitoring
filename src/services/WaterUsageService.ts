import { Between, SimpleConsoleLogger } from "typeorm";
import { AppDataSource } from "../data-source";
import { WaterUsage } from "../entity/WaterUsage";
import { getUnit } from "./ConfigService"
import { getUserById } from "./UserService";

async function getTotalUsageByDate(user_id: string, startDate: number, endDate: number): Promise<number> {
    const marginTimeError = 2000
    const result = await AppDataSource.getRepository(WaterUsage)
        .createQueryBuilder('wu')
        .select("wu.user_id")
        .addSelect('SUM(wu.usage)', 'total_usage')
        .where('wu.user_id = :id AND wu.usage_at BETWEEN :startDate AND :endDate', { id: user_id, startDate: startDate + marginTimeError, endDate: endDate + marginTimeError })
        .groupBy('wu.user_id')
        .getRawOne()
    
    if (!result) {
        return 0
    }

    const { total_usage } = result
    return total_usage ?? 0
}

async function getLatestUsage(user_id: string): Promise<WaterUsage | null> {
    const temp = new Date()
    const day = temp.getDate()
    const month = temp.getMonth()
    const year = temp.getFullYear()
    const hour = temp.getHours()
    const minute = temp.getMinutes()
    var startDate;
    if (minute % 5 == 0) {
        startDate = new Date(year, month, day, hour, minute - 5, 0)
    } else {
        startDate = new Date(year, month, day, hour, minute - (minute % 5), 0)
    }

    const endDate = new Date(year, month, day, hour, minute, 0)
    const data = await getUsageByDate(user_id, +startDate, +endDate, false, true, false)

    return data[0]
}

async function create(user_id: string, usage: number, usage_at: number, unit: string): Promise<string> {
    const newWaterUsage = new WaterUsage()
    let finalUsage: number = 0
    const defaultUnit = 'meter'
    if (unit.includes('liter')) {
        finalUsage = usage / 1000
    } else if (unit.includes('meter')) {
        finalUsage = usage
    }
    newWaterUsage.user_id = user_id
    newWaterUsage.usage = finalUsage
    newWaterUsage.unit = defaultUnit
    newWaterUsage.usage_at = usage_at
    newWaterUsage.created_at = +new Date()

    const inserted = await AppDataSource.getRepository(WaterUsage).save(newWaterUsage)

    return inserted.id
}

async function getTodayUsage(user_id: string, group5minute: boolean = true): Promise<WaterUsage[]> {
    const tempDate = new Date()
    const startDate = +new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), 0, 0, 0)
    const endDate = +new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), 24, 0, 0)

    const data = await getUsageByDate(user_id, startDate, endDate, group5minute)
    return data
}

async function getUsageByDate(user_id: string, startDateParams: number, endDateParams: number, group5minute: boolean = true, dateRestriction: boolean = true, orderAsc: boolean = true): Promise<WaterUsage[]> {
    const marginTimeError = 2000
    const data = await AppDataSource.getRepository(WaterUsage).find({
        where: {
            user_id,
            usage_at: Between(startDateParams + marginTimeError, endDateParams + marginTimeError),
        },
        order: {
            usage_at: {
                direction: orderAsc ? 'ASC' : 'DESC',
            }
        }
    })

    const resultWaterUsages = []

    if (group5minute) {

        const now = new Date()
        // var unit = await getUnit()
        // unit = unit.split('/')[0];
        const unit = 'meter'

        let minute = 5
        let condition = true

        while (condition) {
            let startDate: number = 0
            if (minute == 5) {
                startDate = +new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
            } else {
                startDate = +new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, minute - 5, 0)
            }

            const endDate = +new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, minute, 0)

            const waterUsage5Minutes = data.filter((e) => {
                return e.usage_at >= startDate && e.usage_at < endDate
            })

            let usage5Minute = 0
            for (let i = 0; i < waterUsage5Minutes.length; i++) {
                const e = waterUsage5Minutes[i];
                if (e.unit.includes('liter')) {
                    usage5Minute += e.usage / 1000
                } else if (e.unit.includes('meter')) {
                    usage5Minute += e.usage
                }
            }

            resultWaterUsages.push({
                usage: usage5Minute,
                unit,
                startDate,
                endDate,
            })

            if (dateRestriction && +now < endDate) {
                condition = false
            }

            if (minute >= 1440) {
                condition = false
            }

            minute += 5
        }

        return resultWaterUsages
    }

    return data.map((value) => {
        value.unit = value.unit.split('/')[0];
        return value;
    });
}

export {
    create,
    getTodayUsage,
    getUsageByDate,
    getLatestUsage,
    getTotalUsageByDate,
}