import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../database/typeorm/entities/User";
import {Repository} from "typeorm";
import {SignupDto} from "./dto/signup.dto";
import * as bcrypt from "bcryptjs";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
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

    async login(credential: LoginDto) {
        const { email, password } = credential
        const user = await this.userRepository.findOneBy({ email })
        if (!user) {
            throw new UnauthorizedException("Wrong credentials");
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException("Wrong credentials");
        }

        return {
            message: "success"
        }
    }
}
