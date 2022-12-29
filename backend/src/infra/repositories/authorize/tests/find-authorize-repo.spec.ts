import { Test, TestingModule } from '@nestjs/testing';
import { IFindAuthorizeRepo } from '@contracts/index';
import { FindAuthorizeRepo } from '../find-authorize.repo';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  createAuthorizeMock,
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  prismaServiceMock,
} from '@testRoot/mocks';

describe('Find Authorize Repo Unit', () => {
  let repo: IFindAuthorizeRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAuthorizeRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<IFindAuthorizeRepo>(FindAuthorizeRepo);

    prismaServiceMock.authorize.findMany.mockResolvedValue([
      createAuthorizeMock,
    ]);

    prismaServiceMock.authorize.findFirst.mockResolvedValue(
      createAuthorizeMock,
    );
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();
    expect(loggerMock).toBeDefined();
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
    const spy = jest.spyOn(prismaServiceMock.authorize, 'findMany');
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
    prismaServiceMock.authorize.findMany.mockResolvedValueOnce([]);
    const value = await repo.all();
    expect(value).toHaveLength(0);
  });

  it('should to to throw "QUERY ERROR" when database all return erro', async () => {
    prismaServiceMock.authorize.findMany.mockRejectedValueOnce(new Error());
    const value = repo.all();
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database all return error', async () => {
    prismaServiceMock.authorize.findMany.mockRejectedValueOnce(
      new DatabaseError(),
    );

    const value = repo.all();
    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao buscar autorizações no banco de dados',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
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
    const spy = jest.spyOn(prismaServiceMock.authorize, 'findFirst');
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
    prismaServiceMock.authorize.findFirst.mockResolvedValueOnce(null);
    const value = await repo.by_farm(createAuthorizeMock.farm_id);
    expect(value).toEqual(null);
  });

  it('should to to throw "QUERY ERROR" when database all return erro', async () => {
    prismaServiceMock.authorize.findFirst.mockRejectedValueOnce(new Error());
    const value = repo.by_farm(createAuthorizeMock.farm_id);

    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database all return error', async () => {
    prismaServiceMock.authorize.findFirst.mockRejectedValueOnce(
      new DatabaseError(),
    );

    const value = repo.by_farm(createAuthorizeMock.farm_id);

    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao buscar autorização no banco de dados',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
