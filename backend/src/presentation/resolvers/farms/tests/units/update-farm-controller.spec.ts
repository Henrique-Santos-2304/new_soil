import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUpdateFarmController, IUpdateFarmService } from '@root/domain';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { createFarmMocked, updateFarmMock } from '@testRoot/mocks';
import { loggerMock } from '@testRoot/mocks/utils/logger-mock';
import { mock, MockProxy } from 'jest-mock-extended';
import { UpdateFarmResolver } from '../../update-farm-controller.resolver';

describe('Update Farm Controller Unit', () => {
  let controller: IUpdateFarmController;
  let service: MockProxy<IUpdateFarmService>;
  let logger: Logger;

  beforeEach(async () => {
    service = mock();
    const updateFarmService = {
      provide: 'IUpdateFarmService',
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateFarmResolver, updateFarmService, loggerMock],
    }).compile();

    controller = module.get<IUpdateFarmController>(UpdateFarmResolver);
    logger = module.get<Logger>(Logger);
    service.start.mockResolvedValue({
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should update.farm to have been called', async () => {
    const spy = jest.spyOn(controller, 'putFarm');

    await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(logger, 'log');

    await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      `Iniciando atualização da fazenda ${createFarmMocked.farm_id}`,
    );
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(logger, 'log');
    const spyErr = jest.spyOn(logger, 'error');

    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith(
      `Iniciando atualização da fazenda ${createFarmMocked.farm_id}`,
    );

    expect(spyLog).toHaveBeenCalledWith(messageRequest.updateError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('farm_id', createFarmMocked.farm_id);
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(logger, 'log');

    await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith(
      `Iniciando atualização da fazenda ${createFarmMocked.farm_id}`,
    );

    expect(spyLog).toHaveBeenCalledWith(messageRequest.updateSucess);
  });
});
