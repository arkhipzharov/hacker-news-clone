import Vue from 'vue';

export default Vue.extend({
  methods: {
    unixToDate(unixTimestamp: number) {
      return new Date(unixTimestamp * 1000);
    },
  },
});
