import { Test, TestingModule } from '@nestjs/testing';
import {
  IFindAllAuthorizeService,
  IGetAuthorizationsController,
} from '@root/domain';
import { authorizeModelMock } from '@testRoot/index';
import { mock, MockProxy } from 'jest-mock-extended';
import { GetAuthorizationsResolver } from '../../find-all-authorize.resolver';

describe('Get Authorization Controller Unit', () => {
  let controller: IGetAuthorizationsController;
  let service: MockProxy<IFindAllAuthorizeService>;

  beforeEach(async () => {
    service = mock();
    const getAuthorizeService = {
      provide: 'IFindAllAuthorizeService',
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAuthorizationsResolver, getAuthorizeService],
    }).compile();

    controller = module.get(GetAuthorizationsResolver);

    service.start.mockResolvedValue({
      status: 'Sucess',
      authorize: [authorizeModelMock],
    });
  });

  it('should service and controller to be defined', async () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should authorization to have been called', async () => {
    const spy = jest.spyOn(controller, 'getAuthorizations');

    await controller.getAuthorizations();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.getAuthorizations();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.getAuthorizations();
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be list authorizations if service pass with sucess', async () => {
    const response = await controller.getAuthorizations();
    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('authorize', [authorizeModelMock]);
  });
});
