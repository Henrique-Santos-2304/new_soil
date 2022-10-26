import { Logger, Provider } from '@nestjs/common';
import {
  createFarmControllerProvider,
  deleteFarmControllerProvider,
  findFarmControllerProvider,
} from '../controllers';
import {
  createFarmsRepoProvider,
  deleteFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
} from '../repos';
import {
  createFarmsServiceProvider,
  deleteFarmServiceProvider,
  findFarmByUserServiceProvider,
} from '../services';

const allFarmsRepoProvider: Provider[] = [
  createFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
  deleteFarmsRepoProvider,
];
const allFarmsServiceProvider: Provider[] = [
  createFarmsServiceProvider,
  findFarmByUserServiceProvider,
  deleteFarmServiceProvider,
];
const allFarmsControllers: Provider[] = [
  createFarmControllerProvider,
  findFarmControllerProvider,
  deleteFarmControllerProvider,
];
const allUtilsFarmProviders: Provider[] = [Logger];

const farmsProviders: Provider[] = [
  ...allFarmsServiceProvider,
  ...allFarmsRepoProvider,
  ...allFarmsControllers,
  ...allUtilsFarmProviders,
];

export { farmsProviders };
