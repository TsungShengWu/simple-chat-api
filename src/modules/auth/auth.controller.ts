import { Controller, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { AuthUser } from './auth-user.type';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: AuthUser) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {}
}
