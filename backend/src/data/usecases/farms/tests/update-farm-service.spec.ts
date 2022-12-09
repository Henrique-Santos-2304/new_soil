import { Logger, UnauthorizedException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  IFindFarmsRepo,
  IUpdateFarmRepo,
  IUpdateFarmService,
} from '@root/domain';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared';
import { AmbiguousData } from '@utils/index';
import {
  createFarmMocked,
  serviceUpdateFarmMock,
  updateFarmMock,
} from '@testRoot/index';
import { mock, MockProxy } from 'jest-mock-extended';
import { UpdateFarmService } from '../update-farm.service';

describe('Update Farm Service Unit', () => {
  let service: IUpdateFarmService;
  let updateFarmRepo: MockProxy<IUpdateFarmRepo>;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;

  let logger: MockProxy<Logger>;

  beforeEach(async () => {
    updateFarmRepo = mock();
    findFarmRepo = mock();
    logger = mock();
    const findFarmProvider = {
      provide: 'IFindFarmsRepo',
      useValue: findFarmRepo,
    };

    const updateProvider = {
      provide: 'IUpdateFarmRepo',
      useValue: updateFarmRepo,
    };

    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        UpdateFarmService,
        findFarmProvider,
        updateProvider,
        loggerProvider,
      ],
    }).compile();

    service = module.get<IUpdateFarmService>(UpdateFarmService);

    findFarmRepo.by_id.mockResolvedValue({
      ...createFarmMocked,
      owner_id: serviceUpdateFarmMock.user.user_id,
    });
    updateFarmRepo.put.mockResolvedValue({
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should be providers is defined', () => {
    expect(service).toBeDefined();
    expect(updateFarmRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('should be service to have been called with data valids', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
        owner_id: serviceUpdateFarmMock.user.user_id,
      })
      .mockResolvedValueOnce(null);
    const spy = jest.spyOn(service, 'start');

    await service.start({ ...serviceUpdateFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...serviceUpdateFarmMock });
  });

  // Test FindFarmRepo

  it('should be findFarm.by_id to have been called once time and with data valids', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
        owner_id: serviceUpdateFarmMock.user.user_id,
      })
      .mockResolvedValueOnce(null);

    const spy = jest.spyOn(findFarmRepo, 'by_id');

    await service.start({ ...serviceUpdateFarmMock });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceUpdateFarmMock.farm_id,
    });

    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceUpdateFarmMock.newFarm.farm_id,
    });
  });

  it('should be throw "Farm not found" if not exists farm with farm_id received', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce(null);

    const response = service.start({ ...serviceUpdateFarmMock });

    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findFarmRepo.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceUpdateFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Test authorize for update data

  it('should be throw Unauthorized if user_id not is OWNER or MASTER or DEALER and equal ADMIN', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...createFarmMocked,
      dealers: [],
      admins: [serviceUpdateFarmMock.user.user_id],
      owner_id: 'not_this',
    });
    const response = service.start({
      ...serviceUpdateFarmMock,
      user: { ...serviceUpdateFarmMock.user, userType: 'ADMIN' },
    });

    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  it('should be throw Unauthorized if user_id not is OWNER or MASTER or DEALER and equal USER', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...createFarmMocked,
      dealers: [],
      users: [serviceUpdateFarmMock.user.user_id],
      owner_id: 'not_this',
    });
    const response = service.start({
      ...serviceUpdateFarmMock,
      user: { ...serviceUpdateFarmMock.user, userType: 'USER' },
    });

    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  it('should be throw "AMBIGUOUS DATA" if all data is equal a farm of db', async () => {
    findFarmRepo.by_id.mockResolvedValue({
      ...createFarmMocked,
      owner_id: serviceUpdateFarmMock.user.user_id,
      farm_name: updateFarmMock.farm_name,
    });

    const response = service.start({
      ...serviceUpdateFarmMock,
      newFarm: {
        farm_id: createFarmMocked.farm_id,
        farm_name: updateFarmMock.farm_name,
        farm_city: createFarmMocked.farm_city,
        farm_lat: createFarmMocked.farm_lat,
        farm_lng: createFarmMocked.farm_lng,
      },
    });

    await expect(response).rejects.toThrow(new AmbiguousData('Farm'));
  });

  it('should be throw farm already exists if new farm_id updated exist in db', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
        owner_id: serviceUpdateFarmMock.user.user_id,
      })
      .mockResolvedValueOnce(createFarmMocked);

    const response = service.start({
      ...serviceUpdateFarmMock,
      newFarm: {
        ...updateFarmMock,
        farm_id: 'new_farm_exist',
      },
    });

    await expect(response).rejects.toThrow(new AlreadyExistsError('Farm'));
  });

  // Update Farm Repo

  it('should be updateFarmRepo to have been called once time and with data valids', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
        owner_id: '',
        dealers: [serviceUpdateFarmMock.user.user_id],
      })
      .mockResolvedValueOnce(null);

    const spy = jest.spyOn(updateFarmRepo, 'put');

    await service.start({
      ...serviceUpdateFarmMock,
      user: { ...serviceUpdateFarmMock.user, userType: 'DEALER' },
      newFarm: {
        ...updateFarmMock,
        farm_id: 'new_farm_id',
      },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceUpdateFarmMock.farm_id,
      farm: {
        farm_id: 'new_farm_id',
        farm_name: updateFarmMock.farm_name,
        farm_city: updateFarmMock.farm_city,
        updated_by: serviceUpdateFarmMock.user.user_id,
      },
    });
  });

  it('should be updateFarmRepo to have been called without farm_id, farm_name and farm_city', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
        owner_id: '',
        dealers: [serviceUpdateFarmMock.user.user_id],
      })
      .mockResolvedValueOnce(null);

    const spy = jest.spyOn(updateFarmRepo, 'put');

    await service.start({
      ...serviceUpdateFarmMock,
      user: { ...serviceUpdateFarmMock.user, userType: 'DEALER' },
      newFarm: {
        farm_id: createFarmMocked.farm_id,
        farm_name: createFarmMocked.farm_name,
        farm_city: createFarmMocked.farm_city,
        farm_lat: 22.987665,
        farm_lng: -73.985,
      },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceUpdateFarmMock.farm_id,
      farm: {
        farm_lat: 22.987665,
        farm_lng: -73.985,
        updated_by: serviceUpdateFarmMock.user.user_id,
      },
    });
  });

  it('should be throw "Farm Not Create" if not exists farm with farm_id received', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
        owner_id: serviceUpdateFarmMock.user.user_id,
      })
      .mockResolvedValueOnce(null);
    updateFarmRepo.put.mockResolvedValueOnce(null);

    const response = service.start({
      ...serviceUpdateFarmMock,
      newFarm: {
        ...updateFarmMock,
        farm_id: 'new_farm_id',
      },
    });

    await expect(response).rejects.toThrow(new NotCreatedError('Farm'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
        owner_id: serviceUpdateFarmMock.user.user_id,
      })
      .mockResolvedValueOnce(null);
    updateFarmRepo.put.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({
      ...serviceUpdateFarmMock,
      newFarm: {
        ...updateFarmMock,
        farm_id: 'new_farm_id',
      },
    });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should be return farm_id if farm is updated with sucessfuly', async () => {
    findFarmRepo.by_id
      .mockResolvedValueOnce({
        ...createFarmMocked,
      })
      .mockResolvedValueOnce(null);

    updateFarmRepo.put.mockResolvedValue({
      farm_id: 'new_farm_id',
    });

    const response = await service.start({
      ...serviceUpdateFarmMock,
      newFarm: {
        ...updateFarmMock,
        farm_id: 'new_farm_id',
      },
    });

    expect(response).toHaveProperty('farm_id', 'new_farm_id');
  });
});
