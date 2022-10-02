import { Provider } from '@nestjs/common';
import { CreateFarmService } from '@root/data/usecases/farms/create-farm.service';

const createFarmsServiceProvider: Provider = {
  provide: 'ICreateFarmService',
  useClass: CreateFarmService,
};

export { createFarmsServiceProvider };
