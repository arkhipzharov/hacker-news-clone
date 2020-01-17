<!-- eslint-disable prettier/prettier -->
<template>
  <!--
    using fragment here because if menu is child of header, it will not overlap
    his parent, but if ve extract menu from header we will need to use event bus
    to toggle menu from button in header, so it's most simple solution
  -->
  <Fragment>
    <header class="header">
      <router-link
        to="/"
        class="header__logo"
      >
        <span class="header__logo-icon">HN</span>
        <div class="header__logo-text">
          <span>Hacker</span>
          <span>News</span>
        </div>
      </router-link>
      <button
        class="header__toggle-menu-btn"
        @click="toggleMenu(false)"
      >
        <VIcon :href="'menu'" />
      </button>
    </header>
    <TheMenu
      v-on-clickaway="() => toggleMenu(true)"
      :class="{ opened: isMenuOpened }"
    />
  </Fragment>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import { mixin as clickaway } from 'vue-clickaway2';
  import { Fragment } from 'vue-fragment';
  import TheMenu from '@/components/TheMenu';

  export default Vue.extend({
    components: {
      Fragment,
      TheMenu,
    },
    mixins: [clickaway],
    data() {
      return {
        isMenuOpened: false,
      };
    },
    methods: {
      toggleMenu(isClickaway: boolean) {
        if (isClickaway) {
          if (this.isMenuOpened) {
            this.isMenuOpened = false;
          }
        } else {
          this.isMenuOpened = !this.isMenuOpened;
        }
      },
    },
  });
</script>

<style lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
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
