const { defineConfig, globalIgnores } = require('eslint/config')

const globals = require('globals')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const regexp = require('eslint-plugin-regexp')
const docusaurus = require('@docusaurus/eslint-plugin')
const checkFile = require('eslint-plugin-check-file')

const { fixupPluginRules, fixupConfigRules } = require('@eslint/compat')

const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
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

    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      regexp,
      '@docusaurus': docusaurus,
      'check-file': checkFile,
    },

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:regexp/recommended',
        'plugin:mdx/recommended',
        'plugin:@docusaurus/all',
        'prettier',
      ),
    ),

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
])
