import { Global, Logger, Module, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule, UserModule } from '@root/core';
import { mock, MockProxy } from 'jest-mock-extended';
import { AddUserIntoFarmService } from '../add-user-into-farm.service';
import {
  FARM_REPO,
  NotFoundError,
  USER_REPO,
  USER_SERVICE,
} from '@root/shared';
import {
  IAddUserIntoFarmService,
  ICreateUserRepo,
  ICreateUserService,
  IFindFarmsRepo,
  IFindUserRepo,
  IUpdateFarmRepo,
} from '@contracts/index';
import {
  createFarmMocked3,
  serviceAddUserIntoFarmMock,
  serviceUpdateFarmMock,
} from '@testRoot/index';
describe('Add User Into Farm Farm Service Unit', () => {
  let service: IAddUserIntoFarmService;
  let updateFarmRepo: MockProxy<IUpdateFarmRepo>;
  let createUserService: MockProxy<ICreateUserService>;
  let findUserRepo: MockProxy<IFindUserRepo>;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;

  let logger: MockProxy<Logger>;

  const dataFarm = {
    ...createFarmMocked3,
    owner_id: serviceUpdateFarmMock.user.user_id,
  };

  beforeEach(async () => {
    updateFarmRepo = mock();
    findFarmRepo = mock();
    findUserRepo = mock();
    createUserService = mock();
    logger = mock();

    const findFarmProvider = {
      provide: FARM_REPO.FIND,
      useValue: findFarmRepo,
    };

    const updateProvider = {
      provide: FARM_REPO.UPDATE,
      useValue: updateFarmRepo,
    };

    const createUserProvider = {
      provide: USER_SERVICE.CREATE,
      useValue: createUserService,
    };

    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        AddUserIntoFarmService,
        findFarmProvider,
        updateProvider,
        loggerProvider,
        createUserProvider,
      ],
    }).compile();

    service = module.get<IAddUserIntoFarmService>(AddUserIntoFarmService);

    findFarmRepo.by_id.mockResolvedValue(dataFarm);

    createUserService.start.mockResolvedValue({
      user_id: 'new_user',
      status: 'Sucess',
    });

    updateFarmRepo.addOrDeleteUser.mockResolvedValue({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
    });
  });

  it('should be providers is defined', () => {
    expect(service).toBeDefined();
    expect(updateFarmRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('should be service to have been called with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...serviceAddUserIntoFarmMock });
  });

  // Test FindFarmRepo

  it('should be findFarm.by_id to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findFarmRepo, 'by_id');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
    });
  });

  it('should be throw "Farm not found" if not exists farm with farm_id received', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce(null);

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findFarmRepo.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Auth User
  it('should be throw Unauthorized if userType is USER and not exists in table DEALERS or ADMINS', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...dataFarm,
      dealers: [],
      admins: [],
      users: [],
      owner_id: 'not_this',
    });
    const response = service.start({
      ...serviceAddUserIntoFarmMock,
      auth: { user_id: 'user', userType: 'USER' },
    });

    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  // Test Create User Repo

  it('should be createuserService to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(createUserService, 'start');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      ...serviceAddUserIntoFarmMock.data.add_user,
      internal_password: process.env.INTERNAL_PASSWORD,
    });
  });

  it('should be throw a QUERY ERROR if createUserService throw error', async () => {
    createUserService.start.mockRejectedValueOnce(new Error('ERROR'));

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('ERROR');
  });

  // Tests Update User Repo

  it('should be UpdateFarmRepo to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(updateFarmRepo, 'addOrDeleteUser');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
      data: { users: ['new_user'] },
    });
  });

  it('should be throw a QUERY ERROR if UpdateFarmRepo throw error', async () => {
    updateFarmRepo.addOrDeleteUser.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should useCase return "User not added into farm" if db return null', async () => {
    updateFarmRepo.addOrDeleteUser.mockResolvedValueOnce(null);
    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('User not added into farm');
  });

  it('should be useCases return data valids if not ocurred an error in table admin', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...dataFarm,
      dealers: [serviceAddUserIntoFarmMock.auth.user_id],
    });
    const response = await service.start({
      ...serviceAddUserIntoFarmMock,
      data: {
        ...serviceAddUserIntoFarmMock.data,
        table: 'admins',
      },
      auth: {
        user_id: serviceAddUserIntoFarmMock.auth.user_id,
        userType: 'USER',
      },
    });

    expect(response).toHaveProperty(
      'farm_id',
      serviceAddUserIntoFarmMock.farm_id,
    );
    expect(response).toHaveProperty('user_id', 'new_user');
  });

  it('should be useCases return data valids if not ocurred an error', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...dataFarm,
      admins: [serviceAddUserIntoFarmMock.auth.user_id],
    });
    const response = await service.start({
      ...serviceAddUserIntoFarmMock,
      data: { ...serviceAddUserIntoFarmMock.data, table: 'dealers' },
      auth: {
        user_id: serviceAddUserIntoFarmMock.auth.user_id,
        userType: 'USER',
      },
    });

    expect(response).toHaveProperty(
      'farm_id',
      serviceAddUserIntoFarmMock.farm_id,
    );
    expect(response).toHaveProperty('user_id', 'new_user');
  });
});
