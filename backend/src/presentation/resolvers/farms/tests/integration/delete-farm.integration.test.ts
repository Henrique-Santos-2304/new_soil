import { INestApplication } from '@nestjs/common';
import request from 'supertest-graphql';
import { mutationDelFarm } from '@testRoot/mocks/gql/farms';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import {
  IDeleteFarmController,
  IDeleteFarmRepo,
  IDeleteFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
} from '@contracts/index';
import { createFarmMocked, createUserMocked } from '@testRoot/mocks';
import {
  FARM_CONTROLLER,
  FARM_REPO,
  FARM_SERVICE,
  USER_REPO,
} from '@root/shared';

describe('Create Farm Integration', () => {
  let app: INestApplication;
  let token: string;
  let user_id: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
    token = (await integrationTestManager.authUser()).token;

    user_id = (await integrationTestManager.getUserId()).user_id;
  });

  it('should be defined this respective providers of service', async () => {
    const service = await app.resolve<IDeleteFarmService>(FARM_SERVICE.DELETE);
    const controller = await app.resolve<IDeleteFarmController>(
      FARM_CONTROLLER.DELETE,
    );
    const findUserRepo = await app.resolve<IFindUserRepo>(USER_REPO.FIND);
    const findFarmRepo = await app.resolve<IFindFarmsRepo>(FARM_REPO.FIND);
    const delFarmRepo = await app.resolve<IDeleteFarmRepo>(FARM_REPO.DELETE);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(delFarmRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('should be graphql type errors if received userType type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'INVALID', user_id: user_id } });

    console.log(errors);
    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$data" got invalid value "INVALID" at "data.userType"; Value "INVALID" does not exist in "UserType" enum.',
    );
  });

  it('should be graphql type errors if received user_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', user_id: 33 } });

    console.log(errors[0]);
    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$data" got invalid value 33 at "data.user_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received farm_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', farm_id: 33 } });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$data" got invalid value 33 at "data.farm_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be error if not received user_id and farm_id', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER' } });

    expect(data.delFarm).toHaveProperty(
      'error',
      'user_id and farm_id not available, please set one form query',
    );
  });

  it('should be unauthorized if userType equals USER ', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'USER', user_id: 'soil' } });

    expect(data.delFarm).toHaveProperty('error', 'Unauthorized');
  });

  it('should be unauthorized if userType equals ADMIN ', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'ADMIN', user_id: 'soil' } });

    expect(data.delFarm).toHaveProperty('error', 'Unauthorized');
  });

  it('should be user not found ', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', user_id: 'soil' } });

    expect(data.delFarm).toHaveProperty('error', 'User Not Found');
  });

  it('should be farm not found ', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', farm_id: 'soil' } });

    expect(data.delFarm).toHaveProperty('error', 'Farm Not Found');
  });

  it('should be status sucess if delete farm', async () => {
    const newUser = await prismaTest.user.create({
      data: { ...createUserMocked, userType: 'ADMIN', login: 'users' },
    });

    await prismaTest.farm.create({
      data: {
        ...createFarmMocked,
        farm_id: 'test_del',
        owner_id: newUser.user_id,
        created_by: user_id,
        admins: [newUser.user_id],
      },
    });

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', farm_id: 'test_del' } });

    expect(data.delFarm).toHaveProperty('status', 'Sucess');
  });

  it('should not a have a farm after delete action', async () => {
    const newUser = await prismaTest.user.create({
      data: { ...createUserMocked, userType: 'ADMIN', login: 'users' },
    });

    const farm = await prismaTest.farm.create({
      data: {
        ...createFarmMocked,
        farm_id: 'test_del',
        owner_id: newUser.user_id,
        created_by: user_id,
        admins: [newUser.user_id],
      },
    });

    expect(farm).toHaveProperty('farm_id', 'test_del');

    await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', farm_id: 'test_del' } });

    const checkFarm = await prismaTest.farm.findFirst({
      where: { farm_id: 'test_del' },
    });

    expect(checkFarm).toBeNull();
  });

  it('should be status sucess if delete farms of user', async () => {
    const newUser = await prismaTest.user.create({
      data: { ...createUserMocked, userType: 'ADMIN', login: 'users' },
    });

    for (let x = 0; x < 3; x++) {
      await prismaTest.farm.create({
        data: {
          ...createFarmMocked,
          farm_id: `'test_del-${x}'`,
          farm_name: `test-name-${x}`,
          owner_id: newUser.user_id,
          created_by: user_id,
          admins: [newUser.user_id],
        },
      });
    }

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', user_id: newUser.user_id } });

    expect(data.delFarm).toHaveProperty('status', 'Sucess');
  });

  it('should be not a have a farm after delete action', async () => {
    const newUser = await prismaTest.user.create({
      data: { ...createUserMocked, userType: 'ADMIN', login: 'users' },
    });

    for (let x = 0; x < 3; x++) {
      await prismaTest.farm.create({
        data: {
          ...createFarmMocked,
          farm_id: `'test_del-${x}'`,
          farm_name: `test-name-${x}`,
          owner_id: newUser.user_id,
          created_by: user_id,
          admins: [newUser.user_id],
        },
      });
    }

    const farms = await prismaTest.farm.findMany({
      where: { owner_id: newUser.user_id },
    });

    expect(farms).toHaveLength(3);

    await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationDelFarm)
      .variables({ data: { userType: 'MASTER', user_id: newUser.user_id } });

    const farmsDel = await prismaTest.farm.findMany({
      where: { owner_id: newUser.user_id },
    });

    expect(farmsDel).toHaveLength(0);
  });
});
