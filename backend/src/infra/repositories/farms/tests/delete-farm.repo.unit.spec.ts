import { Test, TestingModule } from '@nestjs/testing';
import { IDeleteFarmRepo } from '@contracts/index';
import { DeleteFarmRepo } from '../delete-farm.repo';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  createFarmMocked,
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  prismaServiceMock,
} from '@testRoot/mocks';

describe('Delete Farms Repo Unit', () => {
  let repo: IDeleteFarmRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteFarmRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<IDeleteFarmRepo>(DeleteFarmRepo);

    prismaServiceMock.farm.delete = jest.fn().mockReturnValue(1);
    prismaServiceMock.farm.deleteMany.mockReturnValue(1);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();
    expect(loggerMock).toBeDefined();
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
    const spy = jest.spyOn(prismaServiceMock.farm, 'delete');
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
    prismaServiceMock.farm.delete.mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_id({ farm_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith('Erro ao deletar fazenda...');

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  it('should to to throw "QUERY ERROR" when database find_by_id return erro', async () => {
    prismaServiceMock.farm.delete.mockRejectedValueOnce(new Error());
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
    const spy = jest.spyOn(prismaServiceMock.farm, 'deleteMany');
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
    prismaServiceMock.farm.deleteMany = jest
      .fn()
      .mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_user({ user_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith('Erro ao deletar fazenda...');

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  it('should to to throw "QUERY ERROR" when database find_by_id return erro', async () => {
    prismaServiceMock.farm.deleteMany.mockRejectedValueOnce(new Error());
    const value = repo.by_user({ user_id: createFarmMocked.farm_id });
    await expect(value).rejects.toThrow(new QueryError().message);
  });
});
