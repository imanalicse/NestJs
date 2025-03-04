import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './modules/users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./database/typeorm/entities/User";
import {Order} from "./database/typeorm/entities/Order";
import {OrdersModule} from './modules/orders/orders.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nestjs',
        entities: [User, Order],
        synchronize: true,
    }),
    UsersModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
