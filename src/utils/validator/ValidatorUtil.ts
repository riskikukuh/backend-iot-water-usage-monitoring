import { validate as check } from "class-validator"
import { ClientError } from "../errors/ClientError"

async function validate(validationSchema: object) {
    const errors = await check(validationSchema)

    const newErrors = errors.map((i) => {
        if (i.constraints) {
            return Object.keys(i.constraints).map(key => {
                return i.constraints[key]
            })
        }
        return []
    })
    if (errors.length > 0) {
        throw new ClientError(newErrors.join(", "))
    }
}

export {
    validate,
}