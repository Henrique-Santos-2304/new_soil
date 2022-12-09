import { PrismaClient } from '@prisma/client';

const prismaTest = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://new_soil:new_soil2021@localhost:5492/new_soildb_test',
    },
  },
});

export { prismaTest };
