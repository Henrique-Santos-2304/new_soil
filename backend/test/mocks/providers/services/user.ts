import { USER_SERVICE } from '@root/shared';
import { mock, MockProxy } from 'jest-mock-extended';
import {
  IAuthUserService,
  ICreateUserService,
  IGetAllUserService,
} from '@root/domain';

const createUserServiceMock: MockProxy<ICreateUserService> = mock();
const authUserServiceMock: MockProxy<IAuthUserService> = mock();
const getAllUserServiceMock: MockProxy<IGetAllUserService> = mock();

const createUserServiceMockProvider = {
  provide: USER_SERVICE.CREATE,
  useValue: createUserServiceMock,
};

const authUserServiceMockProvider = {
  provide: USER_SERVICE.AUTH,
  useValue: authUserServiceMock,
};

const getAllUserServiceMockProvider = {
  provide: USER_SERVICE.GET_ALL,
  useValue: getAllUserServiceMock,
};

export {
  createUserServiceMockProvider,
  createUserServiceMock,
  authUserServiceMock,
  authUserServiceMockProvider,
  getAllUserServiceMock,
  getAllUserServiceMockProvider,
};
