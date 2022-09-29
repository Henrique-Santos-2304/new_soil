import request from 'supertest-graphql';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { graphqlModule, PrismaModule, UserModule } from '@root/core';
import {
  IFindUserRepo,
  IGetAllUserService,
  IGetUserController,
} from '@root/domain';
import { PrismaService } from '@root/infra';
import { prismaTest } from '@testRoot/setup';
import { gql } from 'apollo-server-express';
import { getTokenMocked } from '@testRoot/mocks/get-token';

describe('Create User', () => {
  let app: INestApplication;
  let controller: IGetUserController;
  let service: IGetAllUserService;
  let findUserRepo: IFindUserRepo;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, graphqlModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaTest)
      .compile();

    app = moduleRef.createNestApplication();

    service = moduleRef.get('ICreateUserService');
    controller = moduleRef.get('ICreateUserController');
    findUserRepo = moduleRef.get('IFindUserRepo');

    await app.init();

    token = await getTokenMocked(app);
  });

  afterEach(async () => {
    await prismaTest.user.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.user.deleteMany();
    await app.close();
  });

  it('should be defined this respective providers of service', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
  });

  it('should be "{ error}" if received params into query', async () => {
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
    console.log(errors[0]);
    expect(errors[0]).toHaveProperty('message');
  });

  it('should be return users if query sucess', async () => {
    await prismaTest.user.create({
      data: {
        login: 'soilTest',
        password: 'password',
        user_id: 'soilTest',
        userType: 'MASTER',
      },
    });
    const { data }: any = await request(app.getHttpServer()).set(
      'authorization',
      `Bearer ${token}`,
    ).query(gql`
      query getUsers {
        getUsers {
          status
          error
          users {
            user_id
          }
        }
      }
    `);

    expect(data.getUsers).toHaveProperty('status', 'Sucess');
    expect(data.getUsers).toHaveProperty('users');
    expect(data.getUsers.users).toHaveLength(1);
  });

  it('should be return list empty if not exists users', async () => {
    await prismaTest.user.deleteMany();

    const { data }: any = await request(app.getHttpServer()).set(
      'authorization',
      `Bearer ${token}`,
    ).query(gql`
      query getUsers {
        getUsers {
          status
          error
          users {
            user_id
          }
        }
      }
    `);

    expect(data.getUsers).toHaveProperty('status', 'Sucess');
    expect(data.getUsers).toHaveProperty('users');
    expect(data.getUsers.users).toHaveLength(0);
  });
});
