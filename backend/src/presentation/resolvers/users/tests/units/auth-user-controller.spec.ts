import { Test, TestingModule } from '@nestjs/testing';
import { IAuthUserController } from '@root/domain';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { AuthUserResolver } from '../../auth-user-controller.resolver';
import {
  authUserRequestMocked,
  authUserServiceMock,
  authUserServiceMockProvider,
  loggerMock,
  loggerMockProvider,
} from '@testRoot/mocks';

describe('Auth User Controller Unit', () => {
  let controller: IAuthUserController;

  const ctx = {
    userDS: {
      handleResponse: jest
        .fn()
        .mockReturnValue({ status: 'Sucess', token: 'token_valid' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUserResolver,
        authUserServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<IAuthUserController>(AuthUserResolver);
    authUserServiceMock.start.mockResolvedValue({
      status: 'Sucess',
      token: 'token_valid',
    });
  });

  it('should create.user to have been called', async () => {
    const spy = jest.spyOn(controller, 'authUser');

    await controller.authUser(ctx, authUserRequestMocked);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(ctx, authUserRequestMocked);
  });

  it('should service to have not been called', async () => {
    const spy = jest.spyOn(authUserServiceMock, 'start');

    await controller.authUser(ctx, authUserRequestMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(authUserRequestMocked);
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.authUser(ctx, authUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Autenticando Usuario...');
  });
  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    authUserServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.authUser(ctx, authUserRequestMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
    expect(response).not.toHaveProperty('token');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    authUserServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

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
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.authUser(ctx, authUserRequestMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Autenticando Usuario...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.authSucess);
  });
});
