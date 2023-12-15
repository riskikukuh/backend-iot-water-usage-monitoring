import { BaseError } from "./BaseError";

export class ClientError extends BaseError {
    constructor(message: any = "ClientError") {
        super(message)
        this.statusCode = 400
    }
}