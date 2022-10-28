import { Provider } from '@nestjs/common';
import { FindFarmRepo, CreateFarmRepo } from '@db/index';
import { DeleteFarmRepo } from '@root/infra/repositories/farms/delete-farm.repo';
import { UpdateFarmRepo } from '@root/infra/repositories/farms/update-farm.repo';

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

const updateFarmsRepoProvider: Provider = {
  provide: 'IUpdateFarmRepo',
  useClass: UpdateFarmRepo,
};

export {
  findFarmsRepoProvider,
  createFarmsRepoProvider,
  deleteFarmsRepoProvider,
  updateFarmsRepoProvider,
};
