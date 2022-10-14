import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IAuthUserController, IAuthUserService } from '@root/domain';
import { authUserRequestMocked } from '@testRoot/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthUserResolver } from '../../auth-user-controller.resolver';

describe('Auth User Controller', () => {
  let controller: IAuthUserController;
  let service: MockProxy<IAuthUserService>;
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
      provide: 'IAuthUserService',
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthUserResolver, createUserService],
    }).compile();

    controller = module.get<IAuthUserController>(AuthUserResolver);

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

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.authUser(ctx, authUserRequestMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
    expect(response).not.toHaveProperty('token');
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
});
