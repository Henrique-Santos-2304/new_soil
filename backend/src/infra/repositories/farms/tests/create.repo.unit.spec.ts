import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateFarmRepo } from '@root/domain';
import { PrismaService } from '@root/infra/config_acess_db';
import { DatabaseError, QueryError } from '@root/shared/errors';
import { createFarmMocked } from '@testRoot/mocks';
import { CreateFarmRepo } from '../create.repo';

describe('Create Farm Repo Unit', () => {
  let repo: ICreateFarmRepo;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateFarmRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<ICreateFarmRepo>(CreateFarmRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.farm.create = jest
      .fn()
      .mockReturnValueOnce({ farm_id: createFarmMocked.farm_id });
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should repo.create to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'create');
    await repo.create(createFarmMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createFarmMocked);
  });

  it('should prisma.user.create to have been called with data válids', async () => {
    await repo.create(createFarmMocked);

    expect(prisma.farm.create).toHaveBeenCalled();
    expect(prisma.farm.create).toHaveBeenCalledTimes(1);
    expect(prisma.farm.create).toHaveBeenCalledWith({
      data: createFarmMocked,
      select: { farm_id: true },
    });
  });

  it('should to return a farm Created with action not ocurred an error', async () => {
    const value = await repo.create(createFarmMocked);

    expect(value).toHaveProperty('farm_id');
  });

  it('should to throw "QUERY ERROR" when database return erro', async () => {
    prisma.farm.create = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.create(createFarmMocked);
    await expect(value).rejects.toThrow(new QueryError());
  });

  it('should log an erro when database return error', async () => {
    prisma.farm.create = jest.fn().mockRejectedValueOnce(new DatabaseError());

    const response = repo.create(createFarmMocked);

    // method log
    await expect(response).rejects.toThrow();
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao criar fazenda no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
