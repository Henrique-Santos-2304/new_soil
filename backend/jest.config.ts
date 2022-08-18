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
    '@root/(.*)': ['src/(.*)'],
    '@contracts/(.*)': ['src/domain/$1'],
    '@impl/(.*)': ['src/data/$1'],
    '@usecases/(.*)': ['src/data/usecases/$1'],
    '@resolvers/(.*)': ['src/presentation/resolvers/$1'],
    '@utils/(.*)': ['src/shared/$1'],
    '@core/(.*)': ['src/core/$1'],
  },
};
// globalSetup: '<rootDir>/__tests__/setup/global-setup.ts'
// globalTeardown: '<rootDir>/__tests__/setup/global-teardown.ts'
