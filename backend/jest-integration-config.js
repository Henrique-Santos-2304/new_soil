const config = require('./jest.config');

config.testMatch = ['**/*.test.ts'];
config.setupFilesAfterEnv = ['<rootDir>/test/setup/integration.setup.ts'];

module.exports = config;
