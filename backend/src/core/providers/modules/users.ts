import { Provider } from '@nestjs/common';
import { createUserRepoProvider, findUserRepoProvider } from '../repos';

import {
  authUserControllerProvider,
  createUserControllerProvider,
  getUsersControllerProvider,
} from '../controllers';
import {
  authUserServiceProvider,
  createUserServiceProvider,
  getUsersServiceProvider,
} from '../services';
import {
  authGuardProvider,
  encrypterProvider,
  jwtStrategyProvider,
  loggerServiceProvider,
  tokenProvider,
} from '../utils';

const allUserReposProvider: Provider[] = [
  createUserRepoProvider,
  findUserRepoProvider,
];

const allControllersUserProviders: Provider[] = [
  createUserControllerProvider,
  authUserControllerProvider,
  getUsersControllerProvider,
];

const allServicesUserProviders: Provider[] = [
  createUserServiceProvider,
  authUserServiceProvider,
  getUsersServiceProvider,
];

const allUtilsUserProviders: Provider[] = [
  tokenProvider,
  encrypterProvider,
  jwtStrategyProvider,
  authGuardProvider,
  loggerServiceProvider,
];

const userProviders: Provider[] = [
  ...allUserReposProvider,
  ...allControllersUserProviders,
  ...allServicesUserProviders,
  ...allUtilsUserProviders,
];

export { userProviders };
