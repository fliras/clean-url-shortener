export default {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.js',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/__tests__/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.js'],
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  clearMocks: true,
};
