import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length, isNumber, isString } from "class-validator"

export class LoginDTO {

    @IsPhoneNumber('EG')
    phoneNumber:string

    @IsString()
    @IsNotEmpty()
    password:string
}