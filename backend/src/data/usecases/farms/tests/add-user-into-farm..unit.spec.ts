import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddUserIntoFarmService } from '../add-user-into-farm.service';
import { NotFoundError } from '@root/shared';
import { IAddUserIntoFarmService } from '@contracts/index';
import {
  createFarmMocked3,
  createUserServiceMock,
  createUserServiceMockProvider,
  findFarmRepoMock,
  findFarmRepoMockProvider,
  loggerMockProvider,
  prismaProviderMock,
  serviceAddUserIntoFarmMock,
  serviceUpdateFarmMock,
  updateFarmRepoMock,
  updateFarmRepoMockProvider,
} from '@testRoot/index';

describe('Add User Into Farm Farm Service Unit', () => {
  let service: IAddUserIntoFarmService;

  const dataFarm = {
    ...createFarmMocked3,
    owner_id: serviceUpdateFarmMock.user.user_id,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddUserIntoFarmService,
        findFarmRepoMockProvider,
        updateFarmRepoMockProvider,
        loggerMockProvider,
        createUserServiceMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IAddUserIntoFarmService>(AddUserIntoFarmService);

    findFarmRepoMock.by_id.mockResolvedValue(dataFarm);
    createUserServiceMock.start.mockResolvedValue({
      user_id: 'new_user',
      status: 'Sucess',
    });
    updateFarmRepoMock.addOrDeleteUser.mockResolvedValue({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
    });
  });

  it('should be providers is defined', () => {
    expect(service).toBeDefined();
    expect(updateFarmRepoMock).toBeDefined();
    expect(findFarmRepoMock).toBeDefined();
  });

  it('should be service to have been called with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...serviceAddUserIntoFarmMock });
  });

  // Test FindFarmRepo

  it('should be findFarm.by_id to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findFarmRepoMock, 'by_id');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
    });
  });

  it('should be throw "Farm not found" if not exists farm with farm_id received', async () => {
    findFarmRepoMock.by_id.mockResolvedValueOnce(null);

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow(new NotFoundError('Farm'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findFarmRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Auth User
  it('should be throw Unauthorized if userType is USER and not exists in table DEALERS or ADMINS', async () => {
    findFarmRepoMock.by_id.mockResolvedValueOnce({
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
    const spy = jest.spyOn(createUserServiceMock, 'start');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      ...serviceAddUserIntoFarmMock.data.add_user,
      internal_password: process.env.INTERNAL_PASSWORD,
    });
  });

  it('should be throw a QUERY ERROR if createUserService throw error', async () => {
    createUserServiceMock.start.mockRejectedValueOnce(new Error('ERROR'));

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('ERROR');
  });

  // Tests Update User Repo

  it('should be UpdateFarmRepo to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(updateFarmRepoMock, 'addOrDeleteUser');

    await service.start({ ...serviceAddUserIntoFarmMock });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: serviceAddUserIntoFarmMock.farm_id,
      data: { users: ['new_user'] },
    });
  });

  it('should be throw a QUERY ERROR if UpdateFarmRepo throw error', async () => {
    updateFarmRepoMock.addOrDeleteUser.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should useCase return "User not added into farm" if db return null', async () => {
    updateFarmRepoMock.addOrDeleteUser.mockResolvedValueOnce(null);
    const response = service.start({ ...serviceAddUserIntoFarmMock });

    await expect(response).rejects.toThrow('User not added into farm');
  });

  it('should be useCases return data valids if not ocurred an error in table admin', async () => {
    findFarmRepoMock.by_id.mockResolvedValueOnce({
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
    findFarmRepoMock.by_id.mockResolvedValueOnce({
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
