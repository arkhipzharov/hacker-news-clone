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
    // it was showing error even with specified properties order
    'order/properties-alphabetical-order': null,
    /*
      .user {
        ...

        .user__action { <-- reusable component
          ...
        }
      }

      'Selector should be written in lowercase with hyphens'
      But it is pattern to avoid problems with styles

      http://simurai.com/blog/2015/05/11/nesting-components#option-3---adopted-child
    */
    'selector-class-pattern': null,
  },
};
