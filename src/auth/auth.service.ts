import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../database/typeorm/entities/User";
import {MoreThan, Repository} from "typeorm";
import {SignupDto} from "./dto/signup.dto";
import * as bcrypt from "bcryptjs";
import {LoginDto} from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt"
import {RefreshToken} from "../database/typeorm/entities/RefreshToken";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
        private jwtService: JwtService
    ) {}

    async signup(signupDto: SignupDto){
        const { email, password, name } = signupDto
        const emailInUse = await this.userRepository.findOneBy({
            email: email
        })
        if (emailInUse) {
            throw new BadRequestException('Email already in use')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });
        return this.userRepository.save(newUser);
    }

    async login(credential: LoginDto) {``
        const { email, password } = credential
        const user = await this.userRepository.findOneBy({ email })
        if (!user) {
            throw new UnauthorizedException("Wrong credentials");
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException("Wrong credentials");
        }

        return this.generateAccessToken(user)
    }

    async generateAccessToken(user) {
        const expiresIn = 3600
        const payload = { sub: user.id, username: user.username };
        const jwtOptions = { expiresIn: expiresIn + 's' }
        const accessToken = this.jwtService.sign(payload, jwtOptions)
        const refreshToken = uuidv4();
        const expiredAt = new Date();
        expiredAt.setHours(expiredAt.getHours() + 24);
        await this.storeRefreshToken(user, refreshToken, expiredAt)
        return {
            accessToken,
            refreshToken,
            expiresIn,
            tokenType: "Bearer"
        };
    }

    async storeRefreshToken(user, refreshToken: string, expiredAt) {
        const refreshTokenObj = this.refreshTokenRepository.upsert({
            user,
            refreshToken,
            expiredAt,
            createdAt: new Date()
        }, ['id']);
        return refreshTokenObj
    }

    async refreshToken(refreshToken: string) {
        const refreshRecord = await this.refreshTokenRepository.findOne({
            where: {
                refreshToken: refreshToken,
                expiredAt: MoreThan(new Date())
            },
            relations: ['user']
        });
        console.log('refreshRecord:', refreshRecord)
        if (!refreshRecord) {
            throw new UnauthorizedException("Token is not found")
        }

        return this.generateAccessToken(refreshRecord.user)
    }
}
