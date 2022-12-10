import { Provider } from '@nestjs/common';
import { AddUserIntoFarmService } from '@root/data/usecases/farms/add-user-into-farm.service';
import {
  GetFarmsByUser,
  UpdateFarmService,
  CreateFarmService,
  DeleteFarmService,
} from '@usecases/index';

const createFarmsServiceProvider: Provider = {
  provide: 'ICreateFarmService',
  useClass: CreateFarmService,
};

const findFarmByUserServiceProvider: Provider = {
  provide: 'IGetAllFarmsByUserService',
  useClass: GetFarmsByUser,
};

const deleteFarmServiceProvider: Provider = {
  provide: 'IDeleteFarmService',
  useClass: DeleteFarmService,
};

const updateFarmServiceProvider: Provider = {
  provide: 'IUpdateFarmService',
  useClass: UpdateFarmService,
};

const addUserIntoFarmServiceProvider: Provider = {
  provide: 'IAddUserIntoFarmService',
  useClass: AddUserIntoFarmService,
};

export {
  createFarmsServiceProvider,
  findFarmByUserServiceProvider,
  deleteFarmServiceProvider,
  updateFarmServiceProvider,
  addUserIntoFarmServiceProvider,
};
