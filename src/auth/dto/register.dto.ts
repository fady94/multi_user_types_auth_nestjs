import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator"

export class RegisterDTO {

    @IsString()
    @Length(1,50)
    name:string

    @IsPhoneNumber('EG')
    phoneNumber:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsEmail()
    @IsOptional()
    email:string
}