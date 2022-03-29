// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config');

const level = {
  DISABLE: 0,
  WARN: 1,
  ERROR: 2,
};

module.exports = defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals',
  ],
  plugins: ['react', 'import', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  ignorePatterns: ['.next', 'node_modules', 'amplify'],
  settings: {
    react: {
      version: 'detect', // automatically picks the version you have installed.
    },
  },
  rules: {
    'prettier/prettier': [level.ERROR],
    'no-new': [level.DISABLE],
    'import/prefer-default-export': [level.DISABLE],
    '@typescript-eslint/no-unused-vars': [
      level.ERROR,
      {
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
        args: 'all',
      },
    ],
    '@typescript-eslint/no-explicit-any': [level.ERROR],
    '@typescript-eslint/no-shadow': [level.ERROR],
    '@typescript-eslint/prefer-nullish-coalescing': [level.ERROR],
    '@typescript-eslint/no-non-null-assertion': [level.DISABLE],
    '@typescript-eslint/unbound-method': [level.ERROR],
    '@typescript-eslint/restrict-template-expressions': [level.DISABLE],
    '@typescript-eslint/no-misused-promises': [
      level.ERROR,
      {
        checksVoidReturn: false,
      },
    ],
    'import/no-anonymous-default-export': [level.DISABLE],
    'import/order': [
      level.ERROR,
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          ['builtin', 'external'],
          ['index', 'sibling', 'parent', 'internal'],
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      level.ERROR,
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
});
