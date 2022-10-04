import { Provider } from '@nestjs/common';
import { CreateUserRepo, FindUserRepo } from '@db/index';

const createUserRepoProvider: Provider = {
  provide: 'ICreateUserRepo',
  useClass: CreateUserRepo,
};

const findUserRepoProvider: Provider = {
  provide: 'IFindUserRepo',
  useClass: FindUserRepo,
};

export { createUserRepoProvider, findUserRepoProvider };
