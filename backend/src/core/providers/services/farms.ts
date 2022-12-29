import { Provider } from '@nestjs/common';
import { AddUserIntoFarmService } from '@root/data/usecases/farms/add-user-into-farm.service';
import { FARM_SERVICE } from '@root/shared';
import {
  GetFarmsByUser,
  UpdateFarmService,
  CreateFarmService,
  DeleteFarmService,
} from '@usecases/index';

const createFarmsServiceProvider: Provider = {
  provide: FARM_SERVICE.CREATE,
  useClass: CreateFarmService,
};

const findFarmByUserServiceProvider: Provider = {
  provide: FARM_SERVICE.FIND,
  useClass: GetFarmsByUser,
};

const deleteFarmServiceProvider: Provider = {
  provide: FARM_SERVICE.DELETE,
  useClass: DeleteFarmService,
};

const updateFarmServiceProvider: Provider = {
  provide: FARM_SERVICE.UPDATE,
  useClass: UpdateFarmService,
};

const addUserIntoFarmServiceProvider: Provider = {
  provide: FARM_SERVICE.ADD_USER,
  useClass: AddUserIntoFarmService,
};

export {
  createFarmsServiceProvider,
  findFarmByUserServiceProvider,
  deleteFarmServiceProvider,
  updateFarmServiceProvider,
  addUserIntoFarmServiceProvider,
};
