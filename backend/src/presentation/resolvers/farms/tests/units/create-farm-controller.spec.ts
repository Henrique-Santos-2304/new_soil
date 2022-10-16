import { Test, TestingModule } from '@nestjs/testing';
import { ICreateFarmController, ICreateFarmService } from '@root/domain';
import { createFarmMocked } from '@testRoot/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateFarmResolver } from '../../create-farm-controller.resolver';

describe('Create Farm Controller Unit', () => {
  let controller: ICreateFarmController;
  let service: MockProxy<ICreateFarmService>;

  beforeEach(async () => {
    service = mock();
    const createFarmService = {
      provide: 'ICreateFarmService',
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateFarmResolver, createFarmService],
    }).compile();

    controller = module.get<ICreateFarmController>(CreateFarmResolver);

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

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.createFarm(createFarmMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
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
});
