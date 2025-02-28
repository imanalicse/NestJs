import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from "./users.service";

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
    findOne(@Param('id') id: String) {
        return this.userService.findOne(+id)
    }

    @Post() // POST users
    create(@Body() user: { name: string, email: string, role: 'CUSTOMER' | 'ADMIN'}) {
        return this.userService.create(user)
    }

    @Patch(':id')
    update(@Param('id') id: String, @Body() userUpdate: { name?: string, email?: string, role?: 'CUSTOMER' | 'ADMIN'}) {
        return this.userService.update(+id, userUpdate)
    }

    @Delete(':id')
    delete(@Param('id') id: String) {
        return this.userService.delete(+id)
    }
}
