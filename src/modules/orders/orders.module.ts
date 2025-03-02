import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../database/typeorm/entities/User";
import {Order} from "../../database/typeorm/entities/Order";
import {OrdersController} from "./orders.controller";
import {OrdersService} from "./orders.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Order])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
