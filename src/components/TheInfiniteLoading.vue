<!-- eslint-disable prettier/prettier -->
<template>
  <!--
    :identifier for component re-render to trigger infinite loading when
    navigate and only changing route params
  -->
  <InfiniteLoading
    :identifier="isComponentReRendered"
    spinner="waveDots"
    :distance="300"
    @infinite="loadFun"
  >
    <div slot="no-more">No more data</div>
    <div slot="no-results">No data</div>
  </InfiniteLoading>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import InfiniteLoading from 'vue-infinite-loading';

  interface Data {
    isComponentReRendered: boolean;
  }

  const data: Data = {
    isComponentReRendered: false,
  };

  export default Vue.extend({
    components: {
      InfiniteLoading,
    },
    props: {
      loadFun: {
        type: Function,
        required: true,
      },
    },
    data() {
      return data;
    },
    watch: {
      $route() {
        this.reRenderComponent();
      },
    },
    mounted() {
      this.$evBus.$on('re-render-infinite-loading-component', () => {
        this.reRenderComponent();
      });
    },
    methods: {
      reRenderComponent() {
        this.isComponentReRendered = !this.isComponentReRendered;
      },
    },
  });
</script>

<style lang="scss">
  .infinite-status-prompt {
    padding: 40px 0 !important;
  }
</style>
