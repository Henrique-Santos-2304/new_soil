import { Provider } from '@nestjs/common';
import { CreateFarmResolver, DeleteFarmResolver } from '@resolvers/index';
import { GetFarmsResolver } from '@root/presentation/resolvers/farms/find-farm-by-user-controller.resolver';
import { UpdateFarmResolver } from '@root/presentation/resolvers/farms/update-farm-controller.resolver';

const createFarmControllerProvider: Provider = {
  provide: 'ICreateFarmController',
  useClass: CreateFarmResolver,
};

const findFarmControllerProvider: Provider = {
  provide: 'IGetFarmsController',
  useClass: GetFarmsResolver,
};

const deleteFarmControllerProvider: Provider = {
  provide: 'IDeleteFarmController',
  useClass: DeleteFarmResolver,
};

const updateFarmControllerProvider: Provider = {
  provide: 'IUpdateFarmController',
  useClass: UpdateFarmResolver,
};

export {
  createFarmControllerProvider,
  findFarmControllerProvider,
  deleteFarmControllerProvider,
  updateFarmControllerProvider,
};
