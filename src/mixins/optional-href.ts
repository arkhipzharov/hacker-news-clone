import Vue from 'vue';

export default Vue.extend({
  props: {
    href: {
      type: [String, Number],
      required: false,
      // if passed, user will not be redirected to any page, it handles not
      // existing urls in loaded data
      default: undefined,
    },
  },
  methods: {
    optionalHref() {
      const hrefOrPostId = this.$props.href;
      if (hrefOrPostId) {
        if (typeof hrefOrPostId === 'string') {
          window.open(hrefOrPostId, '_blank');
        } else if (typeof hrefOrPostId === 'number') {
          this.$router.push(`/post/${hrefOrPostId}`);
        }
      }
    },
  },
});
