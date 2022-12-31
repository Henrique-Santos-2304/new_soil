import { TestingModule, Test } from '@nestjs/testing';
import { IGetAllFarmsByUserService } from '@root/domain';
import { NotFoundError } from '@root/shared/errors';
import { GetFarmsByUser } from '../find-farms-by-user.service';

import {
  createFarmMocked,
  findFarmRepoMock,
  findFarmRepoMockProvider,
  findUserRepoMock,
  findUserRepoMockProvider,
  loggerMockProvider,
  prismaProviderMock,
  userModelMocked,
} from '@testRoot/index';

describe('Get All Farms By User Service Unit', () => {
  let service: IGetAllFarmsByUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFarmsByUser,
        findFarmRepoMockProvider,
        findUserRepoMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IGetAllFarmsByUserService>(GetFarmsByUser);

    findUserRepoMock.by_id.mockResolvedValue(userModelMocked);
    findFarmRepoMock.all.mockResolvedValue([createFarmMocked]);
    findFarmRepoMock.by_role.mockResolvedValue([createFarmMocked]);
  });

  it('shoud be service and repo to be defined', async () => {
    expect(findUserRepoMock).toBeDefined();
    expect(findFarmRepoMock).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be findUserRepo.by_id to have been called with data valid', async () => {
    const spy = jest.spyOn(findUserRepoMock, 'by_id');
    await service.start({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: userModelMocked.user_id });
  });

  it('should throw error if findUserRepo.by_id to return an error ', async () => {
    findUserRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findUserRepo.by_id not find users ', async () => {
    findUserRepoMock.by_id.mockResolvedValueOnce(null);
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new NotFoundError('User'));
  });

  it('should be findFarmRepo.all to have been called if user is MASTER', async () => {
    const spy = jest.spyOn(findFarmRepoMock, 'all');
    await service.start({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should throw error if findFarmRepo.all to return an error ', async () => {
    findFarmRepoMock.all.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findFarmRepo.all not find farms ', async () => {
    findFarmRepoMock.all.mockResolvedValueOnce(null);
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be findFarmRepo.by_role to have been called if user is DEALER', async () => {
    const user_id = userModelMocked.user_id;
    findUserRepoMock.by_id.mockResolvedValueOnce({
      ...userModelMocked,
      userType: 'DEALER',
    });
    const spy = jest.spyOn(findFarmRepoMock, 'by_role');
    await service.start({ user_id: userModelMocked.user_id });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id });
  });

  it('should be findFarmRepo.by_role to have been called if user is ADMIN', async () => {
    const user_id = userModelMocked.user_id;
    findUserRepoMock.by_id.mockResolvedValueOnce({
      ...userModelMocked,
      userType: 'ADMIN',
    });
    const spy = jest.spyOn(findFarmRepoMock, 'by_role');
    await service.start({ user_id: userModelMocked.user_id });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id });
  });

  it('should be findFarmRepo.by_role to have been called if user is USER', async () => {
    const user_id = userModelMocked.user_id;
    findUserRepoMock.by_id.mockResolvedValueOnce({
      ...userModelMocked,
      userType: 'USER',
    });
    const spy = jest.spyOn(findFarmRepoMock, 'by_role');
    await service.start({ user_id: userModelMocked.user_id });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id });
  });

  it('should throw error if findFarmRepo.by_role to return an error ', async () => {
    findUserRepoMock.by_id.mockResolvedValueOnce({
      ...userModelMocked,
      userType: 'USER',
    });
    findFarmRepoMock.by_role.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service throw user not find if findFarmRepo.by_id not find farms ', async () => {
    findUserRepoMock.by_id.mockResolvedValueOnce({
      ...userModelMocked,
      userType: 'USER',
    });
    findFarmRepoMock.by_role.mockResolvedValueOnce(null);
    const response = service.start({ user_id: userModelMocked.user_id });
    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be service return all farms  ', async () => {
    const response = await service.start({ user_id: userModelMocked.user_id });
    expect(response).toHaveLength(1);
  });

  it('should be service return all farms  ', async () => {
    findUserRepoMock.by_id.mockResolvedValueOnce({
      ...userModelMocked,
      userType: 'USER',
    });
    const response = await service.start({ user_id: userModelMocked.user_id });
    expect(response).toHaveLength(1);
  });
});
