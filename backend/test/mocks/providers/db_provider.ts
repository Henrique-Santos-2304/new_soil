import { PrismaService } from '@root/infra';

const objPrismaMethods = {
  create: jest.fn(),
  findFirst: jest.fn(),
  findMany: jest.fn(),
  delete: jest.fn(),
  deleteMany: jest.fn(),
  update: jest.fn(),
};

const prismaServiceMock = {
  user: objPrismaMethods,
  farm: objPrismaMethods,
  authorize: objPrismaMethods,
};

const prismaProviderMock = {
  provide: PrismaService,
  useValue: prismaServiceMock,
};

export { prismaProviderMock, prismaServiceMock };
