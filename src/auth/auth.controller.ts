import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import { SignupDto } from "./dto/signup.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('signup')
    signUp(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post("refresh")
    async refreshToken(@Body("refreshToken") refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }
}
