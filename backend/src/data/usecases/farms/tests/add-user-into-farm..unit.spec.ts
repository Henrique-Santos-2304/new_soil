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
import { createFarmMocked, serviceUpdateFarmMock } from '@testRoot/index';
import { mock, MockProxy } from 'jest-mock-extended';
import { AddUserIntoFarmService } from '../add-user-into-farm.service';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared';

describe('Update Farm Service Unit', () => {
  let service: IAddUserIntoFarmService;
  let updateFarmRepo: MockProxy<IUpdateFarmRepo>;
  let findUser: MockProxy<IFindUserRepo>;
  let createUserRepo: MockProxy<ICreateUserRepo>;
  let findFarmRepo: MockProxy<IFindFarmsRepo>;

  let logger: MockProxy<Logger>;

  const serviceMock: IAddUserIntoFarmService.Params = {
    auth: {
      user_id: createFarmMocked.owner_id,
      userType: 'MASTER',
    },
    farm_id: createFarmMocked.farm_id,
    data: {
      add_user: {
        userType: 'USER',
        password: '1234',
        login: 'add_user',
      },
    },
  };

  beforeEach(async () => {
    updateFarmRepo = mock();
    findFarmRepo = mock();
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

    findFarmRepo.by_id.mockResolvedValue({
      ...createFarmMocked,
      owner_id: serviceUpdateFarmMock.user.user_id,
    });

    findUser.by_login.mockResolvedValue(null);

    createUserRepo.create.mockResolvedValue({ user_id: 'new_user' });

    updateFarmRepo.addUser.mockResolvedValue({
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should be providers is defined', () => {
    expect(service).toBeDefined();
    expect(updateFarmRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('should be service to have been called with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start({ ...serviceMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...serviceMock });
  });

  // Test FindFarmRepo

  it('should be findFarm.by_id to have been called once time and with data valids', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...createFarmMocked,
      owner_id: serviceUpdateFarmMock.user.user_id,
    });

    const spy = jest.spyOn(findFarmRepo, 'by_id');

    await service.start({ ...serviceMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceMock.farm_id,
    });
  });

  it('should be throw "Farm not found" if not exists farm with farm_id received', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce(null);

    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findFarmRepo.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Auth User
  it('should be throw Unauthorized if userType is USER and not exists in table DEALERS or ADMINS', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...createFarmMocked,
      dealers: [],
      admins: [],
      users: [],
      owner_id: 'not_this',
    });
    const response = service.start({
      ...serviceMock,
      auth: { user_id: '', userType: 'USER' },
    });

    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  // Tests Find User By Login

  it('should be findUser.by_login to have been called once time and with data valids', async () => {
    findFarmRepo.by_id.mockResolvedValueOnce({
      ...createFarmMocked,
      owner_id: serviceUpdateFarmMock.user.user_id,
    });

    const spy = jest.spyOn(findUser, 'by_login');

    await service.start({ ...serviceMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      login: serviceMock.data.add_user.login,
    });
  });

  it('should be throw "User Already Exists" if exists user into db', async () => {
    findUser.by_login.mockResolvedValueOnce({
      ...serviceMock.data.add_user,
      user_id: 'test',
    });

    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow(new AlreadyExistsError('User'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findUser.by_login.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Test Create User Repo

  it('should be createuserRepo to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(createUserRepo, 'create');

    await service.start({ ...serviceMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...serviceMock.data.add_user });
  });

  it('should useCase return User not created if db not return a new user', async () => {
    createUserRepo.create.mockResolvedValueOnce(null);
    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow(new NotCreatedError('User').message);
  });

  it('should be throw a QUERY ERROR if createUserRepo throw error', async () => {
    createUserRepo.create.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Tests Update User Repo

  it('should be UpdateFarmRepo to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(updateFarmRepo, 'addUser');

    await service.start({ ...serviceMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceMock.farm_id,
      data: { users: ['new_user'] },
    });
  });

  it('should be throw a QUERY ERROR if UpdateFarmRepo throw error', async () => {
    updateFarmRepo.addUser.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should useCase return "User not added into farm" if db return null', async () => {
    updateFarmRepo.addUser.mockResolvedValueOnce(null);
    const response = service.start({ ...serviceMock });

    await expect(response).rejects.toThrow('User not added into farm');
  });

  it('should be useCases return data valids if not ocurred an error', async () => {
    const response = await service.start({ ...serviceMock });

    expect(response).toHaveProperty('farm_id', serviceMock.farm_id);
    expect(response).toHaveProperty('user_id', 'new_user');
  });
});
