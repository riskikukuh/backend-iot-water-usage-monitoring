import { Between } from "typeorm";
import { AppDataSource } from "../data-source";
import { getTotalUsageByDate, getUsageByDate } from "./WaterUsageService"
import { History } from "../entity/History";
import { getUnit } from "./ConfigService";
import { getProfile } from "./UserService"
import { UsagePriceType } from "../utils/UsagePriceType";

async function create(user_id:string, startDate: number, endDate: number) : Promise<string> {
    const { price_per_meter } = await getProfile(user_id)
    const totalUsage = await getTotalUsageByDate(user_id, startDate, endDate)
    const history       = new History()
    const usageInMeter  = totalUsage / 1000
    history.user_id     = user_id
    history.water_usage = usageInMeter;
    // history.unit        = await getUnit()
    history.unit        = "meter"
    history.start_date  = startDate
    history.end_date    = endDate
    history.price_per_meter = price_per_meter
    history.nominal = Math.round(usageInMeter * price_per_meter)
    history.created_at  = + new Date()

    const inserted = await AppDataSource.getRepository(History).save(history)

    return inserted.id
}

async function getHistories(user_id: string, startDate: number | null = null, endDate: number | null = null) : Promise<History[]> {
    const params = {
        user_id: user_id,
        created_at: startDate != null && endDate != null ? Between(startDate, endDate) : null,
    }
    const data = await AppDataSource.getRepository(History).find({
        where: params,
        order: {
            created_at: 'ASC',
        }
    })

    return data.map((value) => {
        value.unit = value.unit.split('/')[0];
        return value;
    });
}

async function getUsageAndPriceByDate(user_id: string, startDate: number, endDate: number): Promise<UsagePriceType> {
    const { total_usage, total_bill } = await AppDataSource.getRepository(History)
        .createQueryBuilder('h')
        .select('h.user_id')
        .addSelect('SUM(h.water_usage)', 'total_usage')
        // .addSelect('SUM(h.nominal)', 'total_bill')
        .where('h.user_id = :id AND created_at BETWEEN :startDate AND :endDate', { 
            id: user_id, 
            startDate,
            endDate,
        })
        .groupBy('h.user_id')
        .getRawOne()
        
    return { totalUsage: total_usage ?? 0, totalBill: total_bill ?? 0 }
}

export {
    create, 
    getHistories,
    getUsageAndPriceByDate,
}