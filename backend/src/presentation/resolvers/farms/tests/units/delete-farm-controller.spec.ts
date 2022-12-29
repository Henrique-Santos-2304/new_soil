import { Test, TestingModule } from '@nestjs/testing';
import { IDeleteFarmController } from '@contracts/index';
import { DeleteFarmResolver } from '@resolvers/index';
import { messageRequest } from '@utils/usecases/logs-request';
import {
  deleteFarmServiceMock,
  deleteFarmServiceMockProvider,
  loggerMock,
  loggerMockProvider,
} from '@testRoot/mocks';

describe('Create Farm Controller Unit', () => {
  let controller: IDeleteFarmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteFarmResolver,
        deleteFarmServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<IDeleteFarmController>(DeleteFarmResolver);
    deleteFarmServiceMock.start.mockResolvedValue();
  });

  it('should delete.farm to have been called', async () => {
    const spy = jest.spyOn(controller, 'delFarm');

    await controller.delFarm({ userType: 'MASTER', user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ userType: 'MASTER', user_id: 'soil' });
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(deleteFarmServiceMock, 'start');

    await controller.delFarm({ userType: 'MASTER', user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ userType: 'MASTER', user_id: 'soil' });
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.delFarm({ userType: 'MASTER', user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Iniciando a deleção de Fazenda...');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    deleteFarmServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.delFarm({
      userType: 'MASTER',
      user_id: 'soil',
    });

    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    deleteFarmServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    await controller.delFarm({
      userType: 'MASTER',
      user_id: 'soil',
    });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando a deleção de Fazenda...');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.deleteError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.delFarm({
      userType: 'MASTER',
      user_id: 'soil',
    });
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.delFarm({
      userType: 'MASTER',
      user_id: 'soil',
    });
    expect(response).toHaveProperty('status', 'Sucess');
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.delFarm({
      userType: 'MASTER',
      user_id: 'soil',
    });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando a deleção de Fazenda...');
    expect(spyLog).toHaveBeenCalledWith(messageRequest.deleteSucess);
  });
});
