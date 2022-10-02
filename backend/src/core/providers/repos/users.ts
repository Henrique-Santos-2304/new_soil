import { Provider } from '@nestjs/common';
import { CreateUserRepo, FindUserRepo } from '@root/infra';

const createUserRepoProvider: Provider = {
  provide: 'ICreateUserRepo',
  useClass: CreateUserRepo,
};

const findUserByLoginRepoProvider: Provider = {
  provide: 'IFindUserRepo',
  useClass: FindUserRepo,
};

export { createUserRepoProvider, findUserByLoginRepoProvider };
