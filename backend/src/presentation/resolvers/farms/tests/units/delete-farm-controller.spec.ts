import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IDeleteFarmController, IDeleteFarmService } from '@contracts/index';
import { messageRequest } from '@utils/usecases/logs-request';
import { createFarmMocked } from '@testRoot/mocks';
import { loggerMock } from '@testRoot/mocks/utils/logger-mock';
import { mock, MockProxy } from 'jest-mock-extended';
import { DeleteFarmResolver } from '@resolvers/index';
import { FARM_SERVICE } from '@root/shared';

describe('Create Farm Controller Unit', () => {
  let controller: IDeleteFarmController;
  let service: MockProxy<IDeleteFarmService>;
  let logger: Logger;

  beforeEach(async () => {
    service = mock();
    const deleteFarmService = {
      provide: FARM_SERVICE.DELETE,
      useValue: service,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteFarmResolver, deleteFarmService, loggerMock],
    }).compile();

    controller = module.get<IDeleteFarmController>(DeleteFarmResolver);
    logger = module.get<Logger>(Logger);
    service.start.mockResolvedValue();
  });

  it('should delete.farm to have been called', async () => {
    const spy = jest.spyOn(controller, 'delFarm');

    await controller.delFarm({ userType: 'MASTER', user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ userType: 'MASTER', user_id: 'soil' });
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.delFarm({ userType: 'MASTER', user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ userType: 'MASTER', user_id: 'soil' });
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(logger, 'log');

    await controller.delFarm({ userType: 'MASTER', user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Iniciando a deleção de Fazenda...');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.delFarm({
      userType: 'MASTER',
      user_id: 'soil',
    });

    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(logger, 'log');
    const spyErr = jest.spyOn(logger, 'error');

    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

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
    const spyLog = jest.spyOn(logger, 'log');

    await controller.delFarm({
      userType: 'MASTER',
      user_id: 'soil',
    });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando a deleção de Fazenda...');
    expect(spyLog).toHaveBeenCalledWith(messageRequest.deleteSucess);
  });
});
