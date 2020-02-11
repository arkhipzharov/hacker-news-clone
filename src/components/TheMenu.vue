<!-- eslint-disable prettier/prettier -->
<template>
  <div class="menu">
    <div class="menu__header">
      <img
        src="@/assets/img/decorations/menu-header.png"
        class="menu__header-image"
        alt="paper mountains"
      >
      <div class="menu__header-search">
        <input
          class="menu__header-search-input"
          placeholder="Search..."
        >
        <button class="menu__header-search-btn">
          <VIcon :href="'search'" />
        </button>
      </div>
    </div>
    <div
      v-for="(name, index) in menuItemAndPageNames"
      :key="index"
      class="menu__item-wrapper"
    >
      <a
        class="menu__item"
        @click.prevent="possiblyRedirectAndCloseMenu(name)"
      >
        <span>{{ name }}</span>
        <VIcon :href="'chevron-right'" />
      </a>
    </div>
    <div class="menu__item-wrapper">
      <button
        class="menu__item"
        @click="toggleIsPopupExist('TheAuthPopup')"
      >
        <span>Login</span>
        <VIcon :href="'chevron-right'" />
      </button>
    </div>
    <div class="menu__item-wrapper">
      <button class="menu__item">
        <span>About</span>
        <VIcon :href="'chevron-right'" />
      </button>
    </div>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  interface Data {
    menuItemAndPageNames: string[];
  }

  const data: Data = {
    menuItemAndPageNames: ['Top', 'New', 'Best', 'Show', 'Ask', 'Job'],
  };

  export default Vue.extend({
    data() {
      return data;
    },
    methods: {
      toggleIsPopupExist(fullPopupCompNameCamelCase: string) {
        this.$evBus.$emit('toggle-popup', fullPopupCompNameCamelCase);
      },
      possiblyRedirectAndCloseMenu(name: string) {
        name = name.toLowerCase();
        if (this.$route.params.wallPostsType === name) {
          this.$evBus.$emit('close-menu');
        } else {
          this.$router.push(`/${name}`);
        }
      },
    },
  });
</script>

<style lang="scss">
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10001;
    width: 300px;
    height: 100%;
    background-color: $block-grey-dark;
    transform: translateX(-100%);
    transition: transform 0.3s;
    will-change: transform;

    &.opened {
      box-shadow: rgba($shadow, 0.21) 2px 0 3px 0;
      transform: translateX(0%);
      transition: transform 0.3s;
      will-change: transform;
    }

    &__header {
      position: relative;
      height: 150px;
    }

    &__header-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__header-search {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      height: 50px;
      padding: 0 20px;
      background-color: rgba($block-black, 0.5);
    }

    &__header-search-input {
      flex: 1 1 0;
      height: 100%;
      color: $text-white;
      font-size: 15px;

      &::placeholder {
        opacity: 0.42;
      }
    }

    &__header-search-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 100%;

      > svg {
        width: 14.58px;
        height: 14.58px;
        fill: $text-white;
      }
    }

    &__item-wrapper {
      display: flex;
      width: 100%;
      height: 50px;
    }

    &__item {
      display: flex;
      flex: 1 1 0;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 20px;

      > svg {
        width: 10px;
        height: 10px;
      }
    }
  }
</style>
