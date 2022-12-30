import { TestingModule, Test } from '@nestjs/testing';
import { IGetUserByIdService } from '@root/domain';
import { NotFoundError } from '@root/shared';

import {
  findUserRepoMock,
  findUserRepoMockProvider,
  loggerMockProvider,
  prismaProviderMock,
  userModelMocked,
} from '@testRoot/index';
import { GetUserByIdService } from '../get-user-by-id.service';

describe('Get User By Id Service Unit', () => {
  let service: IGetUserByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdService,
        findUserRepoMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IGetUserByIdService>(GetUserByIdService);
    findUserRepoMock.by_id.mockResolvedValue(userModelMocked);
  });

  it('should be service and repo to be defined', async () => {
    expect(findUserRepoMock).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be findUserRepo.all to have been called with empty params', async () => {
    const spy = jest.spyOn(findUserRepoMock, 'by_id');
    await service.start({ user_id: 'test' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: 'test' });
  });

  it('should throw error if findUserRepo.all to return an error ', async () => {
    findUserRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ user_id: 'test' });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service return error User not found if user not exists ', async () => {
    findUserRepoMock.by_id.mockResolvedValueOnce(null);
    const response = service.start({ user_id: 'test' });
    await expect(response).rejects.toThrow(new NotFoundError('User'));
  });

  it('should be service to return user without password if findUserRepo.by_id encounter users ', async () => {
    const response = await service.start({ user_id: 'test' });

    expect(response).toHaveProperty('user_id');
    expect(response).toHaveProperty('userType');
    expect(response).toHaveProperty('login');
    expect(response).not.toHaveProperty('password');
  });
});
