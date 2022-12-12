import { Logger, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  IAddUserIntoFarmService,
  ICreateUserRepo,
  IFindFarmsRepo,
  IFindUserRepo,
  IUpdateFarmRepo,
} from '@contracts/index';
import {
  createFarmMocked,
  createFarmMocked2,
  createFarmMocked3,
  serviceAddUserIntoFarmMock,
  serviceUpdateFarmMock,
} from '@testRoot/index';
import { mock, MockProxy } from 'jest-mock-extended';
import { AddUserIntoFarmService } from '../add-user-into-farm.service';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared';

describe('Add User Into Farm Farm Service Unit', () => {
  let service: IAddUserIntoFarmService;
  let updateFarmRepo: MockProxy<IUpdateFarmRepo>;
  let findUser: MockProxy<IFindUserRepo>;
  let createUserRepo: MockProxy<ICreateUserRepo>;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;

  let logger: MockProxy<Logger>;

  const dataFarm = {
    ...createFarmMocked3,
    owner_id: serviceUpdateFarmMock.user.user_id,
  };

  beforeEach(async () => {
    updateFarmRepo = mock();
    findFarmRepo = mock();
    findUser = mock();
    createUserRepo = mock();
    logger = mock();

    const findFarmProvider = {
      provide: 'IFindFarmsRepo',
      useValue: findFarmRepo,
    };

    const findUserProvider = {
      provide: 'IFindUserRepo',
      useValue: findUser,
    };

    const updateProvider = {
      provide: 'IUpdateFarmRepo',
      useValue: updateFarmRepo,
    };

    const createUserProvider = {
      provide: 'ICreateUserRepo',
      useValue: createUserRepo,
    };

    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        AddUserIntoFarmService,
        findFarmProvider,
        updateProvider,
        loggerProvider,
        findUserProvider,
        createUserProvider,
      ],
    }).compile();

    service = module.get<IAddUserIntoFarmService>(AddUserIntoFarmService);

    findFarmRepo.by_id.mockResolvedValue(dataFarm);

    findUser.by_login.mockResolvedValue(null);

    createUserRepo.create.mockResolvedValue({ user_id: 'new_user' });

    updateFarmRepo.addUser.mockResolvedValue({
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

  // Tests Find User By Login

  it('should be findUser.by_login to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findUser, 'by_login');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      login: serviceAddUserIntoFarmMock.data.add_user.login,
    });
  });

  it('should be throw "User Already Exists" if exists user into db', async () => {
    findUser.by_login.mockResolvedValueOnce({
      ...serviceAddUserIntoFarmMock.data.add_user,
      user_id: 'test',
    });

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow(new AlreadyExistsError('User'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findUser.by_login.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Test Create User Repo

  it('should be createuserRepo to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(createUserRepo, 'create');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      ...serviceAddUserIntoFarmMock.data.add_user,
    });
  });

  it('should useCase return User not created if db not return a new user', async () => {
    createUserRepo.create.mockResolvedValueOnce(null);
    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow(new NotCreatedError('User').message);
  });

  it('should be throw a QUERY ERROR if createUserRepo throw error', async () => {
    createUserRepo.create.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Tests Update User Repo

  it('should be UpdateFarmRepo to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(updateFarmRepo, 'addUser');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
      data: { users: ['new_user'] },
    });
  });

  it('should be throw a QUERY ERROR if UpdateFarmRepo throw error', async () => {
    updateFarmRepo.addUser.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should useCase return "User not added into farm" if db return null', async () => {
    updateFarmRepo.addUser.mockResolvedValueOnce(null);
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
