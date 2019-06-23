module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  },
  globals: {
    document: true,
  },
  rules: {
    'no-console': 0,
  },
};
