import { Provider } from '@nestjs/common';
import { createFarmsRepoProvider, findFarmsRepoProvider } from '../repos';
import { createFarmsServiceProvider } from '../services/farms';

const allFarmsRepoProvider: Provider[] = [
  createFarmsRepoProvider,
  findFarmsRepoProvider,
];
const allFarmsServiceProvider: Provider[] = [createFarmsServiceProvider];

const farmsProviders: Provider[] = [
  ...allFarmsServiceProvider,
  ...allFarmsRepoProvider,
];

export { farmsProviders };
