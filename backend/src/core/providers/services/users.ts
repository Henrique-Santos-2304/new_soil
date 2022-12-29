import { Provider } from '@nestjs/common';
import { USER_SERVICE } from '@root/shared';
import {
  AuthUserService,
  CreateUserService,
  GetAllUserService,
} from '@usecases/index';

const createUserServiceProvider: Provider = {
  provide: USER_SERVICE.CREATE,
  useClass: CreateUserService,
};

const authUserServiceProvider: Provider = {
  provide: USER_SERVICE.AUTH,
  useClass: AuthUserService,
};

const getUsersServiceProvider: Provider = {
  provide: USER_SERVICE.GET_ALL,
  useClass: GetAllUserService,
};

export {
  createUserServiceProvider,
  authUserServiceProvider,
  getUsersServiceProvider,
};
