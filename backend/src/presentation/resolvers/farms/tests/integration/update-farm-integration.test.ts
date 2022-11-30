import { INestApplication, UnauthorizedException } from '@nestjs/common';
import request from 'supertest-graphql';
import { mutationUpdateFarm } from '@testRoot/mocks/gql/farms';
import { integrationTestManager, prismaTest } from '@testRoot/setup';
import {
  ICreateFarmController,
  ICreateFarmRepo,
  ICreateFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
  IUpdateFarmController,
  IUpdateFarmRepo,
  IUpdateFarmService,
} from '@contracts/index';
import {
  createFarmMocked,
  getUserAdminId,
  getUserMasterId,
  updateFarmMock,
} from '@testRoot/mocks';
import { AlreadyExistsError, NotFoundError } from '@root/shared/errors';

describe('Update Farm Integration', () => {
  let app: INestApplication;
  let token: string;
  let user_id: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
    token = (await integrationTestManager.authUser()).token;

    user_id = (await integrationTestManager.getUserId()).user_id;
  });

  it('should be defined this respective providers of service', async () => {
    const service = await app.resolve<IUpdateFarmService>('IUpdateFarmService');
    const controller = await app.resolve<IUpdateFarmController>(
      'IUpdateFarmController',
    );
    const findFarmRepo = await app.resolve<IFindFarmsRepo>('IFindFarmsRepo');
    const createFarmRepo = await app.resolve<IUpdateFarmRepo>(
      'IUpdateFarmRepo',
    );

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(createFarmRepo).toBeDefined();
    expect(findFarmRepo).toBeDefined();
  });

  it('should be graphql type errors if received farm_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 33,
          user: {
            user_id: 'id',
            userType: 'MASTER',
          },
          newFarm: updateFarmMock,
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value 33 at "putFarm.farm_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received user_id type inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 33,
            userType: 'MASTER',
          },
          newFarm: updateFarmMock,
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value 33 at "putFarm.user.user_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received user_typetype inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 'id',
            userType: 33,
          },
          newFarm: updateFarmMock,
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value 33 at "putFarm.user.userType"; Enum "UserType" cannot represent non-string value: 33.',
    );
  });

  it('should be graphql type errors if received farm_name inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 'id',
            userType: 'MASTER',
          },
          newFarm: { ...updateFarmMock, farm_name: 33 },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value 33 at "putFarm.newFarm.farm_name"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received new farm_id inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 'id',
            userType: 'MASTER',
          },
          newFarm: { ...updateFarmMock, farm_id: 33 },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value 33 at "putFarm.newFarm.farm_id"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received farm_city inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 'id',
            userType: 'MASTER',
          },
          newFarm: { ...updateFarmMock, farm_city: 33 },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value 33 at "putFarm.newFarm.farm_city"; String cannot represent a non string value: 33',
    );
  });

  it('should be graphql type errors if received farm_lat inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 'id',
            userType: 'MASTER',
          },
          newFarm: { ...updateFarmMock, farm_lat: '33' },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value "33" at "putFarm.newFarm.farm_lat"; Float cannot represent non numeric value: "33"',
    );
  });

  it('should be graphql type errors if received farm_lng inválid', async () => {
    const { errors } = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 'id',
            userType: 'MASTER',
          },
          newFarm: { ...updateFarmMock, farm_lng: '33' },
        },
      });

    expect(errors[0]).toHaveProperty(
      'message',
      'Variable "$putFarm" got invalid value "33" at "putFarm.newFarm.farm_lng"; Float cannot represent non numeric value: "33"',
    );
  });

  it('should be return an error if farm_id not exist in db', async () => {
    const { data }: any = await request(app.getHttpServer())
      .set('authorization', `Bearer ${token}`)
      .mutate(mutationUpdateFarm)
      .variables({
        putFarm: {
          farm_id: 'id',
          user: {
            user_id: 'id',
            userType: 'MASTER',
          },
          newFarm: updateFarmMock,
        },
      });

    console.log(data);
    expect(data.putFarm).toHaveProperty('status', 'Fail');
    expect(data.putFarm).toHaveProperty(
      'error',
      new NotFoundError('Farm').message,
    );
  });

  // it('should be to throw farm already exists', async () => {
  //   await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: masterId,
  //         admins: [adminId],
  //       },
  //     });

  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: masterId,
  //         admins: [adminId],
  //       },
  //     });
  //   await prismaTest.farm.delete({
  //     where: { farm_id: createFarmMocked.farm_id },
  //   });
  //   expect(data.createFarm).toHaveProperty('status', 'Fail');
  //   expect(data.createFarm).toHaveProperty(
  //     'error',
  //     new AlreadyExistsError('Farm').message,
  //   );
  // });

  // it('given the error "User not found type OWNER" if not exists an user with user_id received', async () => {
  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: 'd4ec9d57-3bd1-4015-bb72-d1786b16a6f9',
  //         created_by: '0a84a14b-52ca-415c-afdd-d69ae8488e87',
  //         admins: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6f9'],
  //       },
  //     })
  //     .expectNoErrors();

  //   expect(data.createFarm).toHaveProperty('status', 'Fail');
  //   expect(data.createFarm).toHaveProperty(
  //     'error',
  //     new NotFoundError('User type: OWNER').message,
  //   );
  // });

  // it('given the error "Dealer not found type ADMIN" if not exists an user with user_id received', async () => {
  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: masterId,
  //         admins: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6h9'],
  //       },
  //     })
  //     .expectNoErrors();

  //   expect(data.createFarm).toHaveProperty('status', 'Fail');
  //   expect(data.createFarm).toHaveProperty(
  //     'error',
  //     new NotFoundError('User type: ADMIN').message,
  //   );
  // });

  // it('given the error "User not found type DEALER" if not exists an user with user_id received', async () => {
  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: masterId,
  //         dealers: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6h9'],
  //       },
  //     })
  //     .expectNoErrors();

  //   expect(data.createFarm).toHaveProperty('status', 'Fail');
  //   expect(data.createFarm).toHaveProperty(
  //     'error',
  //     new NotFoundError('User type: DEALER').message,
  //   );
  // });

  // it('given the error "User not found type USER" if not exists an user with user_id received', async () => {
  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: masterId,
  //         users: ['d4ec9d57-3bd1-4015-bb72-d1786b16a6h9'],
  //       },
  //     })
  //     .expectNoErrors();

  //   expect(data.createFarm).toHaveProperty('status', 'Fail');
  //   expect(data.createFarm).toHaveProperty(
  //     'error',
  //     new NotFoundError('User type: USER').message,
  //   );
  // });

  // it('given the error "User not found type CREATED_BY" if not exists an user with user_id received', async () => {
  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: 'd4ec9d57-3bd1-4015-bb72-d1786b16a6h9',
  //       },
  //     })
  //     .expectNoErrors();

  //   expect(data.createFarm).toHaveProperty('status', 'Fail');
  //   expect(data.createFarm).toHaveProperty(
  //     'error',
  //     new NotFoundError('User type: CREATOR').message,
  //   );
  // });

  // it('should be error if user creator received not a have acess for create a new farm', async () => {
  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: adminId,
  //       },
  //     })
  //     .expectNoErrors();

  //   expect(data.createFarm).toHaveProperty('status', 'Fail');
  //   expect(data.createFarm).toHaveProperty(
  //     'error',
  //     new UnauthorizedException().message,
  //   );
  // });

  // it('should to have a new farm created if all data valids', async () => {
  //   const { data }: any = await request(app.getHttpServer())
  //     .set('authorization', `Bearer ${token}`)
  //     .mutate(mutationCreateFarm)
  //     .variables({
  //       createFarm: {
  //         ...createFarmMocked,
  //         owner_id: adminId,
  //         created_by: masterId,
  //       },
  //     })
  //     .expectNoErrors();

  //   expect(data.createFarm).toHaveProperty('status', 'Sucess');
  //   expect(data.createFarm).toHaveProperty('farm_id', createFarmMocked.farm_id);

  //   await prismaTest.farm.delete({
  //     where: { farm_id: createFarmMocked.farm_id },
  //   });
  // });
});
