import { Test, TestingModule } from '@nestjs/testing';
import { IUpdateFarmController } from '@root/domain';
import { messageRequest } from '@root/shared/usecases/logs-request';
import {
  createFarmMocked,
  loggerMock,
  loggerMockProvider,
  updateFarmMock,
  updateFarmServiceMock,
  updateFarmServiceMockProvider,
} from '@testRoot/mocks';
import { UpdateFarmResolver } from '../../update-farm-controller.resolver';

describe('Update Farm Controller Unit', () => {
  let controller: IUpdateFarmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateFarmResolver,
        updateFarmServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<IUpdateFarmController>(UpdateFarmResolver);
    updateFarmServiceMock.start.mockResolvedValue({
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
    const spy = jest.spyOn(updateFarmServiceMock, 'start');

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
    const spy = jest.spyOn(loggerMock, 'log');

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
    updateFarmServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.putFarm({
      user: { userType: 'MASTER', user_id: 'soil' },
      farm_id: createFarmMocked.farm_id,
      newFarm: { ...updateFarmMock },
    });
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    updateFarmServiceMock.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

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
    const spyLog = jest.spyOn(loggerMock, 'log');

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
