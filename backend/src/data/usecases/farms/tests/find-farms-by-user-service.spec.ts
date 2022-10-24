import { Logger } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  IFindFarmsRepo,
  IFindUserRepo,
  IGetAllFarmsByUserService,
} from '@root/domain';
import { NotFoundError } from '@root/shared/errors';
import { createFarmMocked, userModelMocked } from '@testRoot/index';
import { mock, MockProxy } from 'jest-mock-extended';
import { GetFarmsByUser } from '../find-farms-by-user.service';

describe('Get All Farms By User Service Unit', () => {
  let service: IGetAllFarmsByUserService;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;
  let findUserRepo: MockProxy<IFindUserRepo>;
  let logger: MockProxy<Logger>;

  beforeEach(async () => {
    findFarmRepo = mock();
    findUserRepo = mock();
    logger = mock();

    const findUserProvider = {
      provide: 'IFindUserRepo',
      useValue: findUserRepo,
    };
    const findFarmProvider = {
      provide: 'IFindFarmsRepo',
      useValue: findFarmRepo,
    };

    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        GetFarmsByUser,
        findFarmProvider,
        findUserProvider,
        loggerProvider,
      ],
    }).compile();

    service = module.get<IGetAllFarmsByUserService>(GetFarmsByUser);

    findUserRepo.by_id.mockResolvedValue(userModelMocked);
    findFarmRepo.all.mockResolvedValue([createFarmMocked]);
    findFarmRepo.by_user.mockResolvedValue([createFarmMocked]);
  });

  it('shoud be service and repo to be defined', async () => {
    expect(findUserRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be findUserRepo.by_id to have been called with empty params', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_id');
    await service.start({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: userModelMocked.user_id });
  });

  it('should throw error if findUserRepo.by_id to return an error ', async () => {
    findUserRepo.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findUserRepo.by_id not find users ', async () => {
    findUserRepo.by_id.mockResolvedValueOnce(null);
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new NotFoundError('User'));
  });

  it('should be findFarmRepo.all to have been called if user is MASTER', async () => {
    const spy = jest.spyOn(findUserRepo, 'all');
    await service.start({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should be findFarmRepo.all to have been called if user is DEALER', async () => {
    findUserRepo.by_id.mockResolvedValueOnce({
      ...userModelMocked,
      userType: 'DEALER',
    });
    const spy = jest.spyOn(findUserRepo, 'all');
    await service.start({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should throw error if findFarmRepo.all to return an error ', async () => {
    findFarmRepo.all.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findFarmRepo.all not find users ', async () => {
    findFarmRepo.all.mockResolvedValueOnce([]);
    const response = await service.start({ user_id: userModelMocked.user_id });
    expect(response).toHaveLength(0);
  });

  it('should be findFarmRepo.by_d to have been called if user is ADMIN ', async () => {
    findUserRepo.by_id.mockRejectedValueOnce({
      ...userModelMocked,
      userType: 'ADMIN',
    });
    const spy = jest.spyOn(findFarmRepo, 'by_user');
    await service.start({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should be findFarmRepo.by_d to have been called if user is USER ', async () => {
    findUserRepo.by_id.mockRejectedValueOnce({
      ...userModelMocked,
      userType: 'USER',
    });
    const spy = jest.spyOn(findFarmRepo, 'by_user');
    await service.start({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should throw error if findFarmRepo.by_user to return an error ', async () => {
    findFarmRepo.by_user.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findUserRepo.all not find users ', async () => {
    findFarmRepo.by_user.mockResolvedValueOnce([]);
    const response = await service.start({ user_id: userModelMocked.user_id });
    expect(response).toHaveLength(0);
  });

  it('should be service return famrs of user ', async () => {
    const response = await service.start({ user_id: userModelMocked.user_id });
    expect(response).toHaveLength(1);
  });
});
