import { Provider } from '@nestjs/common';
import {
  AuthUserResolver,
  CreateUserResolver,
  GetUsersResolver,
} from '@root/presentation';

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
