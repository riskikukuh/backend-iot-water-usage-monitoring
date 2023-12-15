export class BaseError extends Error {
    public statusCode : number
    constructor(public message: string) {
        super(message)
    }
}