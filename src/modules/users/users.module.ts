import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../database/typeorm/entities/User";
import { Order } from "../../database/typeorm/entities/Order";

@Module({
    imports: [TypeOrmModule.forFeature([User, Order])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
