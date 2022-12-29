import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserRepo } from '@contracts/index';
import { CreateUserRepo } from '../create.repo';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  createUserMocked,
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  prismaServiceMock,
} from '@testRoot/mocks';

describe('Create User Repo Unit', () => {
  let repo: ICreateUserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<ICreateUserRepo>(CreateUserRepo);
    prismaServiceMock.user.create.mockReturnValue({ user_id: 'user' });
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();
    expect(loggerMock).toBeDefined();
  });

  it('should repo.create to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'create');
    await repo.create(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserMocked);
  });

  it('should prisma.user.create to have been called with data válids', async () => {
    await repo.create(createUserMocked);

    expect(prismaServiceMock.user.create).toHaveBeenCalled();
    expect(prismaServiceMock.user.create).toHaveBeenCalledTimes(1);
    expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
      data: createUserMocked,
      select: {
        user_id: true,
      },
    });
  });

  it('should to return a user Created with action not ocurred an error', async () => {
    const value = await repo.create(createUserMocked);

    expect(value).toHaveProperty('user_id');
  });

  it('should to throw "QUERY ERROR" when database return erro', async () => {
    prismaServiceMock.user.create = jest
      .fn()
      .mockRejectedValueOnce(new Error());
    const value = repo.create(createUserMocked);
    await expect(value).rejects.toThrow(new QueryError());
  });

  it('should log an erro when database return error', async () => {
    prismaServiceMock.user.create = jest
      .fn()
      .mockRejectedValueOnce(new DatabaseError());

    const response = repo.create(createUserMocked);

    // method log
    await expect(response).rejects.toThrow();

    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao criar usuario no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
