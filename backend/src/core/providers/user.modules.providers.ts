import { Provider } from '@nestjs/common';
import { EncrypterData } from '@root/data/validators/encrypter';
import { CreateUserRepo, FindUserRepo } from '@repos/index';
import { CreateUserService } from '@usecases/index';
import { Logger } from '@nestjs/common';
import { CreateUserResolver } from '@resolvers/index';

const createService: Provider = {
  provide: 'ICreateUserService',
  useClass: CreateUserService,
};

const createRepo: Provider = {
  provide: 'ICreateUserRepo',
  useClass: CreateUserRepo,
};

const findByLoginRepo: Provider = {
  provide: 'IFindUserRepo',
  useClass: FindUserRepo,
};

const encrypterProvider: Provider = {
  provide: 'IEncrypterData',
  useClass: EncrypterData,
};

const userProviders: Provider[] = [
  createService,
  createRepo,
  findByLoginRepo,
  encrypterProvider,
  Logger,
];

const createUserController: Provider = {
  provide: 'ICreateUserController',
  useClass: CreateUserResolver,
};

const userControllersProviders: Provider[] = [createUserController];

export { userProviders, userControllersProviders };
