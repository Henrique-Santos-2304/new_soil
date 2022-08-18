const config = require('./jest.config');

config.testMatch = ['**/*.spec.ts'];
config.setupFilesAfterEnv = ['<rootDir>/test/setup/unit.setup.ts'];

module.exports = config;
