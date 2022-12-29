import { Test, TestingModule } from '@nestjs/testing';
import { IGetFarmsController } from '@contracts/index';
import { GetFarmsResolver } from '@resolvers/index';
import { messageRequest } from '@utils/usecases/logs-request';
import {
  createFarmMocked,
  findFarmByUserServiceMock,
  findFarmByUserServiceMockProvider,
  loggerMock,
  loggerMockProvider,
} from '@testRoot/mocks';

describe('Create Farm Controller Unit', () => {
  let controller: IGetFarmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFarmsResolver,
        findFarmByUserServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<IGetFarmsController>(GetFarmsResolver);
    findFarmByUserServiceMock.start.mockResolvedValue([createFarmMocked]);
  });

  it('should find.farm to have been called', async () => {
    const spy = jest.spyOn(controller, 'getFarmByUser');

    await controller.getFarmByUser({ user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: 'soil' });
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(findFarmByUserServiceMock, 'start');

    await controller.getFarmByUser({ user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: 'soil' });
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.getFarmByUser({ user_id: 'soil' });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      'Iniciando busca de Fazendas do usuario...',
    );
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    findFarmByUserServiceMock.start.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = await controller.getFarmByUser({ user_id: 'soil' });

    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    findFarmByUserServiceMock.start.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    await controller.getFarmByUser({ user_id: 'soil' });

    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith(
      'Iniciando busca de Fazendas do usuario...',
    );

    expect(spyLog).toHaveBeenCalledWith(messageRequest.findError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.getFarmByUser({ user_id: 'soil' });
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.getFarmByUser({ user_id: 'soil' });
    expect(response).toHaveProperty('status', 'Sucess');
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.getFarmByUser({ user_id: 'soil' });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith(
      'Iniciando busca de Fazendas do usuario...',
    );
    expect(spyLog).toHaveBeenCalledWith(messageRequest.findSucess);
  });
});
