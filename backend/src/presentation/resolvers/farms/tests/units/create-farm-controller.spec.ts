import { Test, TestingModule } from '@nestjs/testing';
import { ICreateFarmController } from '@contracts/index';
import { CreateFarmResolver } from '../../create-farm-controller.resolver';
import { messageRequest } from '@utils/index';
import {
  createFarmMocked,
  createFarmServiceMock,
  createFarmServiceMockProvider,
  loggerMock,
  loggerMockProvider,
} from '@testRoot/mocks';

describe('Create Farm Controller Unit', () => {
  let controller: ICreateFarmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFarmResolver,
        createFarmServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<ICreateFarmController>(CreateFarmResolver);
    createFarmServiceMock.start.mockResolvedValue({
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
    const spy = jest.spyOn(createFarmServiceMock, 'start');

    await controller.createFarm(createFarmMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.createFarm(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('Iniciando criação de nova fazenda');
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    createFarmServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.createFarm(createFarmMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    createFarmServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

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
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.createFarm(createFarmMocked);
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith('Iniciando criação de nova fazenda');

    expect(spyLog).toHaveBeenCalledWith(messageRequest.createdSucess);
  });
});
