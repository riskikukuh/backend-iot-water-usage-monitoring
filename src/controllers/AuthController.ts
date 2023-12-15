import { AuthLoginValidator } from "../utils/validator/AuthValidator"
import { validate } from "../utils/validator/ValidatorUtil"
import {
    findUser,
} from "../services/UserService"
import { AuthError } from "../utils/errors/AuthError"
import { generateToken } from "../utils/AuthUtil"

async function postLoginHandler(req, res, next) {
    try {
        const { email, password } = req.body

        const schema = new AuthLoginValidator()
        schema.email = email
        schema.password = password

        await validate(schema)

        const user = await findUser(email, password)

        if (!user) {
            throw new AuthError()
        }

        const token = generateToken({ id: user.id, firstname: user.firstname, role: user.role })

        res.status(200).json({
            success: true,
            data: {
                token,
            }
        })
    } catch (err) {
        console.error(`Error: ${err}`)
        next(err)
    }
}

export {
    postLoginHandler
};