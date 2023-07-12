module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': 0,
    'react/react-in-jsx-scope': 0,
    'linebreak-style': 0,
    'import/no-named-as-default': 0,
    'react/prop-types': 0,
    'import/no-named-as-default-member': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-no-constructed-context-values': 0,
    'react/jsx-no-bind': 0,
    'consistent-return': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'operator-linebreak': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-nested-ternary': 0
  },
};
