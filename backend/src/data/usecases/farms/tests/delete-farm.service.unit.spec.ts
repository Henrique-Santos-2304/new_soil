import { UnauthorizedException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { IDeleteFarmService } from '@root/domain';
import { NotFoundError } from '@root/shared/errors';
import {
  createFarmMocked,
  deleteFarmRepoMock,
  deleteFarmRepoMockProvider,
  findFarmRepoMock,
  findFarmRepoMockProvider,
  findUserRepoMock,
  findUserRepoMockProvider,
  loggerMockProvider,
  prismaProviderMock,
  userModelMocked,
} from '@testRoot/index';
import { DeleteFarmService } from '../delete-farm.service';

describe('Delete Farm Service Unit', () => {
  let service: IDeleteFarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteFarmService,
        findFarmRepoMockProvider,
        findUserRepoMockProvider,
        deleteFarmRepoMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IDeleteFarmService>(DeleteFarmService);

    findUserRepoMock.by_id.mockResolvedValue(userModelMocked);
    findFarmRepoMock.by_id.mockResolvedValue(createFarmMocked);
    deleteFarmRepoMock.by_id.mockResolvedValue();
    deleteFarmRepoMock.by_user.mockResolvedValue();
  });

  it('shoud be service and repo to be defined', async () => {
    expect(findUserRepoMock).toBeDefined();
    expect(findFarmRepoMock).toBeDefined();
    expect(deleteFarmRepoMock).toBeDefined();

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
    const spy = jest.spyOn(findUserRepoMock, 'by_id');
    await service.start({
      user_id: 'user',
      userType: 'MASTER',
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: 'user' });
  });

  it('should throw error if findUserRepo.by_id to return an error ', async () => {
    findUserRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({
      user_id: 'soil',
      userType: 'MASTER',
    });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findUserRepo.by_id not find users ', async () => {
    findUserRepoMock.by_id.mockResolvedValueOnce(null);
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
    const spy = jest.spyOn(findFarmRepoMock, 'by_id');
    await service.start({
      farm_id: 'soil',
      userType: 'MASTER',
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: 'soil' });
  });

  it('should throw error if findFarmRepo.by_id to return an error ', async () => {
    findFarmRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({
      farm_id: 'soil',
      userType: 'MASTER',
    });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findFarmRepo.by_id not find farm ', async () => {
    findFarmRepoMock.by_id.mockResolvedValueOnce(null);
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
