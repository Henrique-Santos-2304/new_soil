import { Logger, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  ICreateFarmRepo,
  ICreateFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
} from '@root/domain';
import { USER_REPO } from '@root/shared';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared/errors';
import { createFarmMocked, userModelMocked } from '@testRoot/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateFarmService } from '../create-farm.service';

describe('Create Farm Service Unit', () => {
  let service: ICreateFarmService;
  let createFarmRepo: MockProxy<ICreateFarmRepo>;
  let findUserRepo: MockProxy<IFindUserRepo>;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;

  let logger: MockProxy<Logger>;

  beforeEach(async () => {
    createFarmRepo = mock();
    findUserRepo = mock();
    findFarmRepo = mock();
    logger = mock();

    const findUserProvider = {
      provide: USER_REPO.FIND,
      useValue: findUserRepo,
    };

    const findFarmProvider = {
      provide: 'IFindFarmsRepo',
      useValue: findFarmRepo,
    };

    const createProvider = {
      provide: 'ICreateFarmRepo',
      useValue: createFarmRepo,
    };

    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        CreateFarmService,
        findFarmProvider,
        findUserProvider,
        createProvider,
        loggerProvider,
      ],
    }).compile();

    service = module.get<ICreateFarmService>(CreateFarmService);

    findUserRepo.by_id.mockResolvedValue(userModelMocked);
    findFarmRepo.by_id.mockResolvedValue(null);
    createFarmRepo.create.mockResolvedValue({
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should providers to be defined', () => {
    expect(service).toBeDefined();
    expect(createFarmRepo).toBeDefined();

    expect(findUserRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('shoul be service to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  // Test FindFarmRepo

  it('shoul be findFarm.by_id to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findFarmRepo, 'by_id');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: createFarmMocked.farm_id });
  });

  it('shoul be throw a FarmAlreadExist if findFarmrepo return a farm', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce(createFarmMocked);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(new AlreadyExistsError('Farm'));
  });

  it('shoul be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findFarmRepo.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Test findUserRepo
  it('shoul be findUser.by_id to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_id');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({ user_id: createFarmMocked.owner_id });
    expect(spy).toHaveBeenCalledWith({ user_id: createFarmMocked.created_by });
  });

  it('shoul be findUser.by_id to have been called five times if received admins, dealers and user', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_id');

    await service.start({
      ...createFarmMocked,
      admins: ['admin'],
      dealers: ['dealer'],
      users: ['users'],
    });

    expect(spy).toHaveBeenCalledTimes(5);
    expect(spy).toHaveBeenCalledWith({ user_id: createFarmMocked.owner_id });
    expect(spy).toHaveBeenCalledWith({ user_id: 'admin' });
    expect(spy).toHaveBeenCalledWith({ user_id: 'dealer' });
    expect(spy).toHaveBeenCalledWith({ user_id: 'users' });
    expect(spy).toHaveBeenCalledWith({ user_id: createFarmMocked.created_by });
  });

  it('shoul be throw a QUERY ERROR if findUserrepo throw error', async () => {
    findUserRepo.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Check users exists in db
  it('shoul be throw a User Owner not exists if findUserrepo not return a user', async () => {
    findUserRepo.by_id.mockResolvedValueOnce(null);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(
      new NotFoundError('User type: OWNER'),
    );
  });

  it('should be throw a error if admins received not exists in db', async () => {
    findUserRepo.by_id
      .mockResolvedValueOnce(userModelMocked)
      .mockResolvedValueOnce(null);
    const response = service.start({
      ...createFarmMocked,
      admins: ['not_exist'],
    });

    await expect(response).rejects.toThrow(
      new NotFoundError('User type: ADMIN'),
    );
  });

  it('should be throw a error if dealers received not exists in db', async () => {
    findUserRepo.by_id
      .mockResolvedValueOnce(userModelMocked)
      .mockResolvedValueOnce(null);
    const response = service.start({
      ...createFarmMocked,
      dealers: ['not_exist'],
    });

    await expect(response).rejects.toThrow(
      new NotFoundError('User type: DEALER'),
    );
  });

  it('should be throw a error if users received not exists in db', async () => {
    findUserRepo.by_id
      .mockResolvedValueOnce(userModelMocked)
      .mockResolvedValueOnce(null);
    const response = service.start({
      ...createFarmMocked,
      users: ['users'],
    });

    await expect(response).rejects.toThrow(
      new NotFoundError('User type: USER'),
    );
  });

  it('shoul be throw a User CREATOR not exists if findUserrepo not return a user', async () => {
    findUserRepo.by_id
      .mockResolvedValueOnce(userModelMocked)
      .mockResolvedValueOnce(null);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(
      new NotFoundError('User type: CREATOR'),
    );
  });

  it('shoul be throw Unauthorized if user does not a type MASTER or DEALER', async () => {
    findUserRepo.by_id
      .mockResolvedValueOnce(userModelMocked)
      .mockResolvedValueOnce({
        ...userModelMocked,
        userType: 'USER',
      });

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(new UnauthorizedException().message);
  });

  // Tests Create Farm

  it('shoul be create Farm to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(createFarmRepo, 'create');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  it('shoul be throw a QUERY ERROR if createFarm throw error', async () => {
    createFarmRepo.create.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('shoul be throw a error if createFarm return null', async () => {
    createFarmRepo.create.mockResolvedValueOnce(null);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(new NotCreatedError('Farm'));
  });

  it('shoul be have a new farm created if user to have a type MASTER and created_by column to be a user_id of this user', async () => {
    const response = await service.start(createFarmMocked);

    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('farm_id', createFarmMocked.farm_id);
  });
});
