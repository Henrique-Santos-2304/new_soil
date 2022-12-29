import { Provider } from '@nestjs/common';
import {
  AuthUserResolver,
  CreateUserResolver,
  GetUsersResolver,
} from '@resolvers/index';
import { USER_CONTROLLER } from '@root/shared';

const createUserControllerProvider: Provider = {
  provide: USER_CONTROLLER.CREATE,
  useClass: CreateUserResolver,
};

const authUserControllerProvider: Provider = {
  provide: USER_CONTROLLER.AUTH,
  useClass: AuthUserResolver,
};

const getUsersControllerProvider: Provider = {
  provide: USER_CONTROLLER.GET,
  useClass: GetUsersResolver,
};

export {
  createUserControllerProvider,
  authUserControllerProvider,
  getUsersControllerProvider,
};
