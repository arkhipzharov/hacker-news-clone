import Vue from 'vue';

export default Vue.extend({
  methods: {
    convertUnixTimestampToDate(unixTimestamp: number) {
      return new Date(unixTimestamp * 1000);
    },
  },
});
