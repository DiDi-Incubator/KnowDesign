const transformIgnorePatterns = [
  // Ignore modules without es dir.
  // Update: @babel/runtime should also be transformed
  'node_modules/(?!.*@(babel|ant-design|knowdesign))(?!array-move)[^/]+?/(?!(es|node_modules)/)',
];
module.exports = {
  // preset: 'ts-jest',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  //   '\\.(m?)js$': 'ts-jest'
  // },
  verbose: true,
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  transform: {
    '\\.tsx?$': './scripts/jest/codePreprocessor',
    '\\.(m?)js$': './scripts/jest/codePreprocessor',
    '\\.md$': './scripts/jest/demoPreprocessor',
    '\\.(jpg|png|gif|svg)$': './scripts/jest/imagePreprocessor',
  },
  globals: {
    'ts-jest': {
      // tsconfig: './tsconfig.test.json',
      // babelConfig: {
      //   presets: [
      //     [
      //       '@babel/preset-env',
      //       {
      //         "targets": {
      //           "node": "current"
      //         }
      //       }
      //     ],
      //     '@babel/preset-react'
      //   ],
      // },
    },
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  moduleNameMapper: {
    '^dnd-core$': 'dnd-core/dist/cjs',
    '^react-dnd$': 'react-dnd/dist/cjs',
    '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
    '^react-dnd-touch-backend$': 'react-dnd-touch-backend/dist/cjs',
    '^react-dnd-test-backend$': 'react-dnd-test-backend/dist/cjs',
    '^react-dnd-test-utils$': 'react-dnd-test-utils/dist/cjs',
    'react-syntax-highlighter/dist/esm/(.*)': 'react-syntax-highlighter/dist/cjs/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
    '_iconfont/iconfont': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node', 'image.test.js', 'image.test.ts'],
  modulePathIgnorePatterns: ['/_site/', '/packages/'],
  transformIgnorePatterns,
  testMatch: [
    '<rootDir>/components/basic/**/__tests__/**/*.test.{ts,tsx,js,jsx,mjs}',
    '<rootDir>/components/basic/**/?(*.)(spec|test).{ts,tsx,js,jsx,mjs}',
  ],
  reporters: ['default', 'jest-html-reporters'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['app/react/**/*.{ts,tsx}', '!app/react/__tests__/api/api-test-helpers.ts'],
};
