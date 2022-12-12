import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IAddUserIntoFarmService } from '@root/domain';
import { IAddUserIntoFarmController } from '@root/domain/controllers/farms/add-user-into-farm.controller.domain';
import { messageRequest } from '@root/shared';
import { createFarmMocked, serviceAddUserIntoFarmMock } from '@testRoot/index';
import { loggerMock } from '@testRoot/mocks/utils/logger-mock';
import { mock, MockProxy } from 'jest-mock-extended';
import { AddUserIntoFarmResolver } from '../../add-user-into-farm.controller.resolver';

describe('Add User Into Farm Controller Unit', () => {
  let controller: IAddUserIntoFarmController;
  let service: MockProxy<IAddUserIntoFarmService>;
  let logger: Logger;

  beforeEach(async () => {
    service = mock();
    const updateFarmService = {
      provide: 'IAddUserIntoFarmService',
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddUserIntoFarmResolver, updateFarmService, loggerMock],
    }).compile();

    controller = module.get<IAddUserIntoFarmController>(
      AddUserIntoFarmResolver,
    );
    logger = module.get<Logger>(Logger);
    service.start.mockResolvedValue({
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
    const spy = jest.spyOn(logger, 'log');

    await controller.addUserIntoFarm({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      `Adicionando novo usuario na fazenda fazenda ${serviceAddUserIntoFarmMock.farm_id}`,
    );
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.addUserIntoFarm({
      ...serviceAddUserIntoFarmMock,
    });
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should be logger the error received', async () => {
    const spyLog = jest.spyOn(logger, 'log');
    const spyErr = jest.spyOn(logger, 'error');

    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

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
    const spyLog = jest.spyOn(logger, 'log');

    await controller.addUserIntoFarm({ ...serviceAddUserIntoFarmMock });
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith(
      `Adicionando novo usuario na fazenda fazenda ${serviceAddUserIntoFarmMock.farm_id}`,
    );

    expect(spyLog).toHaveBeenCalledWith(messageRequest.updateSucess);
  });
});
