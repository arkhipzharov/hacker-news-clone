<template>
  <div class="app">
    <TheHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TheHeader from './TheHeader.vue';

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
    height: 100%;
    min-width: 320px;
    color: $text-white;
    font-family: $font-roboto-slab;
    background-color: $block-black;

    &.ios-safari-font-weight-fix {
      text-rendering: optimizeLegibility, optimizeLegibility;
      -webkit-text-stroke: 0.5px;
    }
  }

  .app {
    flex-direction: column;
    display: flex;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
</style>
