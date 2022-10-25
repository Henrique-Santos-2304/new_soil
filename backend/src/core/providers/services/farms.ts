import { Provider } from '@nestjs/common';
import { GetFarmsByUser } from '@root/data/usecases/farms/find-farms-by-user.service';
import { CreateFarmService } from '@usecases/index';

const createFarmsServiceProvider: Provider = {
  provide: 'ICreateFarmService',
  useClass: CreateFarmService,
};

const findFarmByUserServiceProvider: Provider = {
  provide: 'IGetAllFarmsByUserService',
  useClass: GetFarmsByUser,
};

export { createFarmsServiceProvider, findFarmByUserServiceProvider };
