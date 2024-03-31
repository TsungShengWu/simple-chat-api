import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserWithPassword(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.password'])
      .where('user.username = :username', { username })
      .getOne();
  }
}
