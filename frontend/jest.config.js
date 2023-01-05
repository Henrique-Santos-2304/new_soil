/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: '.'
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.@(ts|tsx|js|jsx)',
    '!<rootDir>/src/domain/*.@(ts|tsx|js|jsx)',
    '!<rootDir>/tests/*.@(ts|tsx|js|jsx)',
    '!<rootDir>/src/shared/styles/**/*.@(ts|tsx|js|jsx)'
  ],
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^@/core/(.*)$': '<rootDir>/src/core/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',

    '^@/data/(.*)$': '<rootDir>/src/data/$1',
    '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@/presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1'
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
