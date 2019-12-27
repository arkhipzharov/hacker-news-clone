<!-- eslint-disable prettier/prettier -->
<template>
  <div class="app">
    <TheHeader />
    <router-view />
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import TheHeader from './TheHeader';

  export default Vue.extend({
    components: {
      TheHeader,
    },
  });
</script>

<style lang="scss">
  html {
    height: 100%;
  }

  body {
    min-width: 320px;
    height: 100%;
    color: $text-grey-light;
    font-size: 16px;
    font-family: $font-roboto-slab;
    background-color: $block-grey;
  }

  .app {
    display: flex;
    flex-direction: column;
    // for browsers that doesn't support css variables
    height: 100vh;
    // fix overflowing screen height on ios safari
    //
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    height: calc(var(--vh, 1vh) * 100);
  }
</style>
