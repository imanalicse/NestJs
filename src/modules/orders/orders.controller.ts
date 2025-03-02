import {Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe} from '@nestjs/common';
import {CreateOrderDto} from "./dto/create-order.dto";
import {OrdersService} from "./orders.service";

@Controller()
export class OrdersController {

    constructor(private readonly orderService: OrdersService) {}

    @Post('users/:userId/orders')
    create(@Param('userId', ParseIntPipe) userId: number, @Body(ValidationPipe) createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(userId, createOrderDto)
    }
}
