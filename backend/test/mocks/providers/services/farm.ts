import {
  IAddUserIntoFarmService,
  ICreateFarmService,
  IDeleteFarmService,
  IGetAllFarmsByUserService,
  IUpdateFarmService,
} from '@root/domain';
import { FARM_SERVICE } from '@root/shared';
import { mock, MockProxy } from 'jest-mock-extended';

const createFarmServiceMock: MockProxy<ICreateFarmService> = mock();
const addUserIntoFarmServiceMock: MockProxy<IAddUserIntoFarmService> = mock();
const findFarmByUserServiceMock: MockProxy<IGetAllFarmsByUserService> = mock();
const deleteFarmServiceMock: MockProxy<IDeleteFarmService> = mock();
const updateFarmServiceMock: MockProxy<IUpdateFarmService> = mock();

const createFarmServiceMockProvider = {
  provide: FARM_SERVICE.CREATE,
  useValue: createFarmServiceMock,
};

const addUserIntoFarmServiceMockProvider = {
  provide: FARM_SERVICE.ADD_USER,
  useValue: addUserIntoFarmServiceMock,
};

const findFarmByUserServiceMockProvider = {
  provide: FARM_SERVICE.FIND,
  useValue: findFarmByUserServiceMock,
};

const updateFarmServiceMockProvider = {
  provide: FARM_SERVICE.UPDATE,
  useValue: updateFarmServiceMock,
};

const deleteFarmServiceMockProvider = {
  provide: FARM_SERVICE.DELETE,
  useValue: deleteFarmServiceMock,
};

export {
  createFarmServiceMockProvider,
  createFarmServiceMock,
  addUserIntoFarmServiceMock,
  addUserIntoFarmServiceMockProvider,
  findFarmByUserServiceMock,
  findFarmByUserServiceMockProvider,
  updateFarmServiceMock,
  updateFarmServiceMockProvider,
  deleteFarmServiceMock,
  deleteFarmServiceMockProvider,
};
