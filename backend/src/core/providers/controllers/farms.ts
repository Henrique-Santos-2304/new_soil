import { Provider } from '@nestjs/common';
import { CreateFarmResolver } from '@resolvers/index';

const createFarmControllerProvider: Provider = {
  provide: 'ICreateFarmController',
  useClass: CreateFarmResolver,
};

export { createFarmControllerProvider };
