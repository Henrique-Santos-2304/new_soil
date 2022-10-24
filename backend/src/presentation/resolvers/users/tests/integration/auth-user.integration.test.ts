import { INestApplication, UnauthorizedException } from '@nestjs/common';
import request from 'supertest-graphql';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import { authUserRequestMocked } from '@testRoot/mocks';
import {
  IAuthUserController,
  IAuthUserService,
  IEncrypterData,
  IFindUserRepo,
  ITokenService,
} from '@root/domain';
import {
  mutationAuthUser,
  mutationCreateUser,
} from '@testRoot/mocks/gql/users';

describe('Auth User Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
  });

  it('should be defined this respective providers of service', async () => {
    const service = await app.resolve<IAuthUserService>('IAuthUserService');
    const controller = await app.resolve<IAuthUserController>(
      'IAuthUserController',
    );
    const findUserRepo = await app.resolve<IFindUserRepo>('IFindUserRepo');
    const encrypter = await app.resolve<IEncrypterData>('IEncrypterData');
    const tokenService = await app.resolve<ITokenService>('ITokenService');

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(tokenService).toBeDefined();
    expect(encrypter).toBeDefined();
  });

  it('should be "{status: Fail}" if received password type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .mutate(mutationAuthUser)
      .variables({ authUser: { ...authUserRequestMocked, password: 123 } });
    console.log(errors[0]);

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$authUser" got invalid value 123 at "authUser.password"; String cannot represent a non string value: 123',
    );
  });

  it('should be "{status: Fail}" if received login type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .mutate(mutationAuthUser)
      .variables({ authUser: { ...authUserRequestMocked, login: 123 } });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$authUser" got invalid value 123 at "authUser.login"; String cannot represent a non string value: 123',
    );
  });

  it('should be "{status: Fail}" if this user not exists in db', async () => {
    const { data }: any = await request(app.getHttpServer())
      .mutate(mutationAuthUser)
      .variables({
        authUser: { ...authUserRequestMocked, login: 'soil_not_exist' },
      });

    expect(data.authUser).toHaveProperty('status', 'Fail');
    expect(data.authUser).toHaveProperty(
      'error',
      new UnauthorizedException().message,
    );
  });

  it('should be "{status: Fail}" if password is not correct', async () => {
    await prismaTest.user.create({
      data: { login: 'soil_unit_test', password: '1234', userType: 'MASTER' },
    });

    const { data }: any = await request(app.getHttpServer())
      .mutate(mutationAuthUser)
      .variables({
        authUser: { login: 'soil_unit_test', password: 'password_invalid' },
      });

    expect(data.authUser).toHaveProperty('status', 'Fail');
    expect(data.authUser).toHaveProperty(
      'error',
      new UnauthorizedException().message,
    );

    const user = await prismaTest.user.findFirst({
      where: { login: 'soil_unit_test' },
    });

    if (user)
      await prismaTest.user.delete({ where: { user_id: user.user_id } });
  });

  it('should be a {status: Sucess, token} with all data válids', async () => {
    await request(app.getHttpServer())
      .mutate(mutationCreateUser)
      .variables({
        user: {
          ...authUserRequestMocked,
          userType: 'MASTER',
          internal_password: '@Inatel123',
        },
      });

    const { data }: any = await request(app.getHttpServer())
      .mutate(mutationAuthUser)
      .variables({
        authUser: { ...authUserRequestMocked },
      });

    expect(data.authUser).toHaveProperty('status', 'Sucess');
    expect(data.authUser).toHaveProperty('token');
    expect(data.authUser).toHaveProperty('error', null);
  });
});
