import { Logger } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import { IFindUserRepo, IGetAllUserService } from '@root/domain';
import { mock, MockProxy } from 'jest-mock-extended';
import { GetAllUserService } from '../get-user.service';

describe('UserService', () => {
  let service: IGetAllUserService;
  let findUserRepo: MockProxy<IFindUserRepo>;
  let logger: MockProxy<Logger>;

  beforeEach(async () => {
    findUserRepo = mock();
    logger = mock();

    const findProvider = { provide: 'IFindUserRepo', useValue: findUserRepo };
    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetAllUserService, findProvider, loggerProvider],
    }).compile();

    service = module.get<IGetAllUserService>(GetAllUserService);
  });

  it('shoud be service and repo to be defined', async () => {
    expect(findUserRepo).toBeDefined();
    expect(service).toBeDefined();
  });

  it('shoud be findUserRepo.all to have been called with empty params', async () => {
    const spy = jest.spyOn(findUserRepo, 'all');
    await service.start();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('shoud throw error if findUserRepo.all to return an error ', async () => {
    findUserRepo.all.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start();
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  it('shoud be service return array empty if findUserRepo.all not find users ', async () => {
    findUserRepo.all.mockResolvedValueOnce([]);
    const response = await service.start();
    await expect(response).toHaveLength(0);
  });

  it('shoud be service to return array of users if findUserRepo.all encounter users ', async () => {
    findUserRepo.all.mockResolvedValueOnce([
      { login: `soil1`, user_id: `1`, userType: 'MASTER' },
      { login: `soil2`, user_id: `2`, userType: 'MASTER' },
    ]);
    const response = await service.start();
    console.log(response);

    expect(response).toHaveLength(2);

    expect(response[0]).toHaveProperty('user_id');
    expect(response[0]).toHaveProperty('userType');
    expect(response[0]).toHaveProperty('login');
    expect(response[0]).not.toHaveProperty('password');
  });
});
