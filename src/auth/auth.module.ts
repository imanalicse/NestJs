import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from "../database/typeorm/entities/User";
import { RefreshToken } from "../database/typeorm/entities/RefreshToken";

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
