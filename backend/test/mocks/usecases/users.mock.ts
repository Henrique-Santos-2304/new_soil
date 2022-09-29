import { CreateUserDto, ICreateUserService, UserModel } from '@root/domain';

const createUserMocked: CreateUserDto = {
  login: 'soil',
  password: '1234',
  userType: 'MASTER',
};

const createUserRequestMocked: ICreateUserService.Params = {
  ...createUserMocked,
  internal_password: process.env.INTERNAL_PASSWORD,
};

const authUserRequestMocked = {
  login: 'soil',
  password: '1234',
};

const userModelMocked: UserModel = { ...createUserMocked, user_id: '' };

export {
  createUserMocked,
  userModelMocked,
  createUserRequestMocked,
  authUserRequestMocked,
};
