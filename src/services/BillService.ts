import { AppDataSource } from "../data-source"
import { Bill } from "../entity/Bill"
import { BillStatus } from "../utils/BillUtil"
import { NotFoundError } from "../utils/errors/NotFoundError"

async function getAll(user_id: string): Promise<Bill[]> {
    const bills = await AppDataSource.getRepository(Bill).find({
        where: {
            user_id,
        }
    })
    return bills.map((bill) => {
        bill.unit = bill.unit.split('/')[0]
        return bill
    })
}

async function getBillById(billId: string): Promise<Bill> {
    const bill = await AppDataSource.getRepository(Bill).findOne({
        where: {
            id: billId,
        }
    })
    if (!bill) {
        throw new NotFoundError('Bill not found!')
    }
    return bill
}

async function editStatusBill(billId: string, status: BillStatus): Promise<void> {
    const bill = await AppDataSource.getRepository(Bill).findOne({
        where: {
            id: billId,
        }
    })
    bill.status = status
    if (status == BillStatus.PAID) {
        bill.paid_at = +new Date()
    }
    await AppDataSource.getRepository(Bill).save(bill)
}

async function getPaidBillByStatus(status: BillStatus): Promise<Bill[]> {
    const bills = await AppDataSource.getRepository(Bill).createQueryBuilder("bills")
    .where("bills.status = :status", {
        status,
    })
    .leftJoinAndSelect("bills.user", "users", "bills.user_id = users.id")
    .getMany()
    return bills.map((bill) => {
        bill.unit = bill.unit.split('/')[0]
        return bill
    })
}

async function create(user_id: string, { waterUsage, unit, startDate, endDate, nominal, pricePerMeter }): Promise<string> {

    const bill = new Bill()
    bill.user_id = user_id
    bill.water_usage = waterUsage,
    bill.unit = unit
    bill.start_date = startDate
    bill.end_date = endDate
    bill.nominal = nominal
    bill.price_per_meter = pricePerMeter    
    bill.created_at = +new Date()

    const resultInsert = await AppDataSource.getRepository(Bill).save(bill)

    return resultInsert.id
}

async function deleteBill(billId: string): Promise<boolean> {
    await AppDataSource.getRepository(Bill).delete({
        id: billId,
    })
    const bill = await AppDataSource.getRepository(Bill).findOneBy({
        id: billId,
    })
    return bill == null
}

export {
    getAll,
    create,
    deleteBill,
    getPaidBillByStatus,
    getBillById,
    editStatusBill,
}