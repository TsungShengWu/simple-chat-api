import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { AuthUser } from '../auth/auth-user.type';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CustomServer } from './socket.type';
import { SocketEvent } from './event.enum';
import { PostMessageDto } from './post-message.dto';

@WebSocketGateway({
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: { origin: '*' },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private userService: UserService) {}

  @WebSocketServer()
  private server: CustomServer;
  private logger: Logger = new Logger('SocketGateway');
  private members: User[] = [];

  parseToken(client: Socket) {
    const token = client.handshake.auth.token as string;

    try {
      return verify(token, process.env.JWT_SECRET) as AuthUser;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async handleConnection(client: Socket) {
    const user = this.parseToken(client);

    if (user.id) {
      const newMember = await this.userService.getUserById(user.id);

      if (newMember) {
        this.server.emit(SocketEvent.MEMBER_JOIN, newMember);
        this.members.push(newMember);

        client.join(`user_${user.id}`);
        this.server
          .to(`user_${user.id}`)
          .emit(SocketEvent.ALL_MEMBERS, { members: this.members });
      }
    }
  }

  handleDisconnect(client: Socket) {
    const user = this.parseToken(client);

    if (user.id) {
      this.members = this.members.filter((member) => member.id !== user.id);
      this.server.emit(SocketEvent.MEMBER_LEAVE, { id: user.id });
    }
  }

  postMessage(user: AuthUser, data: PostMessageDto) {
    // TODO: Save message to database.
    this.server.emit(SocketEvent.NEW_MESSAGE, {
      content: data.content,
      createdAt: new Date().toISOString(),
      userId: user.id,
    });
  }
}
