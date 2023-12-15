import { BaseError } from "./BaseError";

export class InvariantError extends BaseError {
    constructor(message: any = "InvariantError") {
        super(message)
        this.statusCode = 400
    }
}