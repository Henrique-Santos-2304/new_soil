import { Provider } from '@nestjs/common';
import { USER_SERVICE } from '@root/shared';
import {
  AuthUserService,
  CreateUserService,
  DeleteUserService,
  GetAllUserService,
  GetUserByIdService,
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

const getUserByIdServiceMock: Provider = {
  provide: USER_SERVICE.FIND_BY_ID,
  useClass: GetUserByIdService,
};

const deleteUserServiceMock: Provider = {
  provide: USER_SERVICE.DELETE,
  useClass: DeleteUserService,
};

export {
  createUserServiceProvider,
  authUserServiceProvider,
  getUsersServiceProvider,
  getUserByIdServiceMock,
  deleteUserServiceMock,
};
