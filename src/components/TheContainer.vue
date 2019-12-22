<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style lang="scss">
  .container {
    flex: 1 1 0;
    width: 100%;
  }
</style>
