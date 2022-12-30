import { TestingModule, Test } from '@nestjs/testing';
import { IGetFarmByIdService, IGetUserByIdService } from '@root/domain';
import { NotFoundError } from '@root/shared';

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
import { GetFarmByIdService } from '../find-farm-by-id.service';

describe('Get Farm By Id Service Unit', () => {
  let service: IGetFarmByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFarmByIdService,
        findFarmRepoMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IGetFarmByIdService>(GetFarmByIdService);
    findFarmRepoMock.by_id.mockResolvedValue(createFarmMocked);
  });

  it('should be service and repo to be defined', async () => {
    expect(findFarmRepoMock).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be findFarmRepo.by_id to have been called with empty params', async () => {
    const spy = jest.spyOn(findFarmRepoMock, 'by_id');
    await service.start({ farm_id: 'test' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: 'test' });
  });

  it('should throw error if findFarmRepo.by_id to return an error ', async () => {
    findFarmRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start({ farm_id: 'test' });
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('should be service return error Farm not found if farm not exists ', async () => {
    findFarmRepoMock.by_id.mockResolvedValueOnce(null);
    const response = service.start({ farm_id: 'test' });
    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be service to return all farm data', async () => {
    const response = await service.start({ farm_id: 'test' });

    expect(response).toHaveProperty('farm_id');
    expect(response).toHaveProperty('user_id');
    expect(response).toHaveProperty('farm_name');
    expect(response).toHaveProperty('farm_lat');
    expect(response).toHaveProperty('farm_lng');
    expect(response).toHaveProperty('farm_city');
    expect(response).toHaveProperty('owner_id');
    expect(response).toHaveProperty('created_by');
    expect(response).toHaveProperty('admins');
    expect(response).toHaveProperty('dealers');
    expect(response).toHaveProperty('users');
  });
});
