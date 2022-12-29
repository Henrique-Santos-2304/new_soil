import { ICreateAuthorizeRepo, IFindAuthorizeRepo } from '@root/domain';
import { AUTHORIZE_REPO } from '@root/shared';
import { mock, MockProxy } from 'jest-mock-extended';

const findAuthorizeRepoMock: MockProxy<IFindAuthorizeRepo> = mock();
const createAuthorizeRepoMock: MockProxy<ICreateAuthorizeRepo> = mock();

const findAuthorizeRepoMockProvider = {
  provide: AUTHORIZE_REPO.FIND,
  useValue: findAuthorizeRepoMock,
};

const createAuthorizeRepoMockProvider = {
  provide: AUTHORIZE_REPO.CREATE,
  useValue: createAuthorizeRepoMock,
};

export {
  findAuthorizeRepoMockProvider,
  createAuthorizeRepoMockProvider,
  findAuthorizeRepoMock,
  createAuthorizeRepoMock,
};
