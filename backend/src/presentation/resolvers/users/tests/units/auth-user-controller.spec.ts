import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IAuthUserController, IAuthUserService } from '@root/domain';
import { USER_SERVICE } from '@root/shared';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { authUserRequestMocked } from '@testRoot/mocks';
import { loggerMock } from '@testRoot/mocks/utils/logger-mock';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthUserResolver } from '../../auth-user-controller.resolver';

describe('Auth User Controller Unit', () => {
  let controller: IAuthUserController;
  let service: MockProxy<IAuthUserService>;
  let logger: Logger;
  const ctx = {
    userDS: {
      handleResponse: jest
        .fn()
        .mockReturnValue({ status: 'Sucess', token: 'token_valid' }),
    },
  };

  beforeEach(async () => {
    service = mock();
    const createUserService = {
      provide: USER_SERVICE.AUTH,
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthUserResolver, createUserService, loggerMock],
    }).compile();

    controller = module.get<IAuthUserController>(AuthUserResolver);
    logger = module.get<Logger>(Logger);
    service.start.mockResolvedValue({ status: 'Sucess', token: 'token_valid' });
  });

  it('should create.user to have been called', async () => {
    const spy = jest.spyOn(controller, 'authUser');

    await controller.authUser(ctx, authUserRequestMocked);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(ctx, authUserRequestMocked);
  });

  it('should service to have not been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.authUser(ctx, authUserRequestMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(authUserRequestMocked);
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(logger, 'log');

    await controller.authUser(ctx, authUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Autenticando Usuario...');
  });
  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.authUser(ctx, authUserRequestMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
    expect(response).not.toHaveProperty('token');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(logger, 'log');
    const spyErr = jest.spyOn(logger, 'error');

    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    await controller.authUser(ctx, authUserRequestMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Autenticando Usuario...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.authError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.authUser(ctx, authUserRequestMocked);
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.authUser(ctx, authUserRequestMocked);
    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('token', 'token_valid');
    expect(response).not.toHaveProperty('error');
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(logger, 'log');

    await controller.authUser(ctx, authUserRequestMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Autenticando Usuario...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.authSucess);
  });
});
