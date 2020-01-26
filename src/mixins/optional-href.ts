import Vue from 'vue';

export default Vue.extend({
  methods: {
    optionalHref() {
      const hrefOrPostId = this.$props.href;
      if (typeof hrefOrPostId === 'string') {
        window.open(hrefOrPostId, '_blank');
      } else if (typeof hrefOrPostId === 'number') {
        this.$router.push(`/post/${hrefOrPostId}`);
      }
    },
  },
});
