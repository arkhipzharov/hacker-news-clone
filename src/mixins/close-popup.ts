// should be used along with reset mixin

import Vue from 'vue';

export default Vue.extend({
  methods: {
    closePopup(this: any) {
      this.$evBus.$emit('close-popup');
      this.reset();
    },
  },
});
