import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateOrderDto} from "./dto/create-order.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "../../database/typeorm/entities/Order";
import {Repository} from "typeorm";
import {User} from "../../database/typeorm/entities/User";

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createOrder(userId, createOrderDto: CreateOrderDto) {
        const user = await this.userRepository.findOneBy({id: userId});
        if (!user) {
            throw new NotFoundException('User is not found')
        }
         const newOrder = this.orderRepository.create({
             ...createOrderDto,
             createdAt: new Date(),
             user: user
         })
        return this.orderRepository.save(newOrder)
    }
}
