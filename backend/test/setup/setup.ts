import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import {
  createUserStub,
  createFarmStub,
  integrationTestManager,
  prismaTest,
} from '@testRoot/index';

const dropDatabase = async () => {
  try {
    await prismaTest.user.deleteMany();
    await prismaTest.farm.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } finally {
    await prismaTest.$disconnect();
  }
};

beforeAll(async () => {
  console.log('Iniciando configuração de jest...');
  await integrationTestManager.beforeAll();
  const app: INestApplication = integrationTestManager.getApp();

  await createUserStub(app);
  await createFarmStub(app);
});

afterAll(async () => {
  await integrationTestManager.beforeAll();

  await dropDatabase();
  await integrationTestManager.afterAll();
  console.log('Finalizada configuração de jest...');
});

beforeEach(() => {
  jest.setTimeout(30 * 1000);
});
