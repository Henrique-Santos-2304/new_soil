import { INestApplication } from '@nestjs/common';
import { ICreateUserService } from '@root/domain';

export const createUserStub = async (app: INestApplication) => {
  console.log('Criando usuario no ambiente de teste');
  const createUserService = await app.resolve<ICreateUserService>(
    'ICreateUserService',
  );

  try {
    await createUserService.start({
      login: 'soil_test',
      password: 'password',
      userType: 'MASTER',
      internal_password: process.env.INTERNAL_PASSWORD,
    });
  } catch (err) {
    console.log(err.message);
  }
};
