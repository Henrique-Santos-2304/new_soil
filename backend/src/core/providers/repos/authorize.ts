import { Provider } from '@nestjs/common';
import { CreateAuthorizeRepo } from '@repos/authorize/create-authorize.repo';
import { FindAuthorizeRepo } from '@root/infra/repositories/authorize/find-authorize.repo';
import { AUTHORIZE_REPO } from '@root/shared';

const createAuthorizeProvider: Provider = {
  provide: AUTHORIZE_REPO.CREATE,
  useClass: CreateAuthorizeRepo,
};

const findAuthorizeRepoProvider: Provider = {
  provide: AUTHORIZE_REPO.FIND,
  useClass: FindAuthorizeRepo,
};

export { createAuthorizeProvider, findAuthorizeRepoProvider };
