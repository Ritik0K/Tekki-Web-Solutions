export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': '<rootDir>/src/mocks/styleMock.js',
    },
  };
  