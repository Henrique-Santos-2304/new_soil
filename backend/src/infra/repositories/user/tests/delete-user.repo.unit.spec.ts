import { Test, TestingModule } from '@nestjs/testing';
import { IDeleteUserRepo } from '@contracts/index';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  prismaServiceMock,
} from '@testRoot/mocks';
import { DeleteUserRepo } from '../delete-user.repo';

describe('Delete Farms Repo Unit', () => {
  let repo: IDeleteUserRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUserRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<IDeleteUserRepo>(DeleteUserRepo);

    prismaServiceMock.user.delete.mockReturnValue(1);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();
    expect(loggerMock).toBeDefined();
  });
  /*
    Del by user_id
  */

  it('should repo.by_user to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'by_id');
    await repo.by_id({ user_id: 'id' });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ user_id: 'id' });
  });

  it('should prisma.farm.deleteMany have been called with data válids', async () => {
    const spy = jest.spyOn(prismaServiceMock.farm, 'delete');
    await repo.by_id({ user_id: 'id' });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: { user_id: 'id' },
    });
  });

  it('should to return a void if not ocurred an error', async () => {
    const value = await repo.by_id({ user_id: 'id' });
    expect(value).toBe(1);
  });

  it('should log an erro when database find_by_id return error', async () => {
    prismaServiceMock.farm.delete.mockRejectedValueOnce(new DatabaseError());

    const value = repo.by_id({ user_id: 'id' });
    await expect(value).rejects.toThrow();
    // method log
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith('Erro ao deletar usuário...');

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  it('should to to throw "QUERY ERROR" when database find_by_id return erro', async () => {
    prismaServiceMock.farm.delete.mockRejectedValueOnce(new Error());
    const value = repo.by_id({ user_id: 'id' });
    await expect(value).rejects.toThrow(new QueryError().message);
  });
});
