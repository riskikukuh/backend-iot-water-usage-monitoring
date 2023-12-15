import { BaseError } from "./BaseError";

export class AuthError extends BaseError {
    constructor(message: any = "Unauthorized") {
        super(message)
        this.statusCode = 401
    }
}