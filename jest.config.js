module.exports = {
  // for performance
  roots: ['<rootDir>/src/test', '<rootDir>/src/components'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    // transformed by babel-jest to include some fixes inside code
    '^.+\\.ts$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  moduleNameMapper: {
    // import '@/file' intstead of import '../../../file' fix
    //
    // https://medium.com/@justintulk/solve-module-import-aliasing-for-webpack-jest-and-vscode-74007ce4adc9
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    '<rootDir>/src/test/require-context-fix.ts',
    '<rootDir>/src/test/helpers/index.ts',
  ],
};
