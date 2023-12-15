import { IsEmail, isEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, min, Min, minLength } from "class-validator";

export class UpdateUserCustomerConfigurationValidator {
    
    @IsOptional()
    @IsIn(["on", "off"])
    tresholdSystem: string

    @IsOptional()
    @IsNumber()
    treshold: number    
}

export class UpdateUserOfficerConfigurationValidator {

    @IsOptional()
    @IsNumber()
    @Min(0)
    pricePerMeter: number

    @IsString()
    @IsNotEmpty()
    user_id: string
}

export class AddUserValidator {
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    firstname: string
    
    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsOptional()
    @IsNumber()
    latitude: number
    
    @IsOptional()
    @IsNumber()
    longitude: number

    @IsString()
    @Length(8, 255)
    password: string
}