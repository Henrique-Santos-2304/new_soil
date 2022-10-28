import { Logger, UnauthorizedException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  IFindFarmsRepo,
  IUpdateFarmRepo,
  IUpdateFarmService,
} from '@root/domain';
import { NotFoundError } from '@root/shared';
import { AmbiguousData } from '@root/shared/errors/ambiguous-data';
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
  // let findUserRepo: MockProxy<IFindUserRepo>;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;

  let logger: MockProxy<Logger>;

  beforeEach(async () => {
    updateFarmRepo = mock();
    // findUserRepo = mock();
    findFarmRepo = mock();
    logger = mock();

    // const findUserProvider = {
    //   provide: 'IFindUserRepo',
    //   useValue: findUserRepo,
    // };

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

    // findUserRepo.by_id.mockResolvedValue(userModelMocked);
    findFarmRepo.by_id.mockResolvedValue({
      ...updateFarmMock,
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
    const spy = jest.spyOn(service, 'start');

    await service.start({ ...serviceUpdateFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...serviceUpdateFarmMock });
  });

  // Test FindFarmRepo

  it('should be findFarm.by_id to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findFarmRepo, 'by_id');

    await service.start({ ...serviceUpdateFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: createFarmMocked.farm_id });
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
      ...updateFarmMock,
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
      ...updateFarmMock,
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
    const response = service.start({
      ...serviceUpdateFarmMock,
      newFarm: {
        ...updateFarmMock,
        owner_id: serviceUpdateFarmMock.user.user_id,
      },
    });

    await expect(response).rejects.toThrow(new AmbiguousData('Farm'));
  });

  it('should be return farm_id if farm is updated with sucessfuly', async () => {
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
