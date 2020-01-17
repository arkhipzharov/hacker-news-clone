// vue-component-reset package was used before, but there is a custom mixin
// here because of typescript limitations. Mixins defined differently because
// of it too
//
// https://stackoverflow.com/a/54273687
import Vue from 'vue';

interface Data {
  [key: string]: any;
}

// using factory function to make it possible that component can have it's own
// and mixin data
export default function resetFactory(data: Data) {
  return Vue.extend({
    data() {
      return data;
    },
    methods: {
      reset() {
        // 'Avoid replacing instance root $data. Use nested data properties
        // instead'
        Object.keys(data).forEach((propName) => {
          if (Array.isArray(data[propName])) {
            // arrays wasn't updating
            this.$data[propName].splice(0).concat(data[propName]);
          } else {
            this.$data[propName] = data[propName];
          }
        });
      },
    },
  });
}
