import { UnauthorizedException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { IDeleteUserService } from '@root/domain';
import { NotFoundError, QueryError } from '@root/shared/errors';
import {
  createFarmMocked,
  deleteFarmRepoMock,
  deleteUserRepoMock,
  deleteUserRepoMockProvider,
  findFarmByUserServiceMock,
  findFarmRepoMock,
  findFarmRepoMockProvider,
  findUserRepoMock,
  getUserByIdServiceMock,
  getUserByIdServiceMockProvider,
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  updateFarmRepoMock,
  updateFarmRepoMockProvider,
  userModelMocked,
} from '@testRoot/index';
import { DeleteUserService } from '../delete-user.service';

describe('Delete Farm Service Unit', () => {
  let service: IDeleteUserService;
  const callUserService: IDeleteUserService.Params = {
    auth: {
      user_id: 'test',
      userType: 'MASTER',
    },
    user_id: 'user',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        findFarmRepoMockProvider,
        getUserByIdServiceMockProvider,
        deleteUserRepoMockProvider,
        updateFarmRepoMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IDeleteUserService>(DeleteUserService);

    getUserByIdServiceMock.start.mockResolvedValue(userModelMocked);
    findFarmRepoMock.by_role.mockResolvedValue([
      { ...createFarmMocked, admins: ['id'] },
    ]);
    updateFarmRepoMock.addOrDeleteUser.mockResolvedValue({ farm_id: 'test' });
  });

  it('shoud be service and repo to be defined', async () => {
    expect(findUserRepoMock).toBeDefined();
    expect(findFarmRepoMock).toBeDefined();
    expect(deleteFarmRepoMock).toBeDefined();

    expect(service).toBeDefined();
  });

  // Tests find User
  it('should be find User service ro have been called with user id valid ', async () => {
    const spy = jest.spyOn(getUserByIdServiceMock, 'start');
    await service.start({ ...callUserService });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...callUserService });
  });

  it('should be throw error if get user service return error ', async () => {
    getUserByIdServiceMock.start.mockRejectedValueOnce(
      new NotFoundError('User'),
    );
    const response = service.start({ ...callUserService });
    await expect(response).rejects.toThrow(new NotFoundError('User').message);
  });

  it('should be throw unauthorized if userType is User ', async () => {
    const response = service.start({
      ...callUserService,
      auth: { ...callUserService.auth, userType: 'USER' },
    });
    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  it('should be findFarmRepo.by_role to have been called with data valids if user is MASTER ', async () => {
    const spy = jest.spyOn(findFarmRepoMock, 'by_role');
    await service.start({
      ...callUserService,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: callUserService.user_id });
  });

  it('should be throw error if find farm repo return error ', async () => {
    findFarmRepoMock.by_role.mockRejectedValueOnce(new QueryError());
    const response = service.start({ ...callUserService });
    await expect(response).rejects.toThrow(new QueryError().message);
  });

  it('should be throw error if find farm repo return error ', async () => {
    findFarmRepoMock.by_role.mockRejectedValueOnce(new QueryError());
    const response = service.start({ ...callUserService });
    await expect(response).rejects.toThrow(new QueryError().message);
  });

  it('should be update farm repo to have been called without this user if encountered user into farm ', async () => {
    const spy = jest.spyOn(updateFarmRepoMock, 'addOrDeleteUser');
    await service.start({ ...callUserService });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      farm_id: createFarmMocked.farm_id,
      admins: [],
    });
  });

  it('should be update farm repo to have been called two times if exists in two farm', async () => {
    findFarmRepoMock.by_role.mockResolvedValue([
      { ...createFarmMocked, admins: ['id'] },
      { ...createFarmMocked, users: ['id'] },
    ]);

    const spy = jest.spyOn(updateFarmRepoMock, 'addOrDeleteUser');
    await service.start({ ...callUserService });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should be throw error if update farm repo return error ', async () => {
    updateFarmRepoMock.addOrDeleteUser.mockRejectedValueOnce(new QueryError());
    const response = service.start({ ...callUserService });
    await expect(response).rejects.toThrow(new QueryError().message);
  });

  it('should be delete user repo to have been called with data valids if user is MASTER ', async () => {
    const spy = jest.spyOn(deleteUserRepoMock, 'by_id');
    await service.start({
      ...callUserService,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: callUserService.user_id });
  });

  it('should be throw error if delete user repo return error ', async () => {
    deleteUserRepoMock.by_id.mockRejectedValueOnce(new QueryError());
    const response = service.start({ ...callUserService });
    await expect(response).rejects.toThrow(new QueryError().message);
  });

  it('should be delete user repo to have been called with data valids if user is MASTER ', async () => {
    const spy = jest.spyOn(deleteUserRepoMock, 'by_id');
    await service.start({
      ...callUserService,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: callUserService.user_id });
  });

  it('should be findFarmRepo.by_role to have been called with data valids if user is MASTER ', async () => {
    const spy = jest.spyOn(findFarmRepoMock, 'by_role');
    await service.start({
      ...callUserService,
      auth: { ...callUserService.auth, userType: 'DEALER' },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: callUserService.user_id });
  });

  it('should be log user exists into other farms if userType is DEALER', async () => {
    const spy = jest.spyOn(loggerMock, 'warn');
    await service.start({
      ...callUserService,
      auth: { ...callUserService.auth, userType: 'DEALER' },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      'Does not possible delete user. User exists in other farms',
    );
  });

  it('should be log user exists into other farms if UserType is DEALER', async () => {
    findFarmByUserServiceMock.start.mockResolvedValueOnce([]);
    const spy = jest.spyOn(deleteUserRepoMock, 'by_id');
    await service.start({
      ...callUserService,
      auth: { ...callUserService.auth, userType: 'DEALER' },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: callUserService.user_id });
  });

  it('should be log user exists into other farms if userType is ADMIN', async () => {
    const spy = jest.spyOn(loggerMock, 'warn');
    await service.start({
      ...callUserService,
      auth: { ...callUserService.auth, userType: 'ADMIN' },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      'Does not possible delete user. User exists in other farms',
    );
  });

  it('should be log user exists into other farms if UserType is ADMIN', async () => {
    findFarmByUserServiceMock.start.mockResolvedValueOnce([]);
    const spy = jest.spyOn(deleteUserRepoMock, 'by_id');
    await service.start({
      ...callUserService,
      auth: { ...callUserService.auth, userType: 'ADMIN' },
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: callUserService.user_id });
  });

  it('should be service not have return', async () => {
    const response = await service.start({
      ...callUserService,
      auth: { ...callUserService.auth, userType: 'ADMIN' },
    });
    expect(response).toBeUndefined();
  });
});
