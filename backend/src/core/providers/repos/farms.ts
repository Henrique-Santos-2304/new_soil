import { Provider } from '@nestjs/common';
import { CreateFarmRepo } from '@root/infra/repositories/farms';
import { FindFarmRepo } from '@root/infra/repositories/farms/find_farm.repo';

const findFarmsRepoProvider: Provider = {
  provide: 'IFindFarmsRepo',
  useClass: FindFarmRepo,
};

const createFarmsRepoProvider: Provider = {
  provide: 'ICreateFarmRepo',
  useClass: CreateFarmRepo,
};

export { findFarmsRepoProvider, createFarmsRepoProvider };
