import { INestApplication } from '@nestjs/common';
import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { Test } from '@nestjs/testing';
import { graphqlModule, PrismaModule, UserModule } from '@root/core';
import {
  IAuthUserController,
  IAuthUserService,
  IEncrypterData,
  IFindUserRepo,
  ITokenService,
} from '@root/domain';
import { PrismaService } from '@root/infra';
import { prismaTest } from '@testRoot/setup';

describe('Auth User Integration', () => {
  let app: INestApplication;
  let controller: IAuthUserController;
  let service: IAuthUserService;
  let findUserRepo: IFindUserRepo;
  let encrypter: IEncrypterData;
  let token: ITokenService;

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
    encrypter = moduleRef.get('IEncrypterData');
    token = moduleRef.get('ITokenService');

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
    expect(token).toBeDefined();
    expect(encrypter).toBeDefined();
  });

  it('should be "{status: Fail}" if received password type inválid', async () => {
    const { errors } = await request(app.getHttpServer()).mutate(gql`
      mutation AUTH_USER {
        authUser(data: { login: "soils", password: 1234 }) {
          status
          error
          token
        }
      }
    `);

    expect(errors[0]).toHaveProperty('message');
  });

  it('should be "{status: Fail}" if received login type inválid', async () => {
    const { errors } = await request(app.getHttpServer()).mutate(gql`
      mutation AUTH_USER {
        authUser(data: { login: 1234, password: "1234" }) {
          status
          error
          token
        }
      }
    `);

    expect(errors[0]).toHaveProperty('message');
  });

  it('should be "{status: Fail}" if this user not exists in db', async () => {
    await prismaTest.user.deleteMany();
    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        authUser(data: { login: "soil", password: "1234" }) {
          status
          error
          token
        }
      }
    `);

    expect(data.authUser).toHaveProperty('status', 'Fail');
    expect(data.authUser).toHaveProperty('error', 'Invalid Credentials');
  });

  it('should be "{status: Fail}" if password is not correct', async () => {
    await prismaTest.user.create({
      data: { login: 'soil', password: '1234', userType: 'SUDO' },
    });
    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        authUser(data: { login: "soil", password: "123" }) {
          status
          error
          token
        }
      }
    `);

    expect(data.authUser).toHaveProperty('status', 'Fail');
    expect(data.authUser).toHaveProperty('error', 'Invalid Credentials');
  });

  it('should be a {status: Sucess, token} with all data válids', async () => {
    await prismaTest.user.deleteMany();
    await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        createUser(
          data: {
            login: "soil"
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

    const { data }: any = await request(app.getHttpServer()).mutate(gql`
      mutation CREATE_USER {
        authUser(data: { login: "soil", password: "1234" }) {
          status
          error
          token
        }
      }
    `);

    expect(data.authUser).toHaveProperty('status', 'Sucess');
    expect(data.authUser).toHaveProperty('token');
    expect(data.authUser).toHaveProperty('error', null);
  });
});
