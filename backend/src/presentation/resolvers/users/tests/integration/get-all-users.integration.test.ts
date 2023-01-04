import request from 'supertest-graphql';
import { INestApplication } from '@nestjs/common';
import {
  IFindUserRepo,
  IGetAllUserService,
  IGetUserByIdService,
  IGetUserController,
} from '@root/domain';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import { gql } from 'apollo-server-express';
import { createUserStub } from '@testRoot/stub';
import { mutationGetAllUsers } from '@testRoot/mocks/gql/users';
import { USER_CONTROLLER, USER_REPO, USER_SERVICE } from '@root/shared';

describe('Get All Users Integration', () => {
  let app: INestApplication;

  let token: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();

    token = (await integrationTestManager.authUser()).token;
  });

  it('---GET_ALL--- should be defined this respective providers of service', async () => {
    const service = await app.resolve<IGetAllUserService>(USER_SERVICE.GET_ALL);
    const controller = await app.resolve<IGetUserController>(
      USER_CONTROLLER.GET,
    );
    const findUserRepo = await app.resolve<IFindUserRepo>(USER_REPO.FIND);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
  });

  it('---GET_ALL--- should be "{ error}" if received params into query', async () => {
    const { errors } = await request(app.getHttpServer()).query(gql`
      query GET_ALL_USERS {
        getUsers(data: "login") {
          status
          error
          users {
            user_id
          }
        }
      }
    `);
    expect(errors[0]).toHaveProperty(
      'message',
      'Unknown argument "data" on field "Query.getUsers".',
    );
  });

  it('---GET_ALL--- should be return users if query sucess', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(mutationGetAllUsers);

    expect(data.getUsers).toHaveProperty('status', 'Sucess');
    expect(data.getUsers).toHaveProperty('users');
    expect(data.getUsers.users).toHaveLength(2);
  });

  it('---GET_ALL--- should be return list empty if not exists users', async () => {
    await prismaTest.user.deleteMany();

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(mutationGetAllUsers);

    expect(data.getUsers).toHaveProperty('status', 'Sucess');
    expect(data.getUsers).toHaveProperty('users');
    expect(data.getUsers.users).toHaveLength(0);

    await createUserStub(app);
  });
});
