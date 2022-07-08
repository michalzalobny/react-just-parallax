//Partly based on https://typescript-eslint.io/docs/linting/ and https://typescript-eslint.io/docs/linting/type-linting/

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-document-import-in-page': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: '.eslintrc.js',
};
