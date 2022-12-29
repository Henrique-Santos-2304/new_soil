import { Test, TestingModule } from '@nestjs/testing';
import { IGetAuthorizationsController } from '@root/domain';
import { GetAuthorizationsResolver } from '../../find-all-authorize.resolver';
import { messageRequest } from '@root/shared/usecases/logs-request';
import {
  authorizeModelMock,
  findAuthorizeServiceMock,
  findAuthorizeServiceMockProvider,
  loggerMock,
  loggerMockProvider,
} from '@testRoot/index';

describe('Get Authorization Controller Unit', () => {
  let controller: IGetAuthorizationsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAuthorizationsResolver,
        findAuthorizeServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<IGetAuthorizationsController>(
      GetAuthorizationsResolver,
    );

    findAuthorizeServiceMock.start.mockResolvedValue({
      status: 'Sucess',
      authorize: [authorizeModelMock],
    });
  });

  it('should service and controller to be defined', async () => {
    expect(findAuthorizeServiceMock).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should authorization to have been called', async () => {
    const spy = jest.spyOn(controller, 'getAuthorizations');

    await controller.getAuthorizations();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.getAuthorizations();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Buscando pedidos de altorização...');
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(findAuthorizeServiceMock, 'start');

    await controller.getAuthorizations();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    findAuthorizeServiceMock.start.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = await controller.getAuthorizations();
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    findAuthorizeServiceMock.start.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    await controller.getAuthorizations();
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Buscando pedidos de altorização...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.findError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should be list authorizations if service pass with sucess', async () => {
    const response = await controller.getAuthorizations();
    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('authorize', [authorizeModelMock]);
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.getAuthorizations();
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Buscando pedidos de altorização...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.findSucess);
  });
});
