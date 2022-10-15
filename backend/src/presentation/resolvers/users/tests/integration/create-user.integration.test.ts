import { INestApplication } from '@nestjs/common';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import {
  ICreateUserController,
  ICreateUserRepo,
  ICreateUserService,
  IEncrypterData,
  IFindUserRepo,
} from '@root/domain';
import { createUserMocked } from '@testRoot/mocks';
import { integrationTestManager, prismaTest } from '@testRoot/setup';

describe('Create User Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
  });

  it('should be defined this respective providers of service', async () => {
    const createUserController = await app.resolve<ICreateUserController>(
      'ICreateUserController',
    );
    const createUserService = await app.resolve<ICreateUserService>(
      'ICreateUserService',
    );
    const encrypterData = await app.resolve<IEncrypterData>('IEncrypterData');

    const findUserRepo = await app.resolve<IFindUserRepo>('IFindUserRepo');
    const createUserRepo = await app.resolve<ICreateUserRepo>(
      'ICreateUserRepo',
    );

    expect(createUserController).toBeDefined();
    expect(createUserService).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(createUserRepo).toBeDefined();
    expect(encrypterData).toBeDefined();
  });

  it('should be "{status: Fail}" if received password type inválid', async () => {
    const { errors } = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: 1234
            userType: MASTER
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
            userType: MASTER
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
            userType: MASTER
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
            userType: "MASTER"
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

  it('should be "{status: Fail}" if internal_password is not valid', async () => {
    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: MASTER
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
            userType: MASTER
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
    await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: MASTER
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

    expect(user.password).not.toEqual('password');
  });

  it('should be a {status: Sucess} with all data válids', async () => {
    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil_tech_test"
            password: "password"
            userType: MASTER
            internal_password: "@Inatel123"
          }
        ) {
          status
          error
        }
      }
    `);
    console.log(data.createUser);
    expect(data.createUser).toHaveProperty('status', 'Sucess');
  });

  it('should to have a new User in database', async () => {
    await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
            password: "password"
            userType: MASTER
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
    expect(user).toHaveProperty('userType', 'MASTER');
  });
});
