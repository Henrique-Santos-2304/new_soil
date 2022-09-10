import { CreateUserDto, ICreateUserService, UserModel } from '@root/domain';

const createUserMocked: CreateUserDto = {
  login: 'soil',
  password: '1234',
  userType: 'SUDO',
};

const createUserRequestMocked: ICreateUserService.Params = {
  ...createUserMocked,
  internal_password: process.env.INTERNAL_PASSWORD,
};

const userModelMocked: UserModel = { ...createUserMocked, user_id: '' };

export { createUserMocked, userModelMocked, createUserRequestMocked };
