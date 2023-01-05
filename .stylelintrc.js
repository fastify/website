module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [],
  rules: {
    'selector-class-pattern': null,
    'custom-property-empty-line-before': null,
    'selector-id-pattern': null,
    'declaration-empty-line-before': null,
    'comment-empty-line-before': null,
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
  },
}
