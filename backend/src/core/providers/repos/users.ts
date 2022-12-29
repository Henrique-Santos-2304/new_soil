import { Provider } from '@nestjs/common';
import { CreateUserRepo, FindUserRepo } from '@db/index';
import { USER_REPO } from '@root/shared';

const createUserRepoProvider: Provider = {
  provide: USER_REPO.CREATE,
  useClass: CreateUserRepo,
};

const findUserRepoProvider: Provider = {
  provide: USER_REPO.FIND,
  useClass: FindUserRepo,
};

export { createUserRepoProvider, findUserRepoProvider };
