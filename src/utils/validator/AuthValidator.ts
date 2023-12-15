import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

class AuthLoginValidator {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string
}

export {
    AuthLoginValidator,
}