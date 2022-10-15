import { INestApplication } from '@nestjs/common';
import { ICreateFarmService } from '@root/domain';
import { prismaTest, createFarmMocked } from '..';

export const createFarmStub = async (app: INestApplication) => {
  console.log('Criando fazenda no ambiente de teste');

  const createFarmService = await app.resolve<ICreateFarmService>(
    'ICreateFarmService',
  );

  const user = await prismaTest.user.findFirst({
    where: { login: 'soil_test' },
  });

  await createFarmService.start({
    ...createFarmMocked,
    owner_id: user.user_id,
    created_by: user.user_id,
  });
};
