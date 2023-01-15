module.exports = {
  root: true,
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'regexp', '@docusaurus', 'check-file'],
  globals: {
    JSX: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:regexp/recommended',
    'plugin:mdx/recommended',
    'plugin:@docusaurus/all',
    'prettier',
  ],
  rules: {
    camelcase: 'error',
    'react/prop-types': 'off',
    '@docusaurus/string-literal-i18n-messages': 'error',
    '@docusaurus/no-untranslated-text': 'warn',
    'check-file/filename-naming-convention': [
      'error',
      {
        './**/README.md': 'SCREAMING_SNAKE_CASE',
        'src/components/(?!index).*': 'PASCAL_CASE',
        'src/pages/**/*': 'KEBAB_CASE',
        'src/css/**/*': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/components/**/': 'PASCAL_CASE',
        'src/pages/**/': 'KEBAB_CASE',
        'src/css/**/': 'KEBAB_CASE',
        'scripts/**/': 'KEBAB_CASE',
        'docs/**/': 'KEBAB_CASE',
        'static/*/': 'KEBAB_CASE',
      },
    ],
  },
}
