import {IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength} from "class-validator";

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(6, 20)
    @Matches(/^(?=.*\d).+$/, { message: "Password must contain at least one number" })
    password: string
}