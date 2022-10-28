import { UserModel } from '../models';

export type UserRequestAuth = Pick<UserModel, 'userType' | 'user_id'>;
