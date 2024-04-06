import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SocketGateway } from './socket.gateway';
import { ChatController } from './chat.controller';

@Module({
  imports: [UserModule],
  controllers: [ChatController],
  providers: [SocketGateway],
})
export class SocketModule {}
