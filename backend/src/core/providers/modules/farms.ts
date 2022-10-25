import { Logger, Provider } from '@nestjs/common';
import {
  createFarmControllerProvider,
  findFarmControllerProvider,
} from '../controllers';
import {
  createFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
} from '../repos';
import {
  createFarmsServiceProvider,
  findFarmByUserServiceProvider,
} from '../services';

const allFarmsRepoProvider: Provider[] = [
  createFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
];
const allFarmsServiceProvider: Provider[] = [
  createFarmsServiceProvider,
  findFarmByUserServiceProvider,
];
const allFarmsControllers: Provider[] = [
  createFarmControllerProvider,
  findFarmControllerProvider,
];
const allUtilsFarmProviders: Provider[] = [Logger];

const farmsProviders: Provider[] = [
  ...allFarmsServiceProvider,
  ...allFarmsRepoProvider,
  ...allFarmsControllers,
  ...allUtilsFarmProviders,
];

export { farmsProviders };
