import { globalIgnores } from 'eslint/config'

import docusaurus from '@docusaurus/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import checkFile from 'eslint-plugin-check-file'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import regexp from 'eslint-plugin-regexp'
import globals from 'globals'

import js from '@eslint/js'

export default [
  js.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  regexp.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    plugins: {
      'check-file': checkFile,
      '@docusaurus': docusaurus,
    },
    rules: docusaurus.configs.recommended.rules,
  },
  {
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
        ...globals.browser,
        JSX: true,
      },

      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      camelcase: 'error',
      'react/prop-types': 'off',
      '@docusaurus/string-literal-i18n-messages': 'error',
      '@docusaurus/no-untranslated-text': 'off',

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
  },
  globalIgnores(['scripts/releases/', 'versioned_docs/**/*', 'versioned_sidebars/*-sidebars.js', 'build/*']),
]
