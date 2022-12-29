import { Test, TestingModule } from '@nestjs/testing';
import { ICreateFarmRepo } from '@root/domain';
import { CreateFarmRepo } from '../create.repo';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  createFarmMocked,
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  prismaServiceMock,
} from '@testRoot/mocks';

describe('Create Farm Repo Unit', () => {
  let repo: ICreateFarmRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateFarmRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<ICreateFarmRepo>(CreateFarmRepo);

    prismaServiceMock.farm.create.mockReturnValue({
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();
    expect(loggerMock).toBeDefined();
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

    expect(prismaServiceMock.farm.create).toHaveBeenCalled();
    expect(prismaServiceMock.farm.create).toHaveBeenCalledTimes(1);
    expect(prismaServiceMock.farm.create).toHaveBeenCalledWith({
      data: createFarmMocked,
      select: { farm_id: true },
    });
  });

  it('should to return a farm Created with action not ocurred an error', async () => {
    const value = await repo.create(createFarmMocked);

    expect(value).toHaveProperty('farm_id');
  });

  it('should to throw "QUERY ERROR" when database return erro', async () => {
    prismaServiceMock.farm.create.mockRejectedValueOnce(new Error());
    const value = repo.create(createFarmMocked);
    await expect(value).rejects.toThrow(new QueryError());
  });

  it('should log an erro when database return error', async () => {
    prismaServiceMock.farm.create.mockRejectedValueOnce(new DatabaseError());

    const response = repo.create(createFarmMocked);

    // method log
    await expect(response).rejects.toThrow();
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao criar fazenda no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
