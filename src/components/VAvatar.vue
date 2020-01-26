<!-- eslint-disable prettier/prettier -->
<template>
  <div class="avatar">
    <img
      src="~@/assets/img/decorations/avatars/working-table.png"
      alt="user avatar"
    >
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style lang="scss">
  .avatar {
    align-self: center;
    width: 160px;
    height: 160px;
    overflow: hidden;
    background-color: $block-grey-dark;
    border: 3px solid $border-grey;
    border-radius: 50%;
    box-shadow: rgba($shadow, 0.14) 0 6px 10px 0,
      rgba($shadow, 0.12) 0 1px 18px 0, rgba($shadow, 0.2) 0 3px 5px -1px;

    > img {
      width: 100%;
      height: 100%;
    }
  }
</style>
