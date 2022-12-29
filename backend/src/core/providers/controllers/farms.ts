import { Provider } from '@nestjs/common';
import { CreateFarmResolver, DeleteFarmResolver } from '@resolvers/index';
import { AddUserIntoFarmResolver } from '@root/presentation/resolvers/farms/add-user-into-farm.controller.resolver';
import { GetFarmsResolver } from '@root/presentation/resolvers/farms/find-farm-by-user-controller.resolver';
import { UpdateFarmResolver } from '@root/presentation/resolvers/farms/update-farm-controller.resolver';
import { FARM_CONTROLLER } from '@root/shared';

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
