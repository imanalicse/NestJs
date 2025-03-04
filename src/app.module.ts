import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './modules/users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./database/typeorm/entities/User";
import {Order} from "./database/typeorm/entities/Order";
import {OrdersModule} from './modules/orders/orders.module';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        expandVariables: true
      }),
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
    JwtModule.register({
      // imports:[ConfigModule],
      global: true,
      secret: process.env.JWT_SECRET,
      // inject:[ConfigService],
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
