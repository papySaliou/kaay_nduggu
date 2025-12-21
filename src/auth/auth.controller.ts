// auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { InscriptionDto } from './dto/inscription.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: InscriptionDto) {
  return this.authService.register(dto);
}
//   async register(@Body() userData: Partial<User>) {
//     return this.authService.register(userData);
//   }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Get('me')
@UseGuards(JwtAuthGuard)
getMe(@Request() req) {
  return req.user;
}

  @Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Request() req) {
  console.log(req.user); 
  return req.user;
}
}
