<!-- eslint-disable prettier/prettier -->
<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style lang="scss">
  .container {
    flex: 1 1 0;
  }
</style>
