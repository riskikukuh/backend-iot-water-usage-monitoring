import { IsIn, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, IsUUID, Min } from "class-validator";

export class WaterUsageValidator {
    
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    user_id: string

    @IsNumber()
    @Min(0)
    usage: number

    @IsNotEmpty()
    unit: string

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    usage_at: number
}