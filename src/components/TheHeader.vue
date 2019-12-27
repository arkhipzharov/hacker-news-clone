<!-- eslint-disable prettier/prettier -->
<template>
  <header class="header">
    <a class="header__logo">
      <div class="header__logo-icon">HN</div>
      <div class="header__logo-text">
        <span>Hacker</span>
        <span>News</span>
      </div>
    </a>
    <button class="header__toggle-menu-btn">
      <VIcon :href="'menu'" />
    </button>
  </header>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    margin-bottom: 40px;
    background-color: $block-orange;
    box-shadow: rgba($shadow, 0.22) 0 3px 3px;

    &__logo {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 10px;
    }

    &__logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      margin-right: 10px;
      color: $text-orange-pink;
      font-size: 17px;
      background-color: $block-grey-dark;
      border-radius: 50%;
    }

    &__logo-text {
      > span {
        color: $text-white;
        font-size: 20px;
      }
    }

    &__toggle-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 100%;

      > svg {
        width: 17.72px;
        height: 17.72px;
        fill: $text-white;
      }
    }
  }
</style>
