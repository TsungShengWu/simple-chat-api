import type { Server } from 'socket.io';
import type { User } from '../user/user.entity';
import type { SocketEvent } from './event.enum';

export interface ListenEventMap {}

interface NewMessage {
  content: string;
  createdAt: string;
  userId: number;
}

export interface EmitEventMap {
  [SocketEvent.ALL_MEMBERS]: (payload: { members: User[] }) => void;
  [SocketEvent.MEMBER_JOIN]: (payload: User) => void;
  [SocketEvent.MEMBER_LEAVE]: (payload: Pick<User, 'id'>) => void;
  [SocketEvent.NEW_MESSAGE]: (payload: NewMessage) => void;
}

export type CustomServer = Server<ListenEventMap, EmitEventMap>;
