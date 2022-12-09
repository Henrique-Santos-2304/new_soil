import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { IAuthUserService, UserModel } from '@root/domain';
import { PrismaService } from '@root/infra';
import { prismaTest } from './prisma.config';
import { Test } from '@nestjs/testing';

class IntegrationTestManager {
  private app: INestApplication;
  private token: string;

  async beforeAll() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaTest)
      .compile();

    this.app = moduleRef.createNestApplication();

    await this.app.init();
  }

  async afterAll() {
    await this.app.close();
  }

  async authUser() {
    const authService = await this.app.resolve<IAuthUserService>(
      'IAuthUserService',
    );

    const user = await authService.start({
      login: 'soil_test',
      password: 'password',
    });

    this.token = user.token;
    return { token: this.token };
  }

  async getUserId(): Promise<UserModel> {
    return await prismaTest.user.findFirst({ where: { login: 'soil_test' } });
  }

  async getSimpleUserId(): Promise<UserModel> {
    return await prismaTest.user.findFirst({ where: { login: 'soil_test2' } });
  }

  getToken = () => this.token;
  getApp = () => this.app;
}

const integrationTestManager = new IntegrationTestManager();

export { integrationTestManager };
