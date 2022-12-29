import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateFarmController, ICreateFarmService } from '@root/domain';
import { FARM_SERVICE } from '@root/shared';
import { messageRequest } from '@root/shared/usecases/logs-request';
import { createFarmMocked } from '@testRoot/mocks';
import { loggerMock } from '@testRoot/mocks/utils/logger-mock';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateFarmResolver } from '../../create-farm-controller.resolver';

describe('Create Farm Controller Unit', () => {
  let controller: ICreateFarmController;
  let service: MockProxy<ICreateFarmService>;
  let logger: Logger;

  beforeEach(async () => {
    service = mock();
    const createFarmService = {
      provide: FARM_SERVICE.CREATE,
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateFarmResolver, createFarmService, loggerMock],
    }).compile();

    controller = module.get<ICreateFarmController>(CreateFarmResolver);
    logger = module.get<Logger>(Logger);
    service.start.mockResolvedValue({
      status: 'Sucess',
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should create.farm to have been called', async () => {
    const spy = jest.spyOn(controller, 'createFarm');

    await controller.createFarm(createFarmMocked);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.createFarm(createFarmMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(logger, 'log');

    await controller.createFarm(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Iniciando criação de nova fazenda');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.createFarm(createFarmMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(logger, 'log');
    const spyErr = jest.spyOn(logger, 'error');

    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    await controller.createFarm(createFarmMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando criação de nova fazenda');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.createdError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.createFarm(createFarmMocked);
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.createFarm(createFarmMocked);
    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('farm_id', createFarmMocked.farm_id);
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(logger, 'log');

    await controller.createFarm(createFarmMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando criação de nova fazenda');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.createdSucess);
  });
});
