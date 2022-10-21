import { Provider } from '@nestjs/common';
import { CreateAuthorizeRepo } from '@root/infra/repositories/authorize/create-authorize.repo';
import { FindAuthorizeRepo } from '@root/infra/repositories/authorize/find-authorize.repo';

const createAuthorizeProvider: Provider = {
  provide: 'ICreateAuthorizeRepo',
  useClass: CreateAuthorizeRepo,
};

const findAuthorizeRepoProvider: Provider = {
  provide: 'IFindAuthorizeRepo',
  useClass: FindAuthorizeRepo,
};

export { createAuthorizeProvider, findAuthorizeRepoProvider };
