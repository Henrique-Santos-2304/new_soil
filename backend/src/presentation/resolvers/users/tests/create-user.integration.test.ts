import { INestApplication, Logger } from '@nestjs/common';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { Test } from '@nestjs/testing';
import { graphqlModule, PrismaModule, UserModule } from '@root/core';
import {
  ICreateUserController,
  ICreateUserRepo,
  ICreateUserService,
  IEncrypterData,
  IFindUserRepo,
} from '@root/domain';
import { PrismaService } from '@root/infra';
import { createUserMocked } from '@testRoot/mocks';
import { prismaTest } from '@testRoot/setup';

describe('Create User', () => {
  let app: INestApplication;
  let controller: ICreateUserController;
  let service: ICreateUserService;
  let findUserRepo: IFindUserRepo;
  let createUserRepo: ICreateUserRepo;
  let encrypter: IEncrypterData;

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
    createUserRepo = moduleRef.get('ICreateUserRepo');
    encrypter = moduleRef.get('IEncrypterData');

    await app.init();
  });

  afterEach(async () => {
    await prismaTest.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined this respective providers of service', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(createUserRepo).toBeDefined();
    expect(encrypter).toBeDefined();
  });

  it('should be "{status: Fail}" if received password type inválid', async () => {
    const { errors } = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: 1234
            userType: SUDO
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);

    expect(errors[0]).toHaveProperty('message');
  });

  it('should be "{status: Fail}" if received internal_password type inválid', async () => {
    const { errors } = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: 1234
            userType: SUDO
            internal_password: 123
          }
        ) {
          status
          error
        }
      }
    `);

    expect(errors[0]).toHaveProperty('message');
  });

  it('should be "{status: Fail}" if received login type inválid', async () => {
    const { errors } = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: 123
            password: "1234"
            userType: SUDO
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);

    expect(errors[0]).toHaveProperty('message');
  });

  it('should be "{status: Fail}" if received userType type inválid', async () => {
    const { errors } = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: "SUDO"
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);

    console.log(errors[0]);
    expect(errors[0]).toHaveProperty('message');
  });

  it('should be "{status: Fail}" if internal_password is not valid', async () => {
    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: SUDO
            internal_password: "@soil123"
          }
        ) {
          status
          error
        }
      }
    `);

    expect(data.createUser).toHaveProperty('status', 'Fail');
    expect(data.createUser).toHaveProperty('error', 'Invalid Credentials');
  });
  it('should be "{status: Fail}" if this user already exist in db', async () => {
    await prismaTest.user.create({
      data: createUserMocked,
    });

    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: SUDO
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);

    expect(data.createUser).toHaveProperty('status', 'Fail');
    expect(data.createUser).toHaveProperty('error', 'User already exists');
  });

  it('should be user to have been created with password encrypted', async () => {
    jest.spyOn(encrypter, 'encrypt').mockResolvedValueOnce('passwod_encrypted');

    await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: SUDO
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);

    const user = await prismaTest.user.findFirst({
      where: { login: 'soil' },
    });

    expect(user.password).toEqual('passwod_encrypted');
  });

  it('should be a {status: Sucess} with all data válids', async () => {
    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: SUDO
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);

    expect(data.createUser).toHaveProperty('status', 'Sucess');
  });

  it('should to have a new User in database', async () => {
    await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: SUDO
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);

    const user = await prismaTest.user.findFirst({
      where: { login: 'soil' },
    });

    expect(user).toHaveProperty('user_id');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('login', 'soil');
    expect(user).toHaveProperty('userType', 'SUDO');
  });
});
