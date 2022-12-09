import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUpdateFarmRepo } from '@contracts/index';
import { PrismaService } from '@db/config_acess_db';
import { DatabaseError, QueryError } from '@utils/errors';
import { createFarmMocked, updateFarmMock } from '@testRoot/mocks';
import { UpdateFarmRepo } from '../update-farm.repo';

describe('Update Farm Repo Unit', () => {
  let repo: IUpdateFarmRepo;
  let prisma: PrismaService;
  let logger: Logger;

  const callUpdated = {
    farm_id: 'id',
    farm: {
      ...updateFarmMock,
      farm_name: 'att_farm',
      updated_by: 'id',
    },
  };

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateFarmRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<IUpdateFarmRepo>(UpdateFarmRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.farm.update = jest
      .fn()
      .mockReturnValueOnce({ farm_id: createFarmMocked.farm_id });
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should repo.create to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'put');
    await repo.put(callUpdated);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callUpdated);
  });

  it('should prisma.user.update to have been called with data válids', async () => {
    await repo.put(callUpdated);

    expect(prisma.farm.update).toHaveBeenCalled();
    expect(prisma.farm.update).toHaveBeenCalledTimes(1);
    expect(prisma.farm.update).toHaveBeenCalledWith({
      data: { ...callUpdated.farm },
      where: { farm_id: callUpdated.farm_id },
      select: { farm_id: true },
    });
  });

  it('should to return a farm Created with action not ocurred an error', async () => {
    const value = await repo.put(callUpdated);

    expect(value).toHaveProperty('farm_id');
  });

  it('should to throw "QUERY ERROR" when database return erro', async () => {
    prisma.farm.update = jest.fn().mockRejectedValueOnce(new Error());

    const value = repo.put({
      ...callUpdated,
      farm: { ...callUpdated.farm, farm_name: 'att_farm' },
    });

    await expect(value).rejects.toThrow(new QueryError());
  });

  it('should log an erro when database return error', async () => {
    prisma.farm.update = jest.fn().mockRejectedValueOnce(new DatabaseError());

    const response = repo.put(callUpdated);

    // method log
    await expect(response).rejects.toThrow();
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao atualizar fazenda no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
