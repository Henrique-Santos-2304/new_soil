module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    // '!<rootDir>/src/utils/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  clearMocks: true,

  setupFilesAfterEnv: ['<rootDir>/test/setup/setup.ts'],
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '@root/(.*)': '<rootDir>/src/$1',
    '@prismaRoot/(.*)': '<rootDir>/prisma/$1',
    '@db/(.*)': '<rootDir>/src/infra/$1',
    '@repos/(.*)': '<rootDir>/src/infra/repositories/$1',
    '@contracts/(.*)': '<rootDir>/src/domain/$1',
    '@impl/(.*)': '<rootDir>/src/data/$1',
    '@usecases/(.*)': '<rootDir>/src/data/usecases/$1',
    '@resolvers/(.*)': '<rootDir>/src/presentation/resolvers/$1',
    '@utils/(.*)': '<rootDir>/src/shared/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@testRoot/(.*)': '<rootDir>/test/$1',
  },
};
// globalSetup: '<rootDir>/__tests__/setup/global-setup.ts'
// globalTeardown: '<rootDir>/__tests__/setup/global-teardown.ts'
