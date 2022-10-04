import { Provider } from '@nestjs/common';
import { CreateFarmService } from '@usecases/index';

const createFarmsServiceProvider: Provider = {
  provide: 'ICreateFarmService',
  useClass: CreateFarmService,
};

export { createFarmsServiceProvider };
