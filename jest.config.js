module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(m?)js$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
      babelConfig: {
        presets: [
          [
            '@babel/preset-env',
            {
              "targets": {
                "node": "current"
              }
            }
          ],
          '@babel/preset-react'
        ],
      },
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
    '\\.(css|less)$': 'identity-obj-proxy',
    'IconFont': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node', 'image.test.js', 'image.test.ts'],
  modulePathIgnorePatterns: ['/_site/', '/packages/'],
  testMatch: [
    '<rootDir>/components/basic/**/__tests__/**/*.{ts,tsx,js,jsx,mjs}',
    '<rootDir>/components/basic/**/?(*.)(spec|test).{ts,tsx,js,jsx,mjs}',
  ],
  reporters: ['default', 'jest-html-reporters'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['app/react/**/*.{ts,tsx}', '!app/react/__tests__/api/api-test-helpers.ts'],
};
