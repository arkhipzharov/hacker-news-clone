<!-- eslint-disable prettier/prettier -->
<template>
  <router-link
    to="/"
    class="logo"
  >
    <span class="logo__icon-simulation">HN</span>
    <div class="logo__text">
      <span>Hacker</span>
      <span>News</span>
    </div>
  </router-link>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style lang="scss">
  .logo {
    display: flex;
    align-items: center;
    padding: 0 10px;

    &__icon-simulation {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      margin-right: 10px;
      color: $text-orange-pink;
      background-color: $bg-grey-dark;
      border-radius: 50%;
    }

    &__text {
      > span {
        color: $text-white;
        font-size: 20px;
      }
    }
  }
</style>
