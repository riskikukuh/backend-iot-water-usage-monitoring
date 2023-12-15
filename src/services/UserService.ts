import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { NotFoundError } from "../utils/errors/NotFoundError";
import { UserRole } from "../utils/RoleUtil";

async function create({ email, firstname, lastname, address, latitude, longitude, password }): Promise<String> {

    const user = new User()
    user.email = email
    user.firstname = firstname
    user.lastname = lastname
    user.address = address
    user.latitude = latitude
    user.longitude = longitude
    user.password = password
    user.role = 'CUSTOMER'
    user.created_at = + new Date()

    const insertedUser = await AppDataSource.getRepository(User).save(user)

    return insertedUser.id
}

async function getAllUser(isActive: boolean | null, userRole: UserRole = null): Promise<User[]> {
    const user = await AppDataSource.getRepository(User).find({
        where: {
            is_active: isActive != null ? isActive ? 1 : 0 : null,
            role: userRole == null ? null : userRole,
        }
    })
    return user
}

async function verifyUser(id: string) {
    const user = await AppDataSource.getRepository(User).find({
        where: {
            id,
        }
    })
    if (user.length < 1) {
        throw new NotFoundError('User tidak ditemukan')
    }
}

async function getUserById(id: string): Promise<User | null> {
    const user = await AppDataSource.getRepository(User).findOneBy({
        id,
    })
    return user
}

async function findUser(email: string, password: string): Promise<User> {
    const nodeEnvParams = process.env.NODE_ENV == 'prod' ? ` AND user.role != 'none'` : ''
    const user = await AppDataSource.createQueryBuilder(User, 'user')
        .where(`user.email = :email AND user.password = :password ${nodeEnvParams}`, {
            email,
            password
        })
        .getOne()

    if (!user) {
        throw new NotFoundError('Email / Password incorect!')
    }
    return user
}

async function updateTresholdCounter(user_id: string, value: number): Promise<void> {
    const user = await AppDataSource.getRepository(User).findOne({
        where: {
            id: user_id,
        }
    })
    user.treshold_counter = value
    await AppDataSource.getRepository(User).save(user)
}

async function edit(user_id: string, { pricePerMeter = undefined, tresholdSystem = undefined, treshold = undefined }): Promise<void> {
    const user = await AppDataSource.getRepository(User).findOne({
        where: {
            id: user_id,
        },
    })
    if (pricePerMeter) {
        user.price_per_meter = pricePerMeter
    }
    if (tresholdSystem) {
        user.treshold_system = tresholdSystem
    }
    if (treshold) {
        user.treshold = treshold
    }
    await AppDataSource.getRepository(User).save(user)
}

async function getProfile(id: string): Promise<User> {
    const user = await AppDataSource.getRepository(User).findOne({
        where: {
            id: id,
        }
    })
    if (!user) {
        throw new NotFoundError('User not found!');
    }
    return user
}

export {
    edit,
    create,
    findUser,
    getProfile,
    getAllUser,
    verifyUser,
    getUserById,
    updateTresholdCounter,
}