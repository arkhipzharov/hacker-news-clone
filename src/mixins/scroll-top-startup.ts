import Vue from 'vue';

interface Data {
  isScrolledToTopOnStartup: boolean;
}

export default Vue.extend({
  data(): Data {
    return {
      isScrolledToTopOnStartup: false,
    };
  },
  updated() {
    if (!this.$data.isScrolledToTopOnStartup) {
      // if you resize the window so that the content overflows it vertically
      // scroll will not be resetted even in mounted because sometimes data is
      // loading and changing template
      document.documentElement.scrollTop = 0;
      this.$data.isScrolledToTopOnStartup = true;
    }
  },
});
