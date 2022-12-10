import { Logger, Provider } from '@nestjs/common';
import {
  addUserIntoFarmControllerProvider,
  createFarmControllerProvider,
  deleteFarmControllerProvider,
  findFarmControllerProvider,
  updateFarmControllerProvider,
} from '../controllers';
import {
  createFarmsRepoProvider,
  createUserRepoProvider,
  deleteFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
  updateFarmsRepoProvider,
} from '../repos';
import {
  addUserIntoFarmServiceProvider,
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
  addUserIntoFarmServiceProvider,
];
const allFarmsControllers: Provider[] = [
  createFarmControllerProvider,
  findFarmControllerProvider,
  deleteFarmControllerProvider,
  updateFarmControllerProvider,
  addUserIntoFarmControllerProvider,
];

const allUtilsFarmProviders: Provider[] = [
  Logger,
  createUserRepoProvider,
  findUserRepoProvider,
];

const farmsProviders: Provider[] = [
  ...allFarmsServiceProvider,
  ...allFarmsRepoProvider,
  ...allFarmsControllers,
  ...allUtilsFarmProviders,
];

export { farmsProviders };
