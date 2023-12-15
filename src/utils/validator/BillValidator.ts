import { IsEmail, IsEnum, IsNotEmpty, IsString, Min, MinLength } from "class-validator";
import { BillStatus } from "../BillUtil";

class PostPayBillOfficerValidator {
    @IsString()
    @IsNotEmpty()
    bill_id: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(BillStatus)
    status: BillStatus
}

export {
    PostPayBillOfficerValidator,
}