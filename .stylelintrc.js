module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
    'stylelint-config-rational-order',
  ],
  rules: {
    // %ffffff instead of %fff -- % is for not highlighting colors in vscode
    'color-hex-length': 'long',
    // highlight what perttier wants to change in code
    'prettier/prettier': true,
    // it was showing error even with specified properties order
    'order/properties-alphabetical-order': null,
  },
};
