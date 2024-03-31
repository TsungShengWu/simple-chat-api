import { User } from '../user/user.entity';

export interface AuthUser extends Pick<User, 'id'> {}
