import { Provider } from '@nestjs/common';
import { FindFarmRepo, CreateFarmRepo } from '@db/index';
import { DeleteFarmRepo } from '@root/infra/repositories/farms/delete-farm.repo';
import { UpdateFarmRepo } from '@root/infra/repositories/farms/update-farm.repo';
import { FARM_REPO } from '@root/shared';

const findFarmsRepoProvider: Provider = {
  provide: FARM_REPO.FIND,
  useClass: FindFarmRepo,
};

const createFarmsRepoProvider: Provider = {
  provide: FARM_REPO.CREATE,
  useClass: CreateFarmRepo,
};

const deleteFarmsRepoProvider: Provider = {
  provide: FARM_REPO.DELETE,
  useClass: DeleteFarmRepo,
};

const updateFarmsRepoProvider: Provider = {
  provide: FARM_REPO.UPDATE,
  useClass: UpdateFarmRepo,
};

export {
  findFarmsRepoProvider,
  createFarmsRepoProvider,
  deleteFarmsRepoProvider,
  updateFarmsRepoProvider,
};
