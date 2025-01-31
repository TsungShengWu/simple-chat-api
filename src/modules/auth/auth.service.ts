import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { AuthUser } from './auth-user.type';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<AuthUser> {
    const user = await this.userService.getUserWithPassword(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Wrong password');
    }

    return { id: user.id };
  }

  async login(user: AuthUser) {
    return { token: this.jwtService.sign(user) };
  }

  async validateJwt({ id }: AuthUser) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  }
}
