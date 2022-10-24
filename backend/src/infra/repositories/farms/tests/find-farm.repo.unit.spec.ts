import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IFindFarmsRepo } from '@contracts/index';
import { PrismaService } from '@db/config_acess_db';
import { DatabaseError, QueryError } from '@utils/errors';
import { createFarmMocked } from '@testRoot/mocks';
import { FindFarmRepo } from '../find_farm.repo';

describe('Find Farms Repo Unit', () => {
  let repo: IFindFarmsRepo;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindFarmRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<IFindFarmsRepo>(FindFarmRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.farm.findFirst = jest.fn().mockResolvedValueOnce(createFarmMocked);
    prisma.farm.findMany = jest.fn().mockResolvedValueOnce([createFarmMocked]);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  /*
    Fin_By_Id Tests
  */

  it('should repo.by_id to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_id');
    await repo.by_id({ farm_id: createFarmMocked.farm_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: createFarmMocked.farm_id });
  });

  it('should prisma.farm.findFist in fin_by_id to have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.farm, 'findFirst');
    await repo.by_id({ farm_id: createFarmMocked.farm_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { farm_id: createFarmMocked.farm_id },
    });
  });

  it('should to return a farms Created with fin_by_id not return an error', async () => {
    jest.spyOn(repo, 'by_id');
    const value = await repo.by_id({ farm_id: createFarmMocked.farm_id });
    expect(value).toHaveProperty('farm_id', createFarmMocked.farm_id);
    expect(value).toHaveProperty('farm_city', createFarmMocked.farm_city);
    expect(value).toHaveProperty('farm_name', createFarmMocked.farm_name);
    expect(value).toHaveProperty('farm_lat', createFarmMocked.farm_lat);
    expect(value).toHaveProperty('farm_lng', createFarmMocked.farm_lng);
    expect(value).toHaveProperty('admins', createFarmMocked.admins);
    expect(value).toHaveProperty('users', createFarmMocked.users);
    expect(value).toHaveProperty('dealers', createFarmMocked.dealers);
  });

  it('should to return a null with fin_by_id not find farm', async () => {
    jest.spyOn(repo, 'by_id');
    prisma.farm.findFirst = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_id({ farm_id: createFarmMocked.farm_id });
    expect(value).toBe(null);
  });

  it('should log an erro when database find_by_id return error', async () => {
    prisma.farm.findFirst = jest
      .fn()
      .mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_id({ farm_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar fazenda no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  it('should to to throw "QUERY ERROR" when database find_by_id return erro', async () => {
    prisma.farm.findFirst = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_id({ farm_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  /* ****************************************************
    Find By User Tests
  */

  it('should repo.by_user to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_user');
    await repo.by_user({ user_id: createFarmMocked.admins[0] });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      user_id: createFarmMocked.admins[0],
    });
  });

  it('should prisma.farm.findFist in fin_by_user to have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.farm, 'findMany');
    await repo.by_user({ user_id: createFarmMocked.owner_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { owner_id: createFarmMocked.owner_id },
    });
  });

  it('should to return a farm Created with fin_by_user not return an error', async () => {
    jest.spyOn(repo, 'by_user');
    const value = await repo.by_user({
      user_id: createFarmMocked.admins[0],
    });
    expect(value[0]).toHaveProperty('farm_id', createFarmMocked.farm_id);
    expect(value[0]).toHaveProperty('farm_city', createFarmMocked.farm_city);
    expect(value[0]).toHaveProperty('farm_name', createFarmMocked.farm_name);
    expect(value[0]).toHaveProperty('farm_lat', createFarmMocked.farm_lat);
    expect(value[0]).toHaveProperty('farm_lng', createFarmMocked.farm_lng);
    expect(value[0]).toHaveProperty('admins', createFarmMocked.admins);
    expect(value[0]).toHaveProperty('users', createFarmMocked.users);
    expect(value[0]).toHaveProperty('dealers', createFarmMocked.dealers);
  });

  it('should to return a null with fin_by_user not find user', async () => {
    jest.spyOn(repo, 'by_user');
    prisma.farm.findMany = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_user({
      user_id: createFarmMocked.admins[0],
    });
    expect(value).toBe(null);
  });

  it('should to to throw "QUERY ERROR" when database find_by_user return erro', async () => {
    prisma.farm.findMany = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_user({ user_id: createFarmMocked.admins[0] });
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database find_by_user return error', async () => {
    prisma.farm.findMany = jest.fn().mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_user({ user_id: createFarmMocked.admins[0] });
    await expect(value).rejects.toThrow();

    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar fazenda no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  /*
    Find All Tests
   */

  it('should repo.all to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'all');
    await repo.all();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should prisma.farms.findFist in all to have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.farm, 'findMany');
    await repo.all();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should to return a user_id and userType and password of user when all not return an error', async () => {
    const value = await repo.all();
    expect(value[0]).toHaveProperty('farm_id', createFarmMocked.farm_id);
    expect(value[0]).toHaveProperty('farm_city', createFarmMocked.farm_city);
    expect(value[0]).toHaveProperty('farm_name', createFarmMocked.farm_name);
    expect(value[0]).toHaveProperty('farm_lat', createFarmMocked.farm_lat);
    expect(value[0]).toHaveProperty('farm_lng', createFarmMocked.farm_lng);
    expect(value[0]).toHaveProperty('admins', createFarmMocked.admins);
    expect(value[0]).toHaveProperty('users', createFarmMocked.users);
    expect(value[0]).toHaveProperty('dealers', createFarmMocked.dealers);
  });

  it('should to return a null with all not find farm', async () => {
    jest.spyOn(repo, 'all');
    prisma.farm.findMany = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.all();
    expect(value).toBe(null);
  });

  it('should to to throw "QUERY ERROR" when database all return erro', async () => {
    prisma.farm.findMany = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.all();
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database all return error', async () => {
    prisma.farm.findMany = jest.fn().mockRejectedValueOnce(new DatabaseError());

    const value = repo.all();
    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar fazenda no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  /* ****************************************************
    Find By Role Tests
  */

  it('should repo.by_role to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_role');
    await repo.by_role({ role: 'ADMIN', user_id: '' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ role: 'ADMIN', user_id: '' });
  });

  it('should prisma.farms.findMany in by_role to have been called with data válids when role is ADMIN', async () => {
    const spy = jest.spyOn(prisma.farm, 'findMany');
    await repo.by_role({ role: 'ADMIN', user_id: '' });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ where: { admins: { hasSome: '' } } });
  });

  it('should prisma.farms.findMany in by_role to have been called with data válids when role is DEALER', async () => {
    const spy = jest.spyOn(prisma.farm, 'findMany');
    await repo.by_role({ role: 'DEALER', user_id: '' });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ where: { dealers: { hasSome: '' } } });
  });

  it('should prisma.farms.findMany in by_role to have been called with data válids when role is USER', async () => {
    const spy = jest.spyOn(prisma.farm, 'findMany');
    await repo.by_role({ role: 'USER', user_id: '' });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ where: { users: { hasSome: '' } } });
  });

  it('should to return a user_id and userType and password of user when all not return an error', async () => {
    const value = await repo.by_role({ role: 'ADMIN', user_id: '' });
    expect(value[0]).toHaveProperty('farm_id', createFarmMocked.farm_id);
    expect(value[0]).toHaveProperty('farm_city', createFarmMocked.farm_city);
    expect(value[0]).toHaveProperty('farm_name', createFarmMocked.farm_name);
    expect(value[0]).toHaveProperty('farm_lat', createFarmMocked.farm_lat);
    expect(value[0]).toHaveProperty('farm_lng', createFarmMocked.farm_lng);
    expect(value[0]).toHaveProperty('admins', createFarmMocked.admins);
    expect(value[0]).toHaveProperty('users', createFarmMocked.users);
    expect(value[0]).toHaveProperty('dealers', createFarmMocked.dealers);
  });

  it('should to return a null with all not find farm', async () => {
    prisma.farm.findMany = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_role({ role: 'ADMIN', user_id: '' });
    expect(value).toBe(null);
  });

  it('should to to throw "QUERY ERROR" when database all return erro', async () => {
    prisma.farm.findMany = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_role({ role: 'ADMIN', user_id: '' });
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database all return error', async () => {
    prisma.farm.findMany = jest.fn().mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_role({ role: 'ADMIN', user_id: '' });
    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar fazenda no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
