import { Provider } from '@nestjs/common';
import { CreateFarmResolver, DeleteFarmResolver } from '@resolvers/index';
import { FARM_CONTROLLER } from '@root/shared';
import {
  AddUserIntoFarmResolver,
  UpdateFarmResolver,
  GetFarmsResolver,
} from '@resolvers/index';

const createFarmControllerProvider: Provider = {
  provide: FARM_CONTROLLER.CREATE,
  useClass: CreateFarmResolver,
};

const findFarmControllerProvider: Provider = {
  provide: FARM_CONTROLLER.FIND,
  useClass: GetFarmsResolver,
};

const deleteFarmControllerProvider: Provider = {
  provide: FARM_CONTROLLER.DELETE,
  useClass: DeleteFarmResolver,
};

const updateFarmControllerProvider: Provider = {
  provide: FARM_CONTROLLER.UPDATE,
  useClass: UpdateFarmResolver,
};

const addUserIntoFarmControllerProvider: Provider = {
  provide: FARM_CONTROLLER.ADD_USER,
  useClass: AddUserIntoFarmResolver,
};

export {
  createFarmControllerProvider,
  findFarmControllerProvider,
  deleteFarmControllerProvider,
  updateFarmControllerProvider,
  addUserIntoFarmControllerProvider,
};
