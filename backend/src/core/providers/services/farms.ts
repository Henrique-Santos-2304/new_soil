import { Provider } from '@nestjs/common';
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

export {
  createFarmsServiceProvider,
  findFarmByUserServiceProvider,
  deleteFarmServiceProvider,
  updateFarmServiceProvider,
};
