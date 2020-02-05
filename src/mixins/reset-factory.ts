// vue-component-reset package was used before, but there is a custom mixin
// here because of typescript limitations. Mixins defined not in common way
// because of it too
//
// https://stackoverflow.com/a/54273687

import Vue from 'vue';

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
