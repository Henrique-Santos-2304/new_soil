import {
  ICreateFarmRepo,
  IUpdateFarmRepo,
  IDeleteFarmRepo,
  IFindFarmsRepo,
} from '@root/domain';
import { FARM_REPO } from '@root/shared';
import { MockProxy, mock } from 'jest-mock-extended';

const createFarmRepoMock: MockProxy<ICreateFarmRepo> = mock();
const updateFarmRepoMock: MockProxy<IUpdateFarmRepo> = mock();
const deleteFarmRepoMock: MockProxy<IDeleteFarmRepo> = mock();
const findFarmRepoMock: MockProxy<IFindFarmsRepo> = mock();

const findFarmRepoMockProvider = {
  provide: FARM_REPO.FIND,
  useValue: findFarmRepoMock,
};

const createFarmRepoMockProvider = {
  provide: FARM_REPO.CREATE,
  useValue: createFarmRepoMock,
};

const updateFarmRepoMockProvider = {
  provide: FARM_REPO.UPDATE,
  useValue: updateFarmRepoMock,
};

const deleteFarmRepoMockProvider = {
  provide: FARM_REPO.DELETE,
  useValue: deleteFarmRepoMock,
};

export {
  deleteFarmRepoMockProvider,
  updateFarmRepoMockProvider,
  createFarmRepoMockProvider,
  findFarmRepoMockProvider,
  findFarmRepoMock,
  createFarmRepoMock,
  updateFarmRepoMock,
  deleteFarmRepoMock,
};
