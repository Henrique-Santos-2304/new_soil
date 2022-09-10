import { Provider } from '@nestjs/common';
import { EncrypterData } from '@root/data/validators/encrypter';
import { CreateUserRepo, FindUserRepo } from '@repos/index';
import { AuthUserService, CreateUserService } from '@usecases/index';
import { Logger } from '@nestjs/common';
import { CreateUserResolver } from '@resolvers/index';
import { TokenService } from '@root/data';
import { AuthUserResolver } from '@root/presentation/resolvers/users/auth-user-controller.resolver';

const createService: Provider = {
  provide: 'ICreateUserService',
  useClass: CreateUserService,
};

const authService: Provider = {
  provide: 'IAuthUserService',
  useClass: AuthUserService,
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

const tokenProvider: Provider = {
  provide: 'ITokenService',
  useClass: TokenService,
};

const userProviders: Provider[] = [
  createService,
  authService,
  createRepo,
  findByLoginRepo,
  encrypterProvider,
  tokenProvider,
  Logger,
];

const createUserController: Provider = {
  provide: 'ICreateUserController',
  useClass: CreateUserResolver,
};

const authUserController: Provider = {
  provide: 'IAuthUserController',
  useClass: AuthUserResolver,
};

const userControllersProviders: Provider[] = [
  createUserController,
  authUserController,
];

export { userProviders, userControllersProviders };
