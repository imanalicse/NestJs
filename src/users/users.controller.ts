import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get() // GET users
    findAll(@Query('role') role?: 'CUSTOMER' | 'ADMIN') {
        return []
    }

    @Get('interns') // GET users/interns - waterfall routes
    findAllInterns() {
        return []
    }

    @Get(':id')
    findOne(@Param('id') id: String) {
        return { id }
    }

    @Post() // POST users
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id')
    update(@Param('id') id: String, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }

    @Delete(':id')
    delete(@Param('id') id: String) {
        return { id }
    }
}
