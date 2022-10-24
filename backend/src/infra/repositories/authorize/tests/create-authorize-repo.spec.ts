import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateAuthorizeRepo } from '@root/domain/repositories/authorize/create-authorize.domain';
import { PrismaService } from '@root/infra/config_acess_db';
import { DatabaseError, QueryError } from '@root/shared/errors';
import { createAuthorizeMock } from '@testRoot/mocks';
import { CreateAuthorizeRepo } from '../create-authorize.repo';

describe('Create Authorize Repo Unit', () => {
  let repo: ICreateAuthorizeRepo;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAuthorizeRepo, PrismaService, loggerProvider],
    }).compile();

    repo = module.get<ICreateAuthorizeRepo>(CreateAuthorizeRepo);
    prisma = module.get<PrismaService>(PrismaService);
    logger = module.get<Logger>(Logger);

    prisma.authorize.create = jest
      .fn()
      .mockReturnValueOnce({ authorize_id: 'fake_id' });
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
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

    expect(prisma.authorize.create).toHaveBeenCalled();
    expect(prisma.authorize.create).toHaveBeenCalledTimes(1);
    expect(prisma.authorize.create).toHaveBeenCalledWith({
      data: createAuthorizeMock,
      select: { authorize_id: true },
    });
  });

  it('should to return a farm Created with action not ocurred an error', async () => {
    const value = await repo.create(createAuthorizeMock);

    expect(value).toHaveProperty('authorize_id');
  });

  it('should to throw "QUERY ERROR" when database return erro', async () => {
    prisma.authorize.create = jest.fn().mockRejectedValueOnce(new Error());
    const value = repo.create(createAuthorizeMock);
    await expect(value).rejects.toThrow(new QueryError().message);
  });

  it('should log an erro when database return error', async () => {
    prisma.authorize.create = jest
      .fn()
      .mockRejectedValueOnce(new DatabaseError());

    const response = repo.create(createAuthorizeMock);

    // method log
    await expect(response).rejects.toThrow();
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(
      'Erro ao criar nova authorização...',
    );

    //method error
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
