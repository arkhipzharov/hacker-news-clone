// vue-component-reset package was used before, but there is a custom mixin
// here because of typescript limitations. Mixins defined not in common way
// because of it too
//
// https://stackoverflow.com/a/54273687
//
// Also if passing all data into a mixin, it will be resetted on every page
// re-enter, except arrays, and you must have data() in component to avoid this

import Vue from 'vue';

/*
  "Element implicitly has an 'any' type because expression of type 'string'
  can't be used to index type 'unknown'. No index signature with a parameter of
  type 'string' was found on type 'unknown'""

  https://github.com/microsoft/TypeScript/issues/31661#issuecomment-497137168
*/
interface IndexSignatureFix {
  [key: string]: any;
}

/*
  using factory function to make it possible that component can have it's own
  untouchable data and data to reset which we pass in mixin.
*/
export default function resetFactory<DataToReset extends IndexSignatureFix>(
  dataToReset: DataToReset,
) {
  return Vue.extend({
    data(): DataToReset {
      return dataToReset;
    },
    methods: {
      reset() {
        Object.keys(dataToReset).forEach((key) => {
          if (Array.isArray(dataToReset[key])) {
            // arrays wasn't updating
            this.$data[key].splice(0).concat(dataToReset[key]);
          } else {
            this.$data[key] = dataToReset[key];
          }
        });
      },
    },
  });
}
