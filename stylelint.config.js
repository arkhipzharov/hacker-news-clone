module.exports = {
  processors: [
    [
      '@mapbox/stylelint-processor-arbitrary-tags',
      { fileFilterRegex: [/\.vue$/] },
    ],
  ],
  extends: 'stylelint-config-sass-guidelines',
  ignoreFiles: [
    './src/scss/helpers/mixins/*.scss',
    './src/scss/base/normalize**.scss',
    './src/components/V**.vue',
  ],
  rules: {
    'color-hex-case': 'upper',
    'color-hex-length': 'long',
    'selector-no-qualifying-type': null,
    'order/properties-alphabetical-order': null,
  },
};