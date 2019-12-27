module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'color-hex-length': 'long',
    /*
      .header {
        ...

        &__toggle-menu-btn {
          ...

          > svg {
            ...
          }
        }
      }

      'Expected nesting depth to be no more than 1'
    */
    'max-nesting-depth': null,
    // highlight what perttier wants to change in code
    'prettier/prettier': true,
    // it was showing error even with specified properties order
    'order/properties-alphabetical-order': null,
  },
};
