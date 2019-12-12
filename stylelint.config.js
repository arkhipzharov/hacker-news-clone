module.exports = {
  processors: [
    [
      '@mapbox/stylelint-processor-arbitrary-tags',
      { fileFilterRegex: [/\.vue$/] },
    ],
  ],
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
  ],
  ignoreFiles: [
    './src/scss/helpers/mixins/*.scss',
    './src/scss/base/normalize**.scss',
    './src/components/V**.vue',
  ],
  rules: {
    'color-hex-length': 'long',
    'selector-no-qualifying-type': null,
    'prettier/prettier': true,
    'order/properties-alphabetical-order': null,
  },
};
