import { IFindUserRepo, ICreateUserRepo, IDeleteUserRepo } from '@root/domain';
import { USER_REPO } from '@root/shared';
import { MockProxy, mock } from 'jest-mock-extended';

const findUserRepoMock: MockProxy<IFindUserRepo> = mock();
const createUserRepoMock: MockProxy<ICreateUserRepo> = mock();
const deleteUserRepoMock: MockProxy<IDeleteUserRepo> = mock();

const findUserRepoMockProvider = {
  provide: USER_REPO.FIND,
  useValue: findUserRepoMock,
};

const createUserRepoMockProvider = {
  provide: USER_REPO.CREATE,
  useValue: createUserRepoMock,
};

const deleteUserRepoMockProvider = {
  provide: USER_REPO.DELETE,
  useValue: deleteUserRepoMock,
};

export {
  createUserRepoMock,
  createUserRepoMockProvider,
  findUserRepoMockProvider,
  findUserRepoMock,
  deleteUserRepoMock,
  deleteUserRepoMockProvider,
};
