import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
/*
export class UpdateUserDto extends PartialType(CreateUserDto) {

}
 */

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name?: string

    @IsEmail()
    email?: string

    password?: string
}