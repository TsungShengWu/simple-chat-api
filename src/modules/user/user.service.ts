import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type Repository } from 'typeorm';
import { hash, genSalt } from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    const salt = await genSalt();
    const user1 = await this.userRepository.findOneBy({ username: 'test1' });
    const user2 = await this.userRepository.findOneBy({ username: 'test2' });

    if (!user1) {
      await this.userRepository.insert({
        username: 'test1',
        password: await hash('test1', salt),
        nickname: 'Test User 1',
      });
    }
    if (!user2) {
      await this.userRepository.insert({
        username: 'test2',
        password: await hash('test2', salt),
        nickname: 'Test User 1',
      });
    }
  }

  async getUserWithPassword(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.password'])
      .where('user.username = :username', { username })
      .getOne();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}
