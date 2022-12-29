import { Test, TestingModule } from '@nestjs/testing';
import { ICreateAuthorizeRepo } from '@contracts/index';
import { CreateAuthorizeRepo } from '../create-authorize.repo';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  createAuthorizeMock,
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  prismaServiceMock,
} from '@testRoot/mocks';

describe('Create Authorize Repo Unit', () => {
  let repo: ICreateAuthorizeRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAuthorizeRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<ICreateAuthorizeRepo>(CreateAuthorizeRepo);

    prismaServiceMock.authorize.create.mockReturnValue({
      authorize_id: 'fake_id',
    });
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();
    expect(loggerMock).toBeDefined();
  });

  it('should repo.create to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'create');
    await repo.create(createAuthorizeMock);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock);
  });

  it('should prisma.authorize.create to have been called with data válids', async () => {
    await repo.create(createAuthorizeMock);

    expect(prismaServiceMock.authorize.create).toHaveBeenCalled();
    expect(prismaServiceMock.authorize.create).toHaveBeenCalledTimes(1);
    expect(prismaServiceMock.authorize.create).toHaveBeenCalledWith({
      data: createAuthorizeMock,
      select: { authorize_id: true },
    });
  });

  it('should to return a farm Created with action not ocurred an error', async () => {
    const value = await repo.create(createAuthorizeMock);

    expect(value).toHaveProperty('authorize_id');
  });

  it('should to throw "QUERY ERROR" when database return erro', async () => {
    prismaServiceMock.authorize.create.mockRejectedValueOnce(new Error());
    const value = repo.create(createAuthorizeMock);
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database return error', async () => {
    prismaServiceMock.authorize.create = jest
      .fn()
      .mockRejectedValueOnce(new DatabaseError());

    const response = repo.create(createAuthorizeMock);

    // method log
    await expect(response).rejects.toThrow();
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao criar nova authorização...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
