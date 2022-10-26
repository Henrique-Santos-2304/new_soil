import { Provider } from '@nestjs/common';
import { FindFarmRepo, CreateFarmRepo } from '@db/index';
import { DeleteFarmRepo } from '@root/infra/repositories/farms/delete-farm.repo';

const findFarmsRepoProvider: Provider = {
  provide: 'IFindFarmsRepo',
  useClass: FindFarmRepo,
};

const createFarmsRepoProvider: Provider = {
  provide: 'ICreateFarmRepo',
  useClass: CreateFarmRepo,
};

const deleteFarmsRepoProvider: Provider = {
  provide: 'IDeleteFarmRepo',
  useClass: DeleteFarmRepo,
};
export {
  findFarmsRepoProvider,
  createFarmsRepoProvider,
  deleteFarmsRepoProvider,
};
