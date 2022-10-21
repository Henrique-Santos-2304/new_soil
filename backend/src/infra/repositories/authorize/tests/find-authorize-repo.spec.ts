import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IFindAuthorizeRepo } from '@root/domain';
import { PrismaService } from '@root/infra/config_acess_db';
import { createAuthorizeMock } from '@testRoot/mocks';
import { FindAuthorizeRepo } from '../find-authorize.repo';

describe('Find Authorize Repo Unit', () => {
  let repo: IFindAuthorizeRepo;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAuthorizeRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<IFindAuthorizeRepo>(FindAuthorizeRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.authorize.findMany = jest
      .fn()
      .mockResolvedValue([createAuthorizeMock]);

    prisma.authorize.findFirst = jest
      .fn()
      .mockResolvedValue(createAuthorizeMock);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  /*
    Find All Tests
   */

  it('should repo.all to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'all');
    await repo.all();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should prisma.authorize.findMany in all to have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.authorize, 'findMany');
    await repo.all();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should to return all datas of user when all not return an error', async () => {
    const value = await repo.all();
    expect(value[0]).toHaveProperty('farm_id', createAuthorizeMock.farm_id);
    expect(value[0]).toHaveProperty('pivot_id', createAuthorizeMock.pivot_id);
    expect(value[0]).toHaveProperty(
      'created_by',
      createAuthorizeMock.created_by,
    );
  });

  it('should to return a null with all not find farm', async () => {
    jest.spyOn(repo, 'all');
    prisma.authorize.findMany = jest.fn().mockResolvedValueOnce([]);
    const value = await repo.all();
    expect(value).toHaveLength(0);
  });

  it('should to to throw "QUERY ERROR" when database all return erro', async () => {
    prisma.authorize.findMany = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.all();
    await expect(value).rejects.toThrow('QUERY ERROR');
  });

  it('should log an erro when database all return error', async () => {
    prisma.authorize.findMany = jest
      .fn()
      .mockRejectedValueOnce(new Error('DATABASE ERROR'));

    const value = repo.all();
    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar autorizações no banco de dados',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('DATABASE ERROR');
  });

  /*
    Find By Farm Tests
   */

  it('should repo.by_farm to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_farm');
    await repo.by_farm(createAuthorizeMock.farm_id);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock.farm_id);
  });

  it('should prisma.authorize.findMany in all to have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.authorize, 'findFirst');
    await repo.by_farm(createAuthorizeMock.farm_id);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { farm_id: createAuthorizeMock.farm_id },
    });
  });

  it('should to return all datas of user when all not return an error', async () => {
    const value = await repo.by_farm(createAuthorizeMock.farm_id);
    expect(value).toHaveProperty('farm_id', createAuthorizeMock.farm_id);
    expect(value).toHaveProperty('pivot_id', createAuthorizeMock.pivot_id);
    expect(value).toHaveProperty('created_by', createAuthorizeMock.created_by);
  });

  it('should to return a null with all not find farm', async () => {
    jest.spyOn(repo, 'by_farm');
    prisma.authorize.findFirst = jest.fn().mockResolvedValueOnce(null);
    const value = await repo.by_farm(createAuthorizeMock.farm_id);
    expect(value).toEqual(null);
  });

  it('should to to throw "QUERY ERROR" when database all return erro', async () => {
    prisma.authorize.findFirst = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_farm(createAuthorizeMock.farm_id);

    await expect(value).rejects.toThrow('QUERY ERROR');
  });

  it('should log an erro when database all return error', async () => {
    prisma.authorize.findFirst = jest
      .fn()
      .mockRejectedValueOnce(new Error('DATABASE ERROR'));

    const value = repo.by_farm(createAuthorizeMock.farm_id);

    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao buscar autorização no banco de dados',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('DATABASE ERROR');
  });
});
