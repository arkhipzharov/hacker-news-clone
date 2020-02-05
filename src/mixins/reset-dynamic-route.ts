/*
  if using dynamic route matching, mounted hook is not running when only
  params changed, so we need to reset data manually

  should be used along with reset factory mixin
*/
import Vue from 'vue';

export default Vue.extend({
  watch: {
    // 'this: any' because "Property 'reset' does not exist on type
    // 'CombinedVueInstance...'"
    $route(this: any) {
      this.reset();
    },
  },
});
