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
    // margin-top here is because header have position: fixed
    padding-top: 90px;

    &__inner {
      display: flex;
      flex: 1 1 0;
      flex-direction: column;
      height: 100%;
      padding: 0 15px;
    }
  }
</style>
