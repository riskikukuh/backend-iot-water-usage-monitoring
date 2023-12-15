import { Contains, IsBoolean, IsBooleanString, IsIn, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

class TresholdValueValidator {
    @IsNumber()
    @Min(0)
    value: number
}

class TresholdSystemValidator {
    @IsNotEmpty()
    @IsBoolean()
    active: boolean
}

class NotificationMutedTimeValidator {
    @IsString()
    @IsIn(['5m', '10m', '15m', '30m', '1h', '1d'])
    time: string

    timeToMillis = () : number => {
        let timeInMillis: number = 0
        switch(this.time) {
            case '5m':
                timeInMillis = 5 * 60 * 1000
                break
            case '10m':
                timeInMillis = 10 * 60 * 1000
                break
            case '15m':
                timeInMillis = 15 * 60 * 1000
                break
            case '30m':
                timeInMillis = 30 * 60 * 1000
                break
            case '1h':
                timeInMillis = 60 * 60 * 1000
                break
            case '1d':
                timeInMillis = 24 * 60 * 60 * 1000
                break
        }
        return timeInMillis
    }
}

export {
    TresholdValueValidator,
    TresholdSystemValidator,
    NotificationMutedTimeValidator,
}