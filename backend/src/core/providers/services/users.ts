import { Provider } from '@nestjs/common';
import {
  AuthUserService,
  CreateUserService,
  GetAllUserService,
} from '@usecases/index';

const createUserServiceProvider: Provider = {
  provide: 'ICreateUserService',
  useClass: CreateUserService,
};

const authUserServiceProvider: Provider = {
  provide: 'IAuthUserService',
  useClass: AuthUserService,
};

const getUsersServiceProvider: Provider = {
  provide: 'IGetAllUserService',
  useClass: GetAllUserService,
};

export {
  createUserServiceProvider,
  authUserServiceProvider,
  getUsersServiceProvider,
};
