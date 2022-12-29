import { TestingModule, Test } from '@nestjs/testing';
import { IFindUserRepo } from '@contracts/index';
import { FindUserRepo } from '../find.repo';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  userModelMocked,
  createUserMocked,
  prismaProviderMock,
  loggerMockProvider,
  prismaServiceMock,
  loggerMock,
} from '@testRoot/index';

describe('Find User Repo Unit', () => {
  let repo: IFindUserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<IFindUserRepo>(FindUserRepo);

    prismaServiceMock.user.findFirst.mockResolvedValue(userModelMocked);
    prismaServiceMock.user.findMany.mockResolvedValue([userModelMocked]);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();
    expect(loggerMock).toBeDefined();
  });

  /*
    Fin_By_Login Tests
  */

  it('should repo.by_login to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_login');
    await repo.by_login({ login: createUserMocked.login });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: createUserMocked.login });
  }, 600000);

  it('should prisma.user.findFist in fin_by_login to have been called with data válids', async () => {
    const spy = jest.spyOn(prismaServiceMock.user, 'findFirst');
    await repo.by_login({ login: createUserMocked.login });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { login: createUserMocked.login },
    });
  });

  it('should to return a user Created with fin_by_login not return an error', async () => {
    jest.spyOn(repo, 'by_login');
    const value = await repo.by_login({ login: userModelMocked.login });
    expect(value).toHaveProperty('user_id');
    expect(value).toHaveProperty('login', userModelMocked.login);
    expect(value).toHaveProperty('userType', userModelMocked.userType);
    expect(value).toHaveProperty('password', userModelMocked.password);
  });

  it('should to return a null with fin_by_login not find user', async () => {
    prismaServiceMock.user.findFirst = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_login({ login: userModelMocked.login });
    expect(value).toBe(null);
  });

  it('should log an erro when database find_by_login return error', async () => {
    prismaServiceMock.user.findFirst = jest
      .fn()
      .mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_login({ login: userModelMocked.login });
    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao buscar usuario no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  it('should to to throw "QUERY ERROR" when database find_by_login return erro', async () => {
    prismaServiceMock.user.findFirst.mockRejectedValueOnce(new Error());
    const value = repo.by_login({ login: userModelMocked.login });
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  /* ****************************************************
    Find By Id Tests
  */

  it('should repo.by_id to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_id');
    await repo.by_id({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: userModelMocked.user_id });
  });

  it('should prisma.user.findFist in fin_by_id to have been called with data válids', async () => {
    const spy = jest.spyOn(prismaServiceMock.user, 'findFirst');
    await repo.by_id({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { user_id: userModelMocked.user_id },
    });
  });

  it('should to return a user Created with fin_by_id not return an error', async () => {
    jest.spyOn(repo, 'by_id');
    const value = await repo.by_id({ user_id: userModelMocked.user_id });
    expect(value).toHaveProperty('user_id');
    expect(value).toHaveProperty('login', userModelMocked.login);
    expect(value).toHaveProperty('userType', userModelMocked.userType);
    expect(value).toHaveProperty('password', userModelMocked.password);
  });

  it('should to return a null with fin_by_id not find user', async () => {
    prismaServiceMock.user.findFirst = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_id({ user_id: userModelMocked.user_id });
    expect(value).toBe(null);
  });

  it('should to to throw "QUERY ERROR" when database find_by_login return erro', async () => {
    prismaServiceMock.user.findFirst.mockRejectedValueOnce(new Error());
    const value = repo.by_id({ user_id: userModelMocked.user_id });
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database find_by_id return error', async () => {
    prismaServiceMock.user.findFirst.mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_id({ user_id: userModelMocked.user_id });
    await expect(value).rejects.toThrow();

    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao buscar usuario no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  /*
    Without_login Tests
   */

  it('should repo.without_login to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'without_login');
    await repo.without_login({ login: createUserMocked.login });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: createUserMocked.login });
  });

  it('should prisma.user.findFist in without_login to have been called with data válids', async () => {
    const spy = jest.spyOn(prismaServiceMock.user, 'findFirst');
    await repo.without_login({ login: createUserMocked.login });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { login: createUserMocked.login },
      select: { user_id: true, userType: true, password: true },
    });
  });

  it('should to return a user_id and userType and password of user when without_login not return an error', async () => {
    prismaServiceMock.user.findFirst = jest.fn().mockResolvedValueOnce({
      user_id: 'soil_id',
      userType: 'MASTER',
      password: '1234',
    });
    const value = await repo.without_login({
      login: userModelMocked.login,
    });
    expect(value).toHaveProperty('user_id');
    expect(value).toHaveProperty('userType', userModelMocked.userType);
    expect(value).toHaveProperty('password', userModelMocked.password);

    expect(value).not.toHaveProperty('login', userModelMocked.login);
  });

  it('should to return a null with without_login not find user', async () => {
    prismaServiceMock.user.findFirst = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.without_login({
      login: userModelMocked.login,
    });
    expect(value).toBe(null);
  });

  it('should to to throw "QUERY ERROR" when database without_login return erro', async () => {
    prismaServiceMock.user.findFirst.mockRejectedValueOnce(new Error());
    const value = repo.without_login({ login: userModelMocked.login });
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database without_login return error', async () => {
    prismaServiceMock.user.findFirst.mockRejectedValueOnce(new DatabaseError());

    const value = repo.without_login({ login: userModelMocked.login });
    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao buscar usuario no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  // all
  it('should repo.all to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'all');
    await repo.all();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should prisma.user.findFist in all to have been called with data válids', async () => {
    const spy = jest.spyOn(prismaServiceMock.user, 'findMany');
    await repo.all();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      select: { user_id: true, login: true, userType: true },
    });
  });

  it('should to return list users if not exists users in db', async () => {
    prismaServiceMock.user.findMany = jest.fn().mockResolvedValueOnce([
      {
        user_id: 'soil_id',
        login: 'soil',
        userType: 'MASTER',
        password: '1234',
      },
    ]);
    const value = await repo.all();

    expect(value).toHaveLength(1);
    expect(value[0]).toHaveProperty('user_id');
    expect(value[0]).toHaveProperty('userType', 'MASTER');
    expect(value[0]).toHaveProperty('password', '1234');

    expect(value[0]).toHaveProperty('login', 'soil');
  });

  it('should to return an empty list  not find user', async () => {
    jest.spyOn(repo, 'all');
    prismaServiceMock.user.findMany = jest.fn().mockResolvedValueOnce([]);
    const value = await repo.all();
    expect(value).toEqual([]);
  });

  it('should to to throw "QUERY ERROR" when database all return erro', async () => {
    prismaServiceMock.user.findMany.mockRejectedValueOnce(new Error());
    const value = repo.all();
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database without_login return error', async () => {
    prismaServiceMock.user.findMany.mockRejectedValueOnce(new DatabaseError());

    const value = repo.all();
    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao buscar usuarios no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
