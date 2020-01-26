<!-- eslint-disable prettier/prettier -->
<template>
  <InfiniteLoading
    :key="$route.fullPath"
    spinner="waveDots"
    :distance="300"
    @infinite="handler"
  >
    <div slot="no-more">No more data</div>
    <div slot="no-results">No results</div>
  </InfiniteLoading>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import InfiniteLoading from 'vue-infinite-loading';

  export default Vue.extend({
    components: {
      InfiniteLoading,
    },
    props: {
      handler: {
        type: Function,
        required: true,
      },
    },
  });
</script>

<style lang="scss">
  .infinite-status-prompt {
    padding: 40px 0 !important;
  }
</style>
