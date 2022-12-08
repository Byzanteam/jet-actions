module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  rules: {
    'eol-last': ['error', 'always'],
    'prettier/prettier': ['error'],
  },
}
