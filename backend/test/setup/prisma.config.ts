import { PrismaClient } from '@prisma/client';

const prismaTest = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://test:test_pass@localhost:5492/test_db' },
  },
});

export { prismaTest };
