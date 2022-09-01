import { CreateUserDto, UserModel } from '@root/domain';

const createUserMocked: CreateUserDto = {
  login: 'soil',
  password: '1234',
  userType: 'SUDO',
};
const userModelMocked: UserModel = { ...createUserMocked, user_id: '' };

export { createUserMocked, userModelMocked };
