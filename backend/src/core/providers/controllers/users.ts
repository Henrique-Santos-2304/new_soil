import { Provider } from '@nestjs/common';
import {
  AuthUserResolver,
  CreateUserResolver,
  GetUsersResolver,
} from '@resolvers/index';

const createUserControllerProvider: Provider = {
  provide: 'ICreateUserController',
  useClass: CreateUserResolver,
};

const authUserControllerProvider: Provider = {
  provide: 'IAuthUserController',
  useClass: AuthUserResolver,
};

const getUsersControllerProvider: Provider = {
  provide: 'IGetUserController',
  useClass: GetUsersResolver,
};

export {
  createUserControllerProvider,
  authUserControllerProvider,
  getUsersControllerProvider,
};
