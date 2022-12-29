import { INestApplication, UnauthorizedException } from '@nestjs/common';
import request from 'supertest-graphql';
import {
  IAddUserIntoFarmService,
  ICreateUserRepo,
  IFindFarmsRepo,
  IFindUserRepo,
  IUpdateFarmRepo,
} from '@root/domain';
import { IAddUserIntoFarmController } from '@root/domain/controllers/farms/add-user-into-farm.controller.domain';
import {
  integrationTestManager,
  prismaTest,
  serviceAddUserIntoFarmMock,
} from '@testRoot/index';
import { mutationAddUserIntoFarm } from '@testRoot/mocks/gql';
import {
  AlreadyExistsError,
  FARM_CONTROLLER,
  FARM_REPO,
  FARM_SERVICE,
  NotFoundError,
  USER_REPO,
} from '@root/shared';

describe('Add User Into Farm Integration', () => {
  let app: INestApplication;
  let token: string;
  let user_id: string;
  let simple_user_id: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
    token = (await integrationTestManager.authUser()).token;

    user_id = (await integrationTestManager.getUserId()).user_id;
    simple_user_id = (await integrationTestManager.getSimpleUserId()).user_id;
  });

  beforeEach(async () => {
    const farm = await prismaTest.farm.findFirst({
      where: { farm_id: serviceAddUserIntoFarmMock.farm_id },
    });

    if (farm) {
      await prismaTest.farm.update({
        where: { farm_id: serviceAddUserIntoFarmMock.farm_id },
        data: { admins: [], users: [], dealers: [] },
      });
    }
  });

  it('should be defined this respective providers of service', async () => {
    const service = await app.resolve<IAddUserIntoFarmService>(
      FARM_SERVICE.ADD_USER,
    );
    const controller = await app.resolve<IAddUserIntoFarmController>(
      FARM_CONTROLLER.ADD_USER,
    );
    const findFarmRepo = await app.resolve<IFindFarmsRepo>(FARM_REPO.FIND);
    const updateFarmRepo = await app.resolve<IUpdateFarmRepo>(FARM_REPO.UPDATE);
    const findUserRepo = await app.resolve<IFindUserRepo>(USER_REPO.FIND);
    const createUserRepo = await app.resolve<ICreateUserRepo>(USER_REPO.CREATE);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(updateFarmRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(createUserRepo).toBeDefined();
  });

  it('should be graphql type errors if received farm_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: { ...serviceAddUserIntoFarmMock, farm_id: 33 },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$addUserIntoFarm" got invalid value 33 at "addUserIntoFarm.farm_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received auth.user_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          auth: { userType: 'MASTER', user_id: 33 },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$addUserIntoFarm" got invalid value 33 at "addUserIntoFarm.auth.user_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received auth.userType type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          auth: { userType: 33, user_id: '33' },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$addUserIntoFarm" got invalid value 33 at "addUserIntoFarm.auth.userType"; Enum "UserType" cannot represent non-string value: 33.',
    );
  });

  it('should be graphql type errors if received data.add_user.login type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          data: {
            add_user: {
              ...serviceAddUserIntoFarmMock.data.add_user,
              login: 33,
            },
          },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$addUserIntoFarm" got invalid value 33 at "addUserIntoFarm.data.add_user.login"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received data.add_user.userTypw type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          data: {
            add_user: {
              ...serviceAddUserIntoFarmMock.data.add_user,
              userType: 33,
            },
          },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$addUserIntoFarm" got invalid value 33 at "addUserIntoFarm.data.add_user.userType"; Enum "UserType" cannot represent non-string value: 33.',
    );
  });

  it('should be graphql type errors if received data.add_user.password type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          data: {
            add_user: {
              ...serviceAddUserIntoFarmMock.data.add_user,
              password: 33,
            },
          },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$addUserIntoFarm" got invalid value 33 at "addUserIntoFarm.data.add_user.password"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received data.table type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          data: {
            ...serviceAddUserIntoFarmMock.data,
            table: 33,
          },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$addUserIntoFarm" got invalid value 33 at "addUserIntoFarm.data.table"; Enum "TableAddUserIntoFarm" cannot represent non-string value: 33.',
    );
  });

  it('should be received an error if farm_id not exist', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          farm_id: 'not_farm',
        },
      });

    expect(data.addUserIntoFarm).toHaveProperty('status', 'Fail');
    expect(data.addUserIntoFarm).toHaveProperty(
      'error',
      new NotFoundError('Farm').message,
    );
  });

  it('should be return an Unauthorized error', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          auth: {
            user_id: 'id_unauthorized',
            userType: 'USER',
          },
        },
      });

    expect(data.addUserIntoFarm).toHaveProperty('status', 'Fail');

    expect(data.addUserIntoFarm).toHaveProperty(
      'error',
      new UnauthorizedException().message,
    );
  });

  it('should be return an User Already Exists error', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          data: {
            add_user: {
              ...serviceAddUserIntoFarmMock.data.add_user,
              login: 'soil_test',
            },
            table: 'admins',
          },
        },
      });

    expect(data.addUserIntoFarm).toHaveProperty('status', 'Fail');
    expect(data.addUserIntoFarm).toHaveProperty(
      'error',
      new AlreadyExistsError('User').message,
    );
  });

  it('should be user to have added into users table', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
        },
      });

    expect(data.addUserIntoFarm).toHaveProperty('status', 'Sucess');
    expect(data.addUserIntoFarm).toHaveProperty('user_id');
    expect(data.addUserIntoFarm).toHaveProperty(
      'farm_id',
      serviceAddUserIntoFarmMock.farm_id,
    );

    const { users } = await prismaTest.farm.findFirst({
      where: { farm_id: serviceAddUserIntoFarmMock.farm_id },
    });

    expect(users[0]).toEqual(data.addUserIntoFarm.user_id);
    await prismaTest.user.delete({
      where: { user_id: data.addUserIntoFarm.user_id },
    });
  });

  it('should be user to have added into users table', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          data: {
            ...serviceAddUserIntoFarmMock.data,
            table: 'admins',
          },
        },
      });

    expect(data.addUserIntoFarm).toHaveProperty('status', 'Sucess');
    expect(data.addUserIntoFarm).toHaveProperty('user_id');
    expect(data.addUserIntoFarm).toHaveProperty(
      'farm_id',
      serviceAddUserIntoFarmMock.farm_id,
    );

    const { admins } = await prismaTest.farm.findFirst({
      where: { farm_id: serviceAddUserIntoFarmMock.farm_id },
    });

    expect(admins[0]).toEqual(data.addUserIntoFarm.user_id);
    await prismaTest.user.delete({
      where: { user_id: data.addUserIntoFarm.user_id },
    });
  });

  it('should be user to have added into dealers table', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationAddUserIntoFarm)
      .variables({
        addUserIntoFarm: {
          ...serviceAddUserIntoFarmMock,
          data: {
            ...serviceAddUserIntoFarmMock.data,
            table: 'dealers',
          },
        },
      });

    expect(data.addUserIntoFarm).toHaveProperty('status', 'Sucess');
    expect(data.addUserIntoFarm).toHaveProperty('user_id');
    expect(data.addUserIntoFarm).toHaveProperty(
      'farm_id',
      serviceAddUserIntoFarmMock.farm_id,
    );

    const { dealers } = await prismaTest.farm.findFirst({
      where: { farm_id: serviceAddUserIntoFarmMock.farm_id },
    });

    expect(dealers[0]).toEqual(data.addUserIntoFarm.user_id);
    await prismaTest.user.delete({
      where: { user_id: data.addUserIntoFarm.user_id },
    });
  });
});
