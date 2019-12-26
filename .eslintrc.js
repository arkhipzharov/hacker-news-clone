module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  // 'Use the latest vue-eslint-parser' fix
  //
  // https://github.com/vuejs/eslint-plugin-vue/issues/30#issuecomment-434855197
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        /*
          Said that expected indentation of 0 spaces but found 2 inside script
          tag
        */
        'indent': 'off',
      },
    },
    {
      files: ['*.test.ts'],
      /*
        --> describe('TheTasksCompleted', () => {
          --> test(() => {
            const wrapper = shallowMount(TheTasksCompleted);
            --> expect(wrapper.isVueInstance()).toBe(true);
          });
        });

        Said that this and some other functions not defined
      */
      rules: { 'no-undef': 'off' },
    },
  ],
  rules: {
    'no-plusplus': 'off',
    /*
      const id = this.data.id;

      Said that in this case it is necessary to apply destructuring
    */
    'prefer-destructuring': 'off',
    /*
      resetSidebarScrollPosition(sidebar) {
        sidebar.scrollTop = 0;
      },

      Said that you can’t assign value to the property of an object that
      contains function parameter
    */
    'no-param-reassign': 'off',
    /*
      TheMenu.vue
      grid:
        'location shops . to-buyers . projects . call . notifications . enter . registration .' 39.36px
        / 245px auto 10px auto 10px auto 1fr auto 20px auto 20px auto 10px auto 4px;

      And in the editor there is a limit line
    */
    'max-len': 'off',
    /*
      .find((data) => data.id === storData.id);
      Better than
      .find(data => data.id === storData.id);

      Brackets around a single parameter of the arrow function are required.
      It’s easier to identify function by looking through the code
    */
    'arrow-parens': ['error', 'always'],
    /*
      const maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
        = pageHeight * 4;
      if (
        pageScrollOffset
        > maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
      ) {
        ...
      }

      Said that the operators '=' and '>' should not be on a new line. If we
      shorten the variable names, then the code will not be so clear
    */
    'operator-linebreak': 'off',
    /*
      mixins: [vueComponentReset(() => ({**error here**
        iconName: 'menu',
        iconText: 'menu',
      }))],
    */
    'arrow-body-style': 'off',
    /*
      function request(url, options, responseType) {
        try {
          ...
          return parsedData;
        } catch (errorResponse) {
          if (!(errorResponse instanceof Error)) {
            ...
            return parsedErrorData;
          }
        }
      }

      Said that expect to return a value at the end of function
    */
    'consistent-return': 'off',
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'indent': [
      'error',
      2,
      {
        /*
          ${
            data.class === 'show-catalog'
              ? '@click='showCatalog''
              : ''
          }

          Said that the indents in this case are incorrect
        */
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    /*
      import './VueComponent';

      Said that file extension is misssing, unable to fix it for now, but maybe
      it's possible
    */
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    /*
      import { shallowMount } from '@vue/test-utils';

      Said that '@vue/test-utils' and other packages should be listed in the
      dependencies, not devDependencies
    */
    'import/no-extraneous-dependencies': 'off',
    /*
      <component
        :is='RptCartItem'
        v-for='data in cartItemsData'
        :cartItemsData='cartItemsData'
      />

      Input parameters are properties of the object, and the spelling of
      their names in camelCase is generally accepted. SFC also allows you to
      write attributes in camelCase. Said that you need to write them
      through a dash
    */
    'vue/attribute-hyphenation': 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        /*
          <script>
            export default {};
          </script>

          Instead of

          <script>
          export default {};
          </script>
        */
        baseIndent: 1,
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          /*
            <a
              href='##'
              class='link-mask'
            ></a>

            In order not to convert tags of some elements after
            autocompletion to self-closing once again
          */
          normal: 'never',
        },
        /*
          <svg>
            <use></use>
          </svg>

          Said that use should be self-closing
        */
        svg: 'never',
      },
    ],
    /*
      camelCase(
        fileName
          .split('/')
          .pop()!
          .replace(/\.\w+$/, ''),
      ),

      if (iOSSafari) {
        document.querySelector('body')!.classList.add('...');
      }

      Said that we shouldn't use !, but we definetly know that all gonna be
      ok in such situations
    */
    '@typescript-eslint/no-non-null-assertion': 'off',
    // typescript can figure the return type out by looking at the return
    // statements, and it's feeling overhead to write them all
    '@typescript-eslint/explicit-function-return-type': 'off',
    /*
      declare namespace NodeJS {
        export interface Global {
          [propName: string]: any;
        }
      }

      for extending global object and don't import helper functions every time
      in unit tests
    */
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
