import { Provider } from '@nestjs/common';
import { CreateFarmResolver } from '@resolvers/index';
import { GetFarmsResolver } from '@root/presentation/resolvers/farms/find-farm-by-user-controller.resolver';

const createFarmControllerProvider: Provider = {
  provide: 'ICreateFarmController',
  useClass: CreateFarmResolver,
};

const findFarmControllerProvider: Provider = {
  provide: 'IGetFarmsController',
  useClass: GetFarmsResolver,
};

export { createFarmControllerProvider, findFarmControllerProvider };
