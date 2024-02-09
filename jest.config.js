module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  reporters: ['default'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
};
