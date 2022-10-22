import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IGetAllUserService, IGetUserController } from '@root/domain';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { loggerMock } from '@testRoot/mocks/utils/logger-mock';
import { mock, MockProxy } from 'jest-mock-extended';
import { GetUsersResolver } from '../../get-users.resolver';

describe('Get Users Controller Unit', () => {
  let controller: IGetUserController;
  let service: MockProxy<IGetAllUserService>;
  let logger: Logger;

  beforeEach(async () => {
    service = mock();
    const getUserService = {
      provide: 'IGetAllUserService',
      useValue: service,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUsersResolver, getUserService, loggerMock],
    }).compile();

    controller = module.get(GetUsersResolver);
    logger = module.get(Logger);
    service.start.mockResolvedValue([
      { login: `soil1`, user_id: `1`, userType: 'MASTER' },
      { login: `soil2`, user_id: `2`, userType: 'MASTER' },
    ]);
  });

  it('should service and controller to be defined', async () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should create.user to have been called', async () => {
    const spy = jest.spyOn(controller, 'getUsers');

    await controller.getUsers();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.getUsers();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(logger, 'log');

    await controller.getUsers();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Busca de usuarios iniciada...');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.getUsers();
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(logger, 'log');
    const spyErr = jest.spyOn(logger, 'error');

    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    await controller.getUsers();
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Busca de usuarios iniciada...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.findError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.getUsers();
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.getUsers();
    expect(response).toHaveProperty('status', 'Sucess');
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(logger, 'log');

    await controller.getUsers();
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Busca de usuarios iniciada...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.findSucess);
  });
});
