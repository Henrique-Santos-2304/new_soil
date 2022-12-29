import { Logger, UnauthorizedException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  IDeleteFarmRepo,
  IDeleteFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
} from '@root/domain';
import { USER_REPO } from '@root/shared';
import { NotFoundError } from '@root/shared/errors';
import { createFarmMocked, userModelMocked } from '@testRoot/index';
import { mock, MockProxy } from 'jest-mock-extended';
import { DeleteFarmService } from '../delete-farm.service';

describe('Get All Farms By User Service Unit', () => {
  let service: IDeleteFarmService;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;
  let findUserRepo: MockProxy<IFindUserRepo>;
  let deleteFarmRepo: MockProxy<IDeleteFarmRepo>;

  let logger: MockProxy<Logger>;

  beforeEach(async () => {
    findFarmRepo = mock();
    findUserRepo = mock();
    deleteFarmRepo = mock();
    logger = mock();

    const findUserProvider = {
      provide: USER_REPO.FIND,
      useValue: findUserRepo,
    };
    const findFarmProvider = {
      provide: 'IFindFarmsRepo',
      useValue: findFarmRepo,
    };

    const delFarmProvider = {
      provide: 'IDeleteFarmRepo',
      useValue: deleteFarmRepo,
    };

    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        DeleteFarmService,
        findFarmProvider,
        findUserProvider,
        delFarmProvider,
        loggerProvider,
      ],
    }).compile();

    service = module.get<IDeleteFarmService>(DeleteFarmService);

    findUserRepo.by_id.mockResolvedValue(userModelMocked);
    findFarmRepo.by_id.mockResolvedValue(createFarmMocked);
    deleteFarmRepo.by_id.mockResolvedValue();
    deleteFarmRepo.by_user.mockResolvedValue();
  });

  it('shoud be service and repo to be defined', async () => {
    expect(findUserRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
    expect(deleteFarmRepo).toBeDefined();

    expect(service).toBeDefined();
  });

  it('should be service throw unauthorized with userType USER ', async () => {
    const response = service.start({
      userType: 'USER',
      user_id: 'user',
    });
    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  it('should be service throw unauthorized with userType ADMIN ', async () => {
    const response = service.start({
      user_id: 'user',
      userType: 'ADMIN',
    });
    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  it('should be service throw unauthorized with userType ADMIN ', async () => {
    const response = service.start({
      userType: 'MASTER',
    });
    await expect(response).rejects.toThrow(
      new Error('user_id and farm_id not available, please set one form query'),
    );
  });

  // Test del by user
  it('should be findUserRepo.by_id to have been called with data valid', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_id');
    await service.start({
      user_id: 'user',
      userType: 'MASTER',
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: 'user' });
  });

  it('should throw error if findUserRepo.by_id to return an error ', async () => {
    findUserRepo.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({
      user_id: 'soil',
      userType: 'MASTER',
    });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findUserRepo.by_id not find users ', async () => {
    findUserRepo.by_id.mockResolvedValueOnce(null);
    const response = service.start({
      user_id: 'soil',
      userType: 'MASTER',
    });
    await expect(response).rejects.toThrow(new NotFoundError('User'));
  });

  it('should be service return void if deleted with sucess ', async () => {
    const response = await service.start({
      user_id: 'soil',
      userType: 'MASTER',
    });
    expect(response).toBeUndefined();
  });

  // Test del by id
  it('should be findFarm.by_id to have been called with data valid', async () => {
    const spy = jest.spyOn(findFarmRepo, 'by_id');
    await service.start({
      farm_id: 'soil',
      userType: 'MASTER',
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: 'soil' });
  });

  it('should throw error if findFarmRepo.by_id to return an error ', async () => {
    findFarmRepo.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({
      farm_id: 'soil',
      userType: 'MASTER',
    });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findFarmRepo.by_id not find farm ', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce(null);
    const response = service.start({
      farm_id: 'soil',
      userType: 'MASTER',
    });
    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be service return void if deleted with sucess ', async () => {
    const response = await service.start({
      farm_id: 'soil',
      userType: 'MASTER',
    });
    expect(response).toBeUndefined();
  });
});
