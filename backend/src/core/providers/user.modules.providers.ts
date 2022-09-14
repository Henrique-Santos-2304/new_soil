import { Logger, Provider } from '@nestjs/common';
import { EncrypterData, TokenService } from '@root/data/validators';
import { CreateUserRepo, FindUserRepo } from '@repos/index';
import { AuthUserService, CreateUserService } from '@usecases/index';
import { CreateUserResolver, AuthUserResolver } from '@resolvers/index';

// Controllers
const createUserController: Provider = {
  provide: 'ICreateUserController',
  useClass: CreateUserResolver,
};

const authUserController: Provider = {
  provide: 'IAuthUserController',
  useClass: AuthUserResolver,
};

// Services
const createService: Provider = {
  provide: 'ICreateUserService',
  useClass: CreateUserService,
};

const authUserService: Provider = {
  provide: 'IAuthUserService',
  useClass: AuthUserService,
};

// Repositories
const createRepo: Provider = {
  provide: 'ICreateUserRepo',
  useClass: CreateUserRepo,
};

const findByLoginRepo: Provider = {
  provide: 'IFindUserRepo',
  useClass: FindUserRepo,
};

// Utils
const encrypterProvider: Provider = {
  provide: 'IEncrypterData',
  useClass: EncrypterData,
};

const tokenProvider: Provider = {
  provide: 'ITokenService',
  useClass: TokenService,
};

const services: Provider[] = [createService, authUserService];
const repositories: Provider[] = [createRepo, findByLoginRepo];
const utils: Provider[] = [tokenProvider, encrypterProvider, Logger];
const controllers: Provider[] = [createUserController, authUserController];

const allProviders = [...utils, ...repositories, ...services, ...controllers];

export { allProviders };
