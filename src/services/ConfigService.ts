import { AppDataSource } from "../data-source";
import { Config } from "../entity/Config";
import { NotFoundError } from "../utils/errors/NotFoundError";

const UNKNOWN_CONFIG_VALUE = "UNKNOWN"
const CONFIG_NAME_UNIT = "unit"
const TRESHOLD_SYSTEM = "treshold_system"
const TRESHOLD = "treshold"
const PRICE_PER_METER = "price_per_meter"
const BILL_SYSTEM = "bill_system"
const NOTIFICATION_MUTED_UNTIL = "notification_muted_until"

async function getString(name: string): Promise<string> {
    const config = await AppDataSource.getRepository(Config).findOneBy({
        name,
    })
    if (!config) throw new NotFoundError()
    return config.value as string
}

async function getNumber(name: string): Promise<number> {
    const config = await AppDataSource.getRepository(Config).findOneBy({
        name,
    })
    if (!config) throw new NotFoundError()
    return parseInt(config.value)
}

async function set(name: string, data: string): Promise<Config> {
    const config = await AppDataSource.getRepository(Config).findOneBy({
        name,
    })
    if (!config) throw new NotFoundError()
    config.value = data
    const newConfig = await AppDataSource.getRepository(Config).save(config)
    return newConfig
}

async function getUnit() : Promise<string> {
    let unit: string
    try {
        unit = await getString(CONFIG_NAME_UNIT)
    } catch (err) {
        console.error(err)
        return UNKNOWN_CONFIG_VALUE
    }
    return unit
}

async function setUnit(value: string) : Promise<boolean> {
    try {
        await set(CONFIG_NAME_UNIT, value)
        return true
    } catch (err) {
        return false
    }
}

async function getTresholdSystem() : Promise<boolean> {
    try {
        return await getString(TRESHOLD_SYSTEM) == "on"
    } catch (err) {
        console.error(err)
        return false
    }
}

async function setTresholdSystem(data: boolean) : Promise<boolean> {
    try {
        const resultSet = await set(TRESHOLD_SYSTEM, data ? "on" : "off")
        if (data && resultSet.value == "on") {
            return true
        } else if (!data && resultSet.value == "off") {
            return true
        }
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

/* 
    Require value tresshold_system `on`
*/
async function getTreshold() : Promise<number> {
    try {
        return await getNumber(TRESHOLD)
    } catch (err) {
        console.error(err)
        return -1
    }
}

async function setTreshold(value: number) : Promise<boolean> {
    try {
        await set(TRESHOLD, value.toString())
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

async function getTimeNotificationMuted(): Promise<number> {
    try {
        return await getNumber(NOTIFICATION_MUTED_UNTIL)
    } catch (err) {
        console.error(err)
        return 0
    }
}

async function setTimeNotificationMuted(time: number): Promise<boolean> {
    try {
        await set(NOTIFICATION_MUTED_UNTIL, time.toString())
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

async function getPricePerMeter(): Promise<number> {
    try {
        return await getNumber(PRICE_PER_METER)
    } catch (err) {
        console.error(err)
        return -1
    }
}

async function setPricePerMeter(value: number) : Promise<boolean> {
    try {
        await set(PRICE_PER_METER, value.toString())
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

async function getBillSystem() : Promise<boolean> {
    try {
        return await getString(BILL_SYSTEM) == "on"
    } catch (err) {
        console.error(err)
        return false
    }
}

async function setBillSystem(value: boolean) : Promise<boolean> {
    try {
        const resultSet = await set(BILL_SYSTEM, value ? "on" : "off")
        if (value && resultSet.value == "on") {
            return true
        } else if (!value && resultSet.value == "off") {
            return true
        }
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

export {
    getUnit,
    getTresholdSystem,
    getTreshold,
    getPricePerMeter,
    getBillSystem,
    setUnit,
    setTresholdSystem,
    setTreshold,
    setPricePerMeter,
    setBillSystem,
    getTimeNotificationMuted,
    setTimeNotificationMuted,
}