import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type User } from './user.entity';
import { UserService } from './user.service';
import { GetUser } from '../auth/get-user.decorator';
import { AuthUser } from '../auth/auth-user.type';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(
    @GetUser() user: AuthUser,
  ): Promise<Pick<User, 'id' | 'username' | 'nickname'>> {
    return this.userService.getUserById(user.id);
  }
}
