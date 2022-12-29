import { Test, TestingModule } from '@nestjs/testing';
import { IAddUserIntoFarmController } from '@root/domain/controllers/farms/add-user-into-farm.controller.domain';
import { messageRequest } from '@root/shared';
import {
  addUserIntoFarmServiceMock,
  addUserIntoFarmServiceMockProvider,
  createFarmMocked,
  loggerMock,
  loggerMockProvider,
  serviceAddUserIntoFarmMock,
} from '@testRoot/index';
import { AddUserIntoFarmResolver } from '../../add-user-into-farm.controller.resolver';

describe('Add User Into Farm Controller Unit', () => {
  let controller: IAddUserIntoFarmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddUserIntoFarmResolver,
        addUserIntoFarmServiceMockProvider,
        loggerMockProvider,
      ],
    }).compile();

    controller = module.get<IAddUserIntoFarmController>(
      AddUserIntoFarmResolver,
    );
    addUserIntoFarmServiceMock.start.mockResolvedValue({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
      user_id: createFarmMocked.owner_id,
    });
  });

  it('should controller to have been called', async () => {
    const spy = jest.spyOn(controller, 'addUserIntoFarm');

    await controller.addUserIntoFarm({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...serviceAddUserIntoFarmMock });
  });

  it('should be to log init request', async () => {
    const spy = jest.spyOn(loggerMock, 'log');

    await controller.addUserIntoFarm({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      `Adicionando novo usuario na fazenda fazenda ${serviceAddUserIntoFarmMock.farm_id}`,
    );
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    addUserIntoFarmServiceMock.start.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = await controller.addUserIntoFarm({
      ...serviceAddUserIntoFarmMock,
    });
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');
    const spyErr = jest.spyOn(loggerMock, 'error');

    addUserIntoFarmServiceMock.start.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    await controller.addUserIntoFarm({ ...serviceAddUserIntoFarmMock });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith(
      `Adicionando novo usuario na fazenda fazenda ${serviceAddUserIntoFarmMock.farm_id}`,
    );

    expect(spyLog).toHaveBeenCalledWith(messageRequest.updateError);

    expect(spyErr).toHaveBeenCalledTimes(1);
    expect(spyErr).toHaveBeenCalledWith('QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.addUserIntoFarm({
      ...serviceAddUserIntoFarmMock,
    });
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.addUserIntoFarm({
      ...serviceAddUserIntoFarmMock,
    });
    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty(
      'farm_id',
      serviceAddUserIntoFarmMock.farm_id,
    );
    expect(response).toHaveProperty('user_id');
  });

  it('should be logger message sucess request', async () => {
    const spyLog = jest.spyOn(loggerMock, 'log');

    await controller.addUserIntoFarm({ ...serviceAddUserIntoFarmMock });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith(
      `Adicionando novo usuario na fazenda fazenda ${serviceAddUserIntoFarmMock.farm_id}`,
    );

    expect(spyLog).toHaveBeenCalledWith(messageRequest.updateSucess);
  });
});
