import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import { IFindAuthorizeRepo } from '@root/domain';
import { IFindAllAuthorizeService } from '@root/domain/usecases/authorize/find-all-authorize-service.domain';
import { authorizeModelMock } from '@testRoot/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { FindAuthorizeService } from '../find_all_authorize.service';

describe('Find Authorize Service Unit', () => {
  let service: IFindAllAuthorizeService;
  let findAuthorizeRepo: MockProxy<IFindAuthorizeRepo>;

  beforeEach(async () => {
    findAuthorizeRepo = mock();

    const findAuthorizeRepoProvider = {
      provide: 'IFindAuthorizeRepo',
      useValue: findAuthorizeRepo,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FindAuthorizeService, findAuthorizeRepoProvider],
    }).compile();

    service = module.get<IFindAllAuthorizeService>(FindAuthorizeService);

    findAuthorizeRepo.all.mockResolvedValue([authorizeModelMock]);
  });

  it('should providers to be defined', () => {
    expect(service).toBeDefined();
    expect(findAuthorizeRepo).toBeDefined();
  });

  it('should be service to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  // // Test FindAuthorizeRepo

  it('should be FindAuthorizeRepo.all to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findAuthorizeRepo, 'all');

    await service.start();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('shoul be throw a QUERY ERROR if FindAuthorizeRepo.by_farm throw error', async () => {
    findAuthorizeRepo.all.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start();

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('shoul be an empty list if not exists authorize in db', async () => {
    findAuthorizeRepo.all.mockResolvedValueOnce([]);

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
