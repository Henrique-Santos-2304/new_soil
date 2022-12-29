import { INestApplication, UnauthorizedException } from '@nestjs/common';
import request from 'supertest-graphql';
import { mutationCreateFarm } from '@testRoot/mocks/gql/farms';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import {
  ICreateFarmController,
  ICreateFarmRepo,
  ICreateFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
} from '@contracts/index';
import {
  createFarmMocked,
  getUserAdminId,
  getUserMasterId,
} from '@testRoot/mocks';
import { AlreadyExistsError, NotFoundError } from '@root/shared/errors';
import {
  FARM_CONTROLLER,
  FARM_REPO,
  FARM_SERVICE,
  USER_REPO,
} from '@root/shared';

describe('Create Farm Integration', () => {
  let app: INestApplication;
  let token: string;
  let masterId: string;
  let adminId: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
    token = (await integrationTestManager.authUser()).token;

    masterId = await getUserMasterId();
    adminId = await getUserAdminId();
  });

  it('should be defined this respective providers of service', async () => {
    const service = await app.resolve<ICreateFarmService>(FARM_SERVICE.CREATE);
    const controller = await app.resolve<ICreateFarmController>(
      FARM_CONTROLLER.CREATE,
    );
    const findUserRepo = await app.resolve<IFindUserRepo>(USER_REPO.FIND);
    const findFarmRepo = await app.resolve<IFindFarmsRepo>(FARM_REPO.FIND);
    const createFarmRepo = await app.resolve<ICreateFarmRepo>(FARM_REPO.CREATE);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(createFarmRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('should be graphql type errors if received farm_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({ createFarm: { ...createFarmMocked, farm_id: 33 } });

    expect(errors[0]).toHaveProperty('message');
  });

  it('should be graphql type errors if received farm_name type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({ createFarm: { ...createFarmMocked, farm_name: 33 } });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$createFarm" got invalid value 33 at "createFarm.farm_name"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received farm_city type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({ createFarm: { ...createFarmMocked, farm_city: 33 } });

    expect(errors[0]).toHaveProperty('message');
  });

  it('should be graphql type errors if received farm_lat type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({ createFarm: { ...createFarmMocked, farm_lat: 'string' } });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$createFarm" got invalid value "string" at "createFarm.farm_lat"; Float cannot represent non numeric value: "string"',
    );
  });

  it('should be graphql type errors if received farm_lng type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({ createFarm: { ...createFarmMocked, farm_lng: 'string' } });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$createFarm" got invalid value "string" at "createFarm.farm_lng"; Float cannot represent non numeric value: "string"',
    );
  });

  it('should be graphql type errors if received owner_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({ createFarm: { ...createFarmMocked, owner_id: 33 } });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$createFarm" got invalid value 33 at "createFarm.owner_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors  if received created_by type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({ createFarm: { ...createFarmMocked, created_by: 33 } });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$createFarm" got invalid value 33 at "createFarm.created_by"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors  if received admins type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          admins: [33, 66],
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$createFarm" got invalid value 33 at "createFarm.admins[0]"; String cannot represent a non string value: 33',
    );
  });

  it('should be to throw farm already exists', async () => {
    await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: masterId,
          admins: [adminId],
        },
      });

    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: masterId,
          admins: [adminId],
        },
      });
    await prismaTest.farm.delete({
      where: { farm_id: createFarmMocked.farm_id },
    });
    expect(data.createFarm).toHaveProperty('status', 'Fail');
    expect(data.createFarm).toHaveProperty(
      'error',
      new AlreadyExistsError('Farm').message,
    );
  });

  it('given the error "User not found type OWNER" if not exists an user with user_id received', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: 'd4ec9d57-3bd1-4015-bb72-d1786b16a6f9',
          created_by: '0a84a14b-52ca-415c-afdd-d69ae8488e87',
          admins: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6f9'],
        },
      })
      .expectNoErrors();

    expect(data.createFarm).toHaveProperty('status', 'Fail');
    expect(data.createFarm).toHaveProperty(
      'error',
      new NotFoundError('User type: OWNER').message,
    );
  });

  it('given the error "Dealer not found type ADMIN" if not exists an user with user_id received', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: masterId,
          admins: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6h9'],
        },
      })
      .expectNoErrors();

    expect(data.createFarm).toHaveProperty('status', 'Fail');
    expect(data.createFarm).toHaveProperty(
      'error',
      new NotFoundError('User type: ADMIN').message,
    );
  });

  it('given the error "User not found type DEALER" if not exists an user with user_id received', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: masterId,
          dealers: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6h9'],
        },
      })
      .expectNoErrors();

    expect(data.createFarm).toHaveProperty('status', 'Fail');
    expect(data.createFarm).toHaveProperty(
      'error',
      new NotFoundError('User type: DEALER').message,
    );
  });

  it('given the error "User not found type USER" if not exists an user with user_id received', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: masterId,
          users: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6h9'],
        },
      })
      .expectNoErrors();

    expect(data.createFarm).toHaveProperty('status', 'Fail');
    expect(data.createFarm).toHaveProperty(
      'error',
      new NotFoundError('User type: USER').message,
    );
  });

  it('given the error "User not found type CREATED_BY" if not exists an user with user_id received', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: 'd4ec9d57-3bd1-4015-bb72-d1786b16a6h9',
        },
      })
      .expectNoErrors();

    expect(data.createFarm).toHaveProperty('status', 'Fail');
    expect(data.createFarm).toHaveProperty(
      'error',
      new NotFoundError('User type: CREATOR').message,
    );
  });

  it('should be error if user creator received not a have acess for create a new farm', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: adminId,
        },
      })
      .expectNoErrors();

    expect(data.createFarm).toHaveProperty('status', 'Fail');
    expect(data.createFarm).toHaveProperty(
      'error',
      new UnauthorizedException().message,
    );
  });

  it('should to have a new farm created if all data valids', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationCreateFarm)
      .variables({
        createFarm: {
          ...createFarmMocked,
          owner_id: adminId,
          created_by: masterId,
        },
      })
      .expectNoErrors();

    expect(data.createFarm).toHaveProperty('status', 'Sucess');
    expect(data.createFarm).toHaveProperty('farm_id', createFarmMocked.farm_id);

    await prismaTest.farm.delete({
      where: { farm_id: createFarmMocked.farm_id },
    });
  });
});
