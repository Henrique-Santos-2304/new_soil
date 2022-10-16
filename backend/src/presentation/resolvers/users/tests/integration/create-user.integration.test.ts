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

import { createUserMocked, createUserRequestMocked } from '@testRoot/mocks';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import { mutationCreateUser } from '@testRoot/mocks/gql/users';

describe('Create User Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
  });

  afterEach(async () => {
    const user = await prismaTest.user.findFirst({
      where: { login: createUserRequestMocked.login },
    });

    if (user)
      await prismaTest.user.delete({ where: { user_id: user.user_id } });
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
    const { errors } = await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked, password: 123 },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$user" got invalid value 123 at "user.password"; String cannot represent a non string value: 123',
    );
  });

  it('should be "{status: Fail}" if received internal_password type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked, internal_password: 123 },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$user" got invalid value 123 at "user.internal_password"; String cannot represent a non string value: 123',
    );
  });

  it('should be "{status: Fail}" if received login type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked, login: 123 },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$user" got invalid value 123 at "user.login"; String cannot represent a non string value: 123',
    );
  });

  it('should be "{status: Fail}" if received userType type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked, userType: 123 },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$user" got invalid value 123 at "user.userType"; Enum "UserType" cannot represent non-string value: 123.',
    );
  });

  it('should be "{status: Fail}" if internal_password is not valid', async () => {
    const { data }: any = await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked, internal_password: '123' },
      });

    expect(data.createUser).toHaveProperty('status', 'Fail');
    expect(data.createUser).toHaveProperty('error', 'Invalid Credentials');
  });

  it('should be "{status: Fail}" if this user already exist in db', async () => {
    await prismaTest.user.create({
      data: createUserMocked,
    });

    const { data }: any = await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked },
      });

    expect(data.createUser).toHaveProperty('status', 'Fail');
    expect(data.createUser).toHaveProperty('error', 'User already exists');
  });

  it('should be user to have been created with password encrypted', async () => {
    await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked },
      });

    const user = await prismaTest.user.findFirst({
      where: { login: createUserRequestMocked.login },
    });

    expect(user.password).not.toEqual('password');
  });

  it('should be a {status: Sucess} with all data válids', async () => {
    const { data }: any = await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: { ...createUserRequestMocked },
      });
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
