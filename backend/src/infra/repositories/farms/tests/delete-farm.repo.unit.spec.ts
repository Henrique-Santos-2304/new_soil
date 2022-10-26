import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IDeleteFarmRepo } from '@contracts/index';
import { PrismaService } from '@db/config_acess_db';
import { DatabaseError, QueryError } from '@utils/errors';
import { createFarmMocked } from '@testRoot/mocks';
import { DeleteFarmRepo } from '../delete-farm.repo';

describe('Delete Farms Repo Unit', () => {
  let repo: IDeleteFarmRepo;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteFarmRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<IDeleteFarmRepo>(DeleteFarmRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.farm.delete = jest.fn().mockReturnValue(1);
    prisma.farm.deleteMany = jest.fn().mockReturnValue(1);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prisma).toBeDefined();
    expect(logger).toBeDefined();
  });

  /*
    Del by farm_id
  */

  it('should repo.by_id to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_id');
    await repo.by_id({ farm_id: createFarmMocked.farm_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ farm_id: createFarmMocked.farm_id });
  });

  it('should prisma.farm.delete have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.farm, 'delete');
    await repo.by_id({ farm_id: createFarmMocked.farm_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { farm_id: createFarmMocked.farm_id },
    });
  });

  it('should to return a void if not ocurred an error', async () => {
    const value = await repo.by_id({ farm_id: createFarmMocked.farm_id });
    expect(value).toBeUndefined();
  });

  it('should log an erro when database find_by_id return error', async () => {
    prisma.farm.delete = jest.fn().mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_id({ farm_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith('Erro ao deletar fazenda...');

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  it('should to to throw "QUERY ERROR" when database find_by_id return erro', async () => {
    prisma.farm.delete = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_id({ farm_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  /*
    Del by user_id
  */

  it('should repo.by_user to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_user');
    await repo.by_user({ user_id: createFarmMocked.farm_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: createFarmMocked.farm_id });
  });

  it('should prisma.farm.deleteMany have been called with data válids', async () => {
    const spy = jest.spyOn(prisma.farm, 'deleteMany');
    await repo.by_user({ user_id: createFarmMocked.farm_id });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { owner_id: createFarmMocked.farm_id },
    });
  });

  it('should to return a void if not ocurred an error', async () => {
    const value = await repo.by_user({ user_id: createFarmMocked.farm_id });
    expect(value).toBeUndefined();
  });

  it('should log an erro when database find_by_id return error', async () => {
    prisma.farm.deleteMany = jest
      .fn()
      .mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_user({ user_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow();
    // method log
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith('Erro ao deletar fazenda...');

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  it('should to to throw "QUERY ERROR" when database find_by_id return erro', async () => {
    prisma.farm.deleteMany = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.by_user({ user_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow(new QueryError().message);
  });
});
