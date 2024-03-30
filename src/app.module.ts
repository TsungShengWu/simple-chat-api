import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MY_SQL_HOST || 'localhost',
      port: Number(process.env.MY_SQL_PORT) || 8082,
      database: process.env.MY_SQL_DATABASE || 'simple-chat',
      username: process.env.MY_SQL_USERNAME || 'admin',
      password: process.env.MY_SQL_PASSWORD || 'password',
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
