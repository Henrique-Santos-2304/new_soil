import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserRepo } from '@root/domain';
import { PrismaService } from '@root/infra/config_acess_db';
import { createUserMocked, userModelMocked } from '@testRoot/mocks';
import { CreateUserRepo } from '../create.repo';

describe('UserRepo', () => {
  let repo: ICreateUserRepo;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<ICreateUserRepo>(CreateUserRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.user.create = jest.fn().mockReturnValueOnce(userModelMocked);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
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

    expect(prisma.user.create).toHaveBeenCalled();
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserMocked });
  });

  it('should to return a user Created with action not ocurred an error', async () => {
    const value = await repo.create(createUserMocked);

    expect(value).toHaveProperty('user_id');
  });

  it('should to throw "QUERY ERROR" when database return erro', async () => {
    prisma.user.create = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.create(createUserMocked);
    await expect(value).rejects.toThrow("QUERY_ERROR");
  });

  it('should log an erro when database return error', async () => {
    const spy = jest.spyOn(repo, 'create')
    prisma.user.create = jest
      .fn()
      .mockRejectedValueOnce(new Error('DATABASE ERROR'));

    const response = repo.create(createUserMocked);

    // method log
    await expect(response).rejects.toThrow()
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao criar usuario no banco de dados...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('DATABASE ERROR');
  });
});
