<!-- eslint-disable prettier/prettier -->
<template>
  <div class="container">
    <div class="container__inner">
      <slot></slot>
    </div>
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

    &__inner {
      height: 100%;
      padding: 0 15px;
    }
  }
</style>
