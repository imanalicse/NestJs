import {Body, Controller, Delete, Get, Param, ParseIntPipe, ValidationPipe, Patch, Post, Query} from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get() // GET users
    findAll(@Query('role') role?: 'CUSTOMER' | 'ADMIN') {
        return this.userService.findAll(role)
    }

    @Get('interns') // GET users/interns - waterfall routes
    findAllInterns() {
        return []
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }

    @Post() // POST users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
