import { Test, TestingModule } from '@nestjs/testing';
import { IUpdateFarmRepo } from '@contracts/index';
import { DatabaseError, QueryError } from '@utils/errors';
import {
  createFarmMocked,
  loggerMock,
  loggerMockProvider,
  prismaProviderMock,
  prismaServiceMock,
  updateFarmMock,
} from '@testRoot/mocks';
import { UpdateFarmRepo } from '../update-farm.repo';

describe('Update Farm Repo Unit', () => {
  let repo: IUpdateFarmRepo;

  const callUpdated = {
    farm_id: 'id',
    farm: {
      ...updateFarmMock,
      farm_name: 'att_farm',
      updated_by: 'id',
    },
  };

  const callAddUser = {
    farm_id: 'id',
    data: { users: ['user1'] },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateFarmRepo, prismaProviderMock, loggerMockProvider],
    }).compile();

    repo = module.get<IUpdateFarmRepo>(UpdateFarmRepo);

    prismaServiceMock.farm.update.mockReturnValue({
      farm_id: createFarmMocked.farm_id,
    });
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(prismaServiceMock).toBeDefined();

    expect(loggerMock).toBeDefined();
  });

  //tests update farm repo

  it('(put farm) should repo.update to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'put');
    await repo.put(callUpdated);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callUpdated);
  });

  it('(put farm) should prisma.user.update to have been called with data válids', async () => {
    await repo.put(callUpdated);

    expect(prismaServiceMock.farm.update).toHaveBeenCalled();
    expect(prismaServiceMock.farm.update).toHaveBeenCalledTimes(1);
    expect(prismaServiceMock.farm.update).toHaveBeenCalledWith({
      data: { ...callUpdated.farm },
      where: { farm_id: callUpdated.farm_id },
      select: { farm_id: true },
    });
  });

  it('(put farm) should to return a farm Created with action not ocurred an error', async () => {
    const value = await repo.put(callUpdated);

    expect(value).toHaveProperty('farm_id');
  });

  it('(put farm) should to throw "QUERY ERROR" when database return erro', async () => {
    prismaServiceMock.farm.update.mockRejectedValueOnce(new Error());

    const value = repo.put({
      ...callUpdated,
      farm: { ...callUpdated.farm, farm_name: 'att_farm' },
    });

    await expect(value).rejects.toThrow(new QueryError());
  });

  it('(put farm) should log an erro when database return error', async () => {
    prismaServiceMock.farm.update.mockRejectedValueOnce(new DatabaseError());

    const response = repo.put(callUpdated);

    // method log
    await expect(response).rejects.toThrow();
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao atualizar fazenda no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });

  // tests add user into farm repo

  it('(add user) should repo.update to have been called with data válids', async () => {
    const spy = jest.spyOn(repo, 'addOrDeleteUser');
    await repo.addOrDeleteUser(callAddUser);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callAddUser);
  });

  it('(add user) should prisma.user.update to have been called with data válids', async () => {
    await repo.addOrDeleteUser(callAddUser);

    expect(prismaServiceMock.farm.update).toHaveBeenCalled();
    expect(prismaServiceMock.farm.update).toHaveBeenCalledTimes(1);
    expect(prismaServiceMock.farm.update).toHaveBeenCalledWith({
      data: { ...callAddUser.data },
      where: { farm_id: callAddUser.farm_id },
      select: { farm_id: true },
    });
  });

  it('(add user) should to return a farm Created with action not ocurred an error', async () => {
    const value = await repo.addOrDeleteUser(callAddUser);

    expect(value).toHaveProperty('farm_id');
  });

  it('(add user) should to throw "QUERY ERROR" when database return erro', async () => {
    prismaServiceMock.farm.update.mockRejectedValueOnce(new Error());

    const value = repo.addOrDeleteUser(callAddUser);

    await expect(value).rejects.toThrow(new QueryError());
  });

  it('(add user) should log an erro when database return error', async () => {
    prismaServiceMock.farm.update.mockRejectedValueOnce(new DatabaseError());

    const response = repo.addOrDeleteUser(callAddUser);

    // method log
    await expect(response).rejects.toThrow();
    expect(loggerMock.log).toHaveBeenCalledTimes(1);
    expect(loggerMock.log).toHaveBeenCalledWith(
      'Erro ao adicionar novo usuario na fazenda no banco de dados...',
    );

    //method error
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(new DatabaseError().message);
  });
});
