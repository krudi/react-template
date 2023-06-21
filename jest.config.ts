import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  testMatch: ['<rootDir>/tests/**/*.test.(js|ts)'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json'
      }
    ],
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  transformIgnorePatterns: ['node_modules']
}

export default config
