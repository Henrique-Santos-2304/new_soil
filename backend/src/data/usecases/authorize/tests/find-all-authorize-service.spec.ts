import { Test, TestingModule } from '@nestjs/testing';
import { IFindAllAuthorizeService } from '@contracts/index';
import { FindAuthorizeService } from '../find_all_authorize.service';
import {
  authorizeModelMock,
  findAuthorizeRepoMock,
  findAuthorizeRepoMockProvider,
  prismaProviderMock,
} from '@testRoot/mocks';

describe('Find Authorize Service Unit', () => {
  let service: IFindAllAuthorizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAuthorizeService,
        findAuthorizeRepoMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IFindAllAuthorizeService>(FindAuthorizeService);

    findAuthorizeRepoMock.all.mockResolvedValue([authorizeModelMock]);
  });

  it('should providers to be defined', () => {
    expect(service).toBeDefined();
    expect(findAuthorizeRepoMock).toBeDefined();
  });

  it('should be service to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  // // Test FindAuthorizeRepo

  it('should be FindAuthorizeRepo.all to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findAuthorizeRepoMock, 'all');

    await service.start();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('shoul be throw a QUERY ERROR if FindAuthorizeRepo.by_farm throw error', async () => {
    findAuthorizeRepoMock.all.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start();

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('shoul be an empty list if not exists authorize in db', async () => {
    findAuthorizeRepoMock.all.mockResolvedValueOnce([]);

    const response = await service.start();

    expect(response).toHaveProperty('status', 'Sucess');
    expect(response.authorize).toHaveLength(0);
  });

  it('shoul be all authorize of db', async () => {
    const response = await service.start();

    expect(response).toHaveProperty('status', 'Sucess');
    expect(response.authorize).toHaveLength(1);
  });
});
