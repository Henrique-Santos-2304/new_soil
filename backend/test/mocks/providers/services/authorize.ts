import {
  ICreateAuthorizeService,
  IFindAllAuthorizeService,
} from '@contracts/index';
import { AUTHORIZE_SERVICE } from '@root/shared';
import { mock, MockProxy } from 'jest-mock-extended';

const createAuthorizeServiceMock: MockProxy<ICreateAuthorizeService> = mock();
const findAuthorizeServiceMock: MockProxy<IFindAllAuthorizeService> = mock();

const createAuthorizeServiceMockProvider = {
  provide: AUTHORIZE_SERVICE.CREATE,
  useValue: createAuthorizeServiceMock,
};

const findAuthorizeServiceMockProvider = {
  provide: AUTHORIZE_SERVICE.FIND,
  useValue: findAuthorizeServiceMock,
};

export {
  createAuthorizeServiceMockProvider,
  createAuthorizeServiceMock,
  findAuthorizeServiceMock,
  findAuthorizeServiceMockProvider,
};
