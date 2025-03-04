import {IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength} from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}