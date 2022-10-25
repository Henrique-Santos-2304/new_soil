import request from 'supertest-graphql';
import { INestApplication } from '@nestjs/common';
import {
  IFindFarmsRepo,
  IFindUserRepo,
  IGetAllFarmsByUserService,
  IGetFarmsController,
} from '@root/domain';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import { gql } from 'apollo-server-express';
import { createFarmStub } from '@testRoot/stub';
import { queryFindFarmsByUser } from '@testRoot/mocks/gql';
import { createFarmMocked, createUserMocked } from '@testRoot/index';

describe('Get All Users Integration', () => {
  let app: INestApplication;

  let token: string;
  let user_id: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();

    token = (await integrationTestManager.authUser()).token;
    user_id = (await integrationTestManager.getUserId()).user_id;
  });

  it('should be defined this respective providers of service', async () => {
    const service = await app.resolve<IGetAllFarmsByUserService>(
      'IGetAllFarmsByUserService',
    );
    const controller = await app.resolve<IGetFarmsController>(
      'IGetFarmsController',
    );
    const findUserRepo = await app.resolve<IFindUserRepo>('IFindUserRepo');
    const findFarmRepo = await app.resolve<IFindFarmsRepo>('IFindFarmsRepo');

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('should be "{ error}" if received user_id type not expected', async () => {
    const { errors } = await request(app.getHttpServer()).query(gql`
      query GET_ALL_FARMS {
        getFarmByUser(data: { user_id: 3333 }) {
          status
          error
          farms {
            farm_id
          }
        }
      }
    `);
    expect(errors[0]).toHaveProperty(
      'message',
      'String cannot represent a non string value: 3333',
    );
  });

  it('should be "{ error}" if received token invalid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer error`)
      .query(queryFindFarmsByUser)
      .variables({ dataId: { user_id: 'not exists' } });

    expect(errors[0]).toHaveProperty('message', 'Unauthorized');
  });

  it('should be return an error User not Found ', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queryFindFarmsByUser)
      .variables({ dataId: { user_id: 'not exists' } });

    expect(data.getFarmByUser).toHaveProperty('status', 'Fail');
    expect(data.getFarmByUser).toHaveProperty('error', 'User Not Found');
    expect(data.getFarmByUser).toHaveProperty('farms', null);
  });

  it('should be return list empty if not exists farms', async () => {
    await prismaTest.farm.deleteMany();

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queryFindFarmsByUser)
      .variables({ dataId: { user_id } });

    await createFarmStub(app);
    expect(data.getFarmByUser).toHaveProperty('status', 'Sucess');
    expect(data.getFarmByUser.farms).toHaveLength(0);
  });

  it('should be return all farms of user master', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queryFindFarmsByUser)
      .variables({ dataId: { user_id } });

    expect(data.getFarmByUser).toHaveProperty('status', 'Sucess');
    expect(data.getFarmByUser.farms).toHaveLength(1);
  });
  it('should be return farms of user dealer', async () => {
    const newUser = await prismaTest.user.create({
      data: { ...createUserMocked, userType: 'DEALER', login: 'user_delaer' },
    });

    await prismaTest.farm.create({
      data: {
        ...createFarmMocked,
        farm_id: 'farm_user_delaer',
        owner_id: newUser.user_id,
        created_by: user_id,
        dealers: [newUser.user_id],
      },
    });

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queryFindFarmsByUser)
      .variables({ dataId: { user_id: newUser.user_id } });

    await prismaTest.farm.delete({ where: { farm_id: 'farm_user_delaer' } });
    await prismaTest.user.delete({ where: { user_id: newUser.user_id } });

    expect(data.getFarmByUser).toHaveProperty('status', 'Sucess');
    expect(data.getFarmByUser.farms).toHaveLength(1);
    expect(data.getFarmByUser.farms[0].dealers).toHaveLength(1);
    expect(data.getFarmByUser.farms[0].dealers[0]).toBe(newUser.user_id);
  });

  it('should be return farms of user admins', async () => {
    const newUser = await prismaTest.user.create({
      data: { ...createUserMocked, userType: 'ADMIN', login: 'user_admin' },
    });

    await prismaTest.farm.create({
      data: {
        ...createFarmMocked,
        farm_id: 'farm_user_admin',
        owner_id: newUser.user_id,
        created_by: user_id,
        admins: [newUser.user_id],
      },
    });

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queryFindFarmsByUser)
      .variables({ dataId: { user_id: newUser.user_id } });

    await prismaTest.farm.delete({ where: { farm_id: 'farm_user_admin' } });
    await prismaTest.user.delete({ where: { user_id: newUser.user_id } });

    expect(data.getFarmByUser).toHaveProperty('status', 'Sucess');
    expect(data.getFarmByUser.farms).toHaveLength(1);
    expect(data.getFarmByUser.farms[0].admins).toHaveLength(1);
    expect(data.getFarmByUser.farms[0].admins[0]).toBe(newUser.user_id);
  });

  it('should be return farms of user users', async () => {
    const newUser = await prismaTest.user.create({
      data: { ...createUserMocked, userType: 'USER', login: 'user_user' },
    });

    await prismaTest.farm.create({
      data: {
        ...createFarmMocked,
        farm_id: 'farm_user_user',
        owner_id: newUser.user_id,
        created_by: user_id,
        users: [newUser.user_id],
      },
    });

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queryFindFarmsByUser)
      .variables({ dataId: { user_id: newUser.user_id } });

    await prismaTest.farm.delete({ where: { farm_id: 'farm_user_user' } });
    await prismaTest.user.delete({ where: { user_id: newUser.user_id } });

    expect(data.getFarmByUser).toHaveProperty('status', 'Sucess');
    expect(data.getFarmByUser.farms).toHaveLength(1);
    expect(data.getFarmByUser.farms[0].users).toHaveLength(1);
    expect(data.getFarmByUser.farms[0].users[0]).toBe(newUser.user_id);
  });
});
