import request from 'supertest-graphql';
import { INestApplication } from '@nestjs/common';
import {
  IFindAllAuthorizeService,
  IFindAuthorizeRepo,
  IGetAuthorizationsController,
} from '@root/domain';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import { gql } from 'apollo-server-express';
import { queriesFindAuthorization } from '@testRoot/mocks/gql';
import { getUserMasterId } from '@testRoot/index';
import {
  AUTHORIZE_CONTROLLER,
  AUTHORIZE_REPO,
  AUTHORIZE_SERVICE,
} from '@root/shared';

describe('Get All Authorizations Integration', () => {
  let app: INestApplication;

  let token: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();

    token = (await integrationTestManager.authUser()).token;
  });

  it('should be defined this respective providers of service', async () => {
    const service = await app.resolve<IFindAllAuthorizeService>(
      AUTHORIZE_SERVICE.FIND,
    );
    const controller = await app.resolve<IGetAuthorizationsController>(
      AUTHORIZE_CONTROLLER.FIND,
    );
    const findAuthorizeRepo = await app.resolve<IFindAuthorizeRepo>(
      AUTHORIZE_REPO.FIND,
    );

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findAuthorizeRepo).toBeDefined();
  });

  it('should be "{ error}" if received params into query', async () => {
    const { errors } = await request(app.getHttpServer()).query(gql`
      query GET_ALL_AUTHORIZATIONS {
        getAuthorizations(data: "test_error") {
          status
          error
          authorize
        }
      }
    `);
    expect(errors[0]).toHaveProperty(
      'message',
      'Unknown argument "data" on field "Query.getAuthorizations".',
    );
  });

  it('should be return authorizations if query sucess', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queriesFindAuthorization);

    expect(data.getAuthorizations).toHaveProperty('status', 'Sucess');
    expect(data.getAuthorizations).toHaveProperty('authorize');
    expect(data.getAuthorizations.authorize).toHaveLength(0);
  });

  it('should be return list empty if not exists users', async () => {
    await prismaTest.authorize.create({
      data: {
        farm_id: 'test',
        created_by: await getUserMasterId(),
      },
    });
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .query(queriesFindAuthorization);

    await prismaTest.authorize.deleteMany();

    expect(data.getAuthorizations).toHaveProperty('status', 'Sucess');
    expect(data.getAuthorizations).toHaveProperty('authorize');
    expect(data.getAuthorizations.authorize).toHaveLength(1);

    expect(data.getAuthorizations.authorize[0]).toHaveProperty('authorize_id');
    expect(data.getAuthorizations.authorize[0]).toHaveProperty('farm_id');
    expect(data.getAuthorizations.authorize[0]).toHaveProperty('created_by');
  });
});
