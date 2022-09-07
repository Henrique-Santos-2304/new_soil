import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IFindUserRepo } from '@root/domain';
import { PrismaService } from '@root/infra/config_acess_db';
import { createUserMocked, userModelMocked } from '@testRoot/mocks';
import { FindUserRepo } from '../find.repo';

describe('Find User Repo', () => {
  let repo: IFindUserRepo;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<IFindUserRepo>(FindUserRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.user.findFirst = jest.fn().mockResolvedValueOnce(userModelMocked);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should repo.by_login to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_login');
    await repo.by_login({ login: createUserMocked.login });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: createUserMocked.login });
  });

  it('should repo.by_id to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_id');
    await repo.by_id({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: userModelMocked.user_id });
  });

  it('should prisma.user.findFist in fin_by_login to have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.user, 'findFirst');
    await repo.by_login({ login: createUserMocked.login });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { login: createUserMocked.login },
    });
  });

  it('should prisma.user.findFist in fin_by_id to have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.user, 'findFirst');
    await repo.by_id({ user_id: userModelMocked.user_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { user_id: userModelMocked.user_id },
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

  it('should to return a user Created with fin_by_id not return an error', async () => {
    jest.spyOn(repo, 'by_id');
    const value = await repo.by_id({ user_id: userModelMocked.user_id });
    expect(value).toHaveProperty('user_id');
    expect(value).toHaveProperty('login', userModelMocked.login);
    expect(value).toHaveProperty('userType', userModelMocked.userType);
    expect(value).toHaveProperty('password', userModelMocked.password);
  });

  it('should to return a null with fin_by_login not find user', async () => {
    jest.spyOn(repo, 'by_login');
    prisma.user.findFirst = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_login({ login: userModelMocked.login });
    expect(value).toBe(null);
  });

  it('should to return a null with fin_by_id not find user', async () => {
    jest.spyOn(repo, 'by_id');
    prisma.user.findFirst = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_id({ user_id: userModelMocked.user_id });
    expect(value).toBe(null);
  });

  it('should to to throw "QUERY ERROR" when database find_by_login return erro', async () => {
    prisma.user.findFirst = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_login({ login: userModelMocked.login });
    await expect(value).rejects.toThrow('QUERY_ERROR');
  });

  it('should to to throw "QUERY ERROR" when database find_by_id return erro', async () => {
    prisma.user.findFirst = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_id({ user_id: userModelMocked.user_id });
    await expect(value).rejects.toThrow('QUERY_ERROR');
  });

  it('should log an erro when database find_by_login return error', async () => {
    prisma.user.findFirst = jest
      .fn()
      .mockRejectedValueOnce(new Error('DATABASE ERROR'));

    const value = repo.by_login({ login: userModelMocked.login });
    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar usuario no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('DATABASE ERROR');
  });

  it('should log an erro when database find_by_id return error', async () => {
    prisma.user.findFirst = jest
      .fn()
      .mockRejectedValueOnce(new Error('DATABASE ERROR'));

    const value = repo.by_id({ user_id: userModelMocked.user_id });
    await expect(value).rejects.toThrow();

    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar usuario no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('DATABASE ERROR');
  });
});
