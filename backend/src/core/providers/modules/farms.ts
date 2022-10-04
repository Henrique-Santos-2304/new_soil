import { Logger, Provider } from '@nestjs/common';
import { createFarmControllerProvider } from '../controllers';
import {
  createFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
} from '../repos';
import { createFarmsServiceProvider } from '../services';

const allFarmsRepoProvider: Provider[] = [
  createFarmsRepoProvider,
  findFarmsRepoProvider,
  findUserRepoProvider,
];
const allFarmsServiceProvider: Provider[] = [createFarmsServiceProvider];
const allFarmsControllers: Provider[] = [createFarmControllerProvider];
const allUtilsFarmProviders: Provider[] = [Logger];

const farmsProviders: Provider[] = [
  ...allFarmsServiceProvider,
  ...allFarmsRepoProvider,
  ...allFarmsControllers,
  ...allUtilsFarmProviders,
];

export { farmsProviders };
