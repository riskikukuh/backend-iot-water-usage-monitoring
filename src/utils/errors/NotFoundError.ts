import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(message: any = "NotFoundError") {
        super(message)
        this.statusCode = 404
    }
}