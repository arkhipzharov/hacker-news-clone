// should be used along with reset mixin and reusable popup component

import Vue from 'vue';

export default Vue.extend({
  mounted(this: any) {
    this.$evBus.$on('popup-closed', () => {
      this.reset();
    });
  },
  methods: {
    closePopup() {
      this.$evBus.$emit('close-popup');
    },
  },
});
