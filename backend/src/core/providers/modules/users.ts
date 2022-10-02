import { Provider } from '@nestjs/common';
import {
  authUserControllerProvider,
  createUserControllerProvider,
  getUsersControllerProvider,
} from '../controllers';
import { createUserRepoProvider, findUserByLoginRepoProvider } from '../repos';
import {
  authUserServiceProvider,
  createUserServiceProvider,
  getUsersServiceProvider,
} from '../services';
import {
  authGuardProvider,
  encrypterProvider,
  jwtStrategyProvider,
  tokenProvider,
} from '../utils';

const allUserReposProvider: Provider[] = [
  createUserRepoProvider,
  findUserByLoginRepoProvider,
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
];

const userProviders: Provider[] = [
  ...allUserReposProvider,
  ...allControllersUserProviders,
  ...allServicesUserProviders,
  ...allUtilsUserProviders,
];

export { userProviders };
