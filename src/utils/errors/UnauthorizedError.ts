import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(message: any = "UnauthorizedError") {
        super(message)
        this.statusCode = 401
    }
}