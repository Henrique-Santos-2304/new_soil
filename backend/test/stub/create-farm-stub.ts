import { INestApplication } from '@nestjs/common';
import { ICreateFarmService } from '@root/domain';
import {
  prismaTest,
  createFarmMockStub,
  createFarmMocked3,
  createFarmMocked2,
} from '..';

export const createFarmStub = async (app: INestApplication) => {
  console.log('Criando fazenda no ambiente de teste');

  const createFarmService = await app.resolve<ICreateFarmService>(
    'ICreateFarmService',
  );

  const user = await prismaTest.user.findFirst({
    where: { login: 'soil_test' },
  });

  const simpleUser = await prismaTest.user.findFirst({
    where: { login: 'soil_test2' },
  });

  await createFarmService.start({
    ...createFarmMocked2,
    owner_id: user.user_id,
    created_by: user.user_id,
  });

  await createFarmService.start({
    ...createFarmMockStub,
    owner_id: user.user_id,
    created_by: user.user_id,
  });

  await createFarmService.start({
    ...createFarmMocked3,
    owner_id: user.user_id,
    created_by: user.user_id,
    users: [simpleUser.user_id],
  });
};
