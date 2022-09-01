import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserRepo } from '@root/domain';
import { PrismaService } from '@root/infra/config_acess_db';
import { createUserMocked, userModelMocked } from '@testRoot/mocks';
import { CreateUserRepo } from '../create.repo';

describe('UserRepo', () => {
  let repo: ICreateUserRepo;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserRepo, PrismaService],
    }).compile();

    repo = module.get<ICreateUserRepo>(CreateUserRepo);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.user.create = jest.fn().mockReturnValueOnce(userModelMocked);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'create');
    await repo.create(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserMocked);
  });
});
