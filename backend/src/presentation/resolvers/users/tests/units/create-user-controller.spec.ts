import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserController } from '@root/domain';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { CreateUserResolver } from '../../create-user.resolver';
import {
  createUserRequestMocked,
  createUserServiceMock,
  createUserServiceMockProvider,
  loggerMock,
  loggerMockProvider,
} from '@testRoot/mocks';

describe('Create User Controller Unit', () => {
  let controller: ICreateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserResolver,
        createUserServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<ICreateUserController>(CreateUserResolver);
    createUserServiceMock.start.mockResolvedValue({ status: 'Sucess' });
  });

  it('should create.user to have been called', async () => {
    const spy = jest.spyOn(controller, 'createUser');

    await controller.createUser(createUserRequestMocked);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserRequestMocked);
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(createUserServiceMock, 'start');

    await controller.createUser(createUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserRequestMocked);
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.createUser(createUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Iniciando criação de novo usuario');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    createUserServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.createUser(createUserRequestMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    createUserServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

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
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.createUser(createUserRequestMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando criação de novo usuario');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.createdSucess);
  });
});
