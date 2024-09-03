// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const account = await this.authService.validateAccount(loginDto.username, loginDto.password);
    console.log(account,"account")
    if (!account) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(account);
  }

  @Post('register')
  async register(@Body() registerDto: { username: string; password: string; secret: string }) {
    console.log(registerDto,"registerDto")

    return this.authService.register(registerDto.username, registerDto.password, registerDto.secret);
  }
}
