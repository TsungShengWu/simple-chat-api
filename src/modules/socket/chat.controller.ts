import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { GetUser } from '../auth/get-user.decorator';
import { AuthUser } from '../auth/auth-user.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostMessageDto } from './post-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private socketGateway: SocketGateway) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postMessage(@GetUser() user: AuthUser, @Body() data: PostMessageDto) {
    return this.socketGateway.postMessage(user, data);
  }
}
