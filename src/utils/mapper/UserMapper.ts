import { User } from "../../entity/User";

function rawToSafeUser(user: User) {
    const { password, ...newUser} = user
    return newUser
}

export {
    rawToSafeUser,
}