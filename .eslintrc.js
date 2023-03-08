module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb'],
  parserOptions: {
    /* necessary otherwise lints all react jsx */
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
  },
  plugins: [],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/extensions': ['error', { jsx: 'always' }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true },
    ],
    'react/prop-types': 'off',
    // redux throws error with this
    'no-param-reassign': 0,
  },
};
