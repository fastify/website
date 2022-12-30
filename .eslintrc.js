module.exports = {
  root: true,
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'regexp', '@docusaurus'],
  globals: {
    JSX: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:regexp/recommended',
    'prettier',
    'plugin:@docusaurus/all',
  ],
  rules: {
    'react/prop-types': 'off',
    '@docusaurus/string-literal-i18n-messages': 'error',
    '@docusaurus/no-untranslated-text': 'warn',
  },
}
