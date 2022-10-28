import { Logger, Provider } from '@nestjs/common';
import {
  createFarmControllerProvider,
  deleteFarmControllerProvider,
  findFarmControllerProvider,
  updateFarmControllerProvider,
} from '../controllers';
import {
  createFarmsRepoProvider,
  deleteFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
  updateFarmsRepoProvider,
} from '../repos';
import {
  createFarmsServiceProvider,
  deleteFarmServiceProvider,
  findFarmByUserServiceProvider,
  updateFarmServiceProvider,
} from '../services';

const allFarmsRepoProvider: Provider[] = [
  createFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
  deleteFarmsRepoProvider,
  updateFarmsRepoProvider,
];
const allFarmsServiceProvider: Provider[] = [
  createFarmsServiceProvider,
  findFarmByUserServiceProvider,
  deleteFarmServiceProvider,
  updateFarmServiceProvider,
];
const allFarmsControllers: Provider[] = [
  createFarmControllerProvider,
  findFarmControllerProvider,
  deleteFarmControllerProvider,
  updateFarmControllerProvider,
];

const allUtilsFarmProviders: Provider[] = [Logger];

const farmsProviders: Provider[] = [
  ...allFarmsServiceProvider,
  ...allFarmsRepoProvider,
  ...allFarmsControllers,
  ...allUtilsFarmProviders,
];

export { farmsProviders };
