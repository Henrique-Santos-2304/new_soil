import { Provider } from '@nestjs/common';
import { FindFarmRepo, CreateFarmRepo } from '@db/index';

const findFarmsRepoProvider: Provider = {
  provide: 'IFindFarmsRepo',
  useClass: FindFarmRepo,
};

const createFarmsRepoProvider: Provider = {
  provide: 'ICreateFarmRepo',
  useClass: CreateFarmRepo,
};

export { findFarmsRepoProvider, createFarmsRepoProvider };
