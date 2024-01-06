module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    testEnvironment: 'jest-environment-jsdom',
  };
  