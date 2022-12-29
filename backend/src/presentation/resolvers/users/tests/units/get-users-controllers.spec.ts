import { Test, TestingModule } from '@nestjs/testing';
import { IGetUserController } from '@root/domain';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { GetUsersResolver } from '../../get-users.resolver';
import {
  getAllUserServiceMock,
  getAllUserServiceMockProvider,
  loggerMock,
  loggerMockProvider,
} from '@testRoot/index';

describe('Get Users Controller Unit', () => {
  let controller: IGetUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersResolver,
        getAllUserServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get(GetUsersResolver);
    getAllUserServiceMock.start.mockResolvedValue([
      { login: `soil1`, user_id: `1`, userType: 'MASTER' },
      { login: `soil2`, user_id: `2`, userType: 'MASTER' },
    ]);
  });

  it('should service and controller to be defined', async () => {
    expect(getAllUserServiceMock).toBeDefined();
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
    const spy = jest.spyOn(getAllUserServiceMock, 'start');

    await controller.getUsers();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.getUsers();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Busca de usuarios iniciada...');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    getAllUserServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.getUsers();
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    getAllUserServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

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
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.getUsers();
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Busca de usuarios iniciada...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.findSucess);
  });
});
