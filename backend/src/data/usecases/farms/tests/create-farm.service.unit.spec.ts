import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateFarmService } from '@root/domain';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared/errors';
import {
  createFarmMocked,
  createFarmRepoMock,
  createFarmRepoMockProvider,
  findFarmRepoMock,
  findFarmRepoMockProvider,
  findUserRepoMock,
  findUserRepoMockProvider,
  loggerMockProvider,
  prismaProviderMock,
  userModelMocked,
} from '@testRoot/mocks';
import { CreateFarmService } from '../create-farm.service';

describe('Create Farm Service Unit', () => {
  let service: ICreateFarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFarmService,
        findFarmRepoMockProvider,
        findUserRepoMockProvider,
        createFarmRepoMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<ICreateFarmService>(CreateFarmService);

    findUserRepoMock.by_id.mockResolvedValue(userModelMocked);
    findFarmRepoMock.by_id.mockResolvedValue(null);
    createFarmRepoMock.create.mockResolvedValue({
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should providers to be defined', () => {
    expect(service).toBeDefined();
    expect(createFarmRepoMock).toBeDefined();

    expect(findUserRepoMock).toBeDefined();
    expect(findFarmRepoMock).toBeDefined();
  });

  it('should be service to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  // Test FindFarmRepo

  it('should be findFarm.by_id to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findFarmRepoMock, 'by_id');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: createFarmMocked.farm_id });
  });

  it('should be throw a FarmAlreadExist if findFarmrepo return a farm', async () => {
    findFarmRepoMock.by_id.mockResolvedValueOnce(createFarmMocked);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(new AlreadyExistsError('Farm'));
  });

  it('should be throw a QUERY ERROR if findFarmrepo throw error', async () => {
    findFarmRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Test findUserRepo
  it('should be findUser.by_id to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findUserRepoMock, 'by_id');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({ user_id: createFarmMocked.owner_id });
    expect(spy).toHaveBeenCalledWith({ user_id: createFarmMocked.created_by });
  });

  it('should be findUser.by_id to have been called five times if received admins, dealers and user', async () => {
    const spy = jest.spyOn(findUserRepoMock, 'by_id');

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

  it('should be throw a QUERY ERROR if findUserrepo throw error', async () => {
    findUserRepoMock.by_id.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Check users exists in db
  it('should be throw a User Owner not exists if findUserrepo not return a user', async () => {
    findUserRepoMock.by_id.mockResolvedValueOnce(null);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(
      new NotFoundError('User type: OWNER'),
    );
  });

  it('should be throw a error if admins received not exists in db', async () => {
    findUserRepoMock.by_id
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
    findUserRepoMock.by_id
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
    findUserRepoMock.by_id
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

  it('should be throw a User CREATOR not exists if findUserrepo not return a user', async () => {
    findUserRepoMock.by_id
      .mockResolvedValueOnce(userModelMocked)
      .mockResolvedValueOnce(null);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(
      new NotFoundError('User type: CREATOR'),
    );
  });

  it('should be throw Unauthorized if user does not a type MASTER or DEALER', async () => {
    findUserRepoMock.by_id
      .mockResolvedValueOnce(userModelMocked)
      .mockResolvedValueOnce({
        ...userModelMocked,
        userType: 'USER',
      });

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(new UnauthorizedException().message);
  });

  // Tests Create Farm

  it('should be create Farm to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(createFarmRepoMock, 'create');

    await service.start(createFarmMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  it('should be throw a QUERY ERROR if createFarm throw error', async () => {
    createFarmRepoMock.create.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should be throw a error if createFarm return null', async () => {
    createFarmRepoMock.create.mockResolvedValueOnce(null);

    const response = service.start(createFarmMocked);

    await expect(response).rejects.toThrow(new NotCreatedError('Farm'));
  });

  it('should be have a new farm created if user to have a type MASTER and created_by column to be a user_id of this user', async () => {
    const response = await service.start(createFarmMocked);

    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('farm_id', createFarmMocked.farm_id);
  });
});
