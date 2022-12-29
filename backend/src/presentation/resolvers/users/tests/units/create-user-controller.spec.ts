import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserController, ICreateUserService } from '@root/domain';
import { USER_SERVICE } from '@root/shared';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { createUserRequestMocked } from '@testRoot/mocks';
import { loggerMock } from '@testRoot/mocks/utils/logger-mock';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateUserResolver } from '../../create-user.resolver';

describe('Create User Controller Unit', () => {
  let controller: ICreateUserController;
  let service: MockProxy<ICreateUserService>;
  let logger: Logger;

  beforeEach(async () => {
    service = mock();
    const createUserService = {
      provide: USER_SERVICE.CREATE,
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserResolver, createUserService, loggerMock],
    }).compile();

    controller = module.get<ICreateUserController>(CreateUserResolver);
    logger = module.get<Logger>(Logger);
    service.start.mockResolvedValue({ status: 'Sucess' });
  });

  it('should create.user to have been called', async () => {
    const spy = jest.spyOn(controller, 'createUser');

    await controller.createUser(createUserRequestMocked);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserRequestMocked);
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.createUser(createUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserRequestMocked);
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(logger, 'log');

    await controller.createUser(createUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Iniciando criação de novo usuario');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.createUser(createUserRequestMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(logger, 'log');
    const spyErr = jest.spyOn(logger, 'error');

    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    await controller.createUser(createUserRequestMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando criação de novo usuario');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.createdError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.createUser(createUserRequestMocked);
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.createUser(createUserRequestMocked);
    expect(response).toHaveProperty('status', 'Sucess');
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(logger, 'log');

    await controller.createUser(createUserRequestMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando criação de novo usuario');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.createdSucess);
  });
});
