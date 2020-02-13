<!-- eslint-disable prettier/prettier -->
<template>
  <VPopup
    :isExist="isExist"
    class="auth"
  >
    <template v-slot:header>
      <div class="auth__header">
        <div class="auth__header-top">
          <VLogo
            @click.native="closePopup(); closeMenu();"
          />
        </div>
        <div class="auth__header-tabs">
          <button
            :class="['auth__header-tab', { active: tabNum === 0 }]"
            @click="switchTab(0)"
          >
            <VIcon :href="'person'" />
            <span>Log in</span>
          </button>
          <button
            :class="['auth__header-tab', { active: tabNum === 1 }]"
            @click="switchTab(1)"
          >
            <VIcon :href="'person-add'" />
            <span>Sign up</span>
          </button>
          <div class="auth__header-tabs-underline-animated"></div>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <VTransition
        mode="out-in"
        :duration="250"
      >
        <div
          v-if="tabNum === 0"
          :key="tabNum"
        >
          <div class="auth__input-field">
            <VIcon
              class="auth__input-field-icon"
              :href="'person'"
            />
            <span class="auth__input-wrapper-and-unknown-height-fix">
              .
              <input
                v-model="loginUsername"
                :class="['auth__input', { 'have-value': loginUsername }]"
              >
              <span class="auth__input-placeholder-animated">
                Username
              </span>
              <span class="auth__input-underline-animated"></span>
            </span>
          </div>
          <div class="auth__input-field">
            <VIcon
              class="auth__input-field-icon"
              :href="'lock'"
            />
            <span class="auth__input-wrapper-and-unknown-height-fix">
              .
              <input
                v-model="loginPassword"
                :class="['auth__input', { 'have-value': loginPassword }]"
              >
              <span class="auth__input-placeholder-animated">
                Password
              </span>
              <span class="auth__input-underline-animated"></span>
            </span>
          </div>
          <VButton
            :class="[
              'auth__button',
              { 'button--disabled': !(loginUsername && loginPassword) }
            ]"
          >
            LOG IN
          </VButton>
        </div>
        <div
          v-if="tabNum === 1"
          :key="tabNum"
        >
          <div class="auth__input-field">
            <VIcon
              class="auth__input-field-icon"
              :href="'person'"
            />
            <span class="auth__input-wrapper-and-unknown-height-fix">
              .
              <input
                v-model="signupUsername"
                :class="['auth__input', { 'have-value': signupUsername }]"
              >
              <span class="auth__input-placeholder-animated">
                Username
              </span>
              <span class="auth__input-underline-animated"></span>
            </span>
          </div>
          <div class="auth__input-field">
            <VIcon
              class="auth__input-field-icon"
              :href="'lock'"
            />
            <span class="auth__input-wrapper-and-unknown-height-fix">
              .
              <input
                v-model="signupPassword"
                :class="['auth__input', { 'have-value': signupPassword }]"
              >
              <span class="auth__input-placeholder-animated">
                Password
              </span>
              <span class="auth__input-underline-animated"></span>
            </span>
          </div>
          <VButton
            :class="[
              'auth__button',
              { 'button--disabled': !(signupUsername && signupPassword) }
            ]"
          >
            SIGN UP
          </VButton>
        </div>
      </VTransition>
    </template>
  </VPopup>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import resetFactory from '@/mixins/reset-factory';
  import closePopup from '@/mixins/close-popup';

  interface Data {
    resetMixinNoDataOptionFix: undefined;
  }

  const data: Data = {
    resetMixinNoDataOptionFix: undefined,
  };

  interface DataToReset {
    loginUsername: string;
    loginPassword: string;
    signupUsername: string;
    signupPassword: string;
    tabNum: number;
  }

  const dataToReset: DataToReset = {
    loginUsername: '',
    loginPassword: '',
    signupUsername: '',
    signupPassword: '',
    tabNum: 0,
  };

  export default mixins(
    resetFactory<DataToReset>(dataToReset),
    closePopup,
  ).extend({
    props: {
      isExist: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return data;
    },
    methods: {
      closeMenu() {
        this.$evBus.$emit('close-menu');
      },
      switchTab(tabNum: number) {
        this.tabNum = tabNum;
      },
    },
  });
</script>

<style lang="scss">
  .auth {
    &__header {
      box-shadow: rgba($shadow, 0.14) 0 2px 2px 0,
        rgba($shadow, 0.2) 0 3px 1px -2px, rgba($shadow, 0.12) 0 1px 5px 0;
    }

    &__header-top {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 16px 0;
    }

    &__header-tabs {
      position: relative;
      display: flex;
    }

    &__header-tab {
      display: flex;
      flex: 1 1 0;
      align-items: center;
      justify-content: center;
      height: 56px;

      > svg {
        width: 10px;
        height: 10px;
        padding: 2px;
        transform: rotate(0);
        transition: transform 0.5s, fill 0.5s;
        will-change: transform;
        fill: $text-grey-x-light;
      }

      @at-root .auth__header-tab:nth-child(2) > svg {
        width: 13.9px;
        height: 13.9px;
      }

      @at-root .auth__header-tab.active > svg {
        transform: rotate(360deg);
        transition: transform 0.5s, fill 0.5s;
        will-change: transform;
        fill: $text-white;
      }

      > span {
        margin-left: 8px;
        color: $text-grey-x-light;
        font-size: 15px;
        transition: color 0.25s;
      }

      @at-root .auth__header-tab.active > span {
        color: $text-white;
        transition: color 0.25s;
      }
    }

    &__header-tabs-underline-animated {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 50%;
      height: 3px;
      background-color: $block-grey-dark;
      transform: translateX(0%);
      transition: transform 0.25s;
      will-change: transform;

      @at-root .auth__header-tab:nth-child(2).active ~ & {
        transform: translateX(100%);
        transition: transform 0.25s;
        will-change: transform;
      }
    }

    &__input-field {
      display: flex;
      align-items: center;
      cursor: default;

      &:first-child {
        margin: 28px 0 42px;
      }

      &:nth-child(2) {
        margin-bottom: 44px;
      }
    }

    &__input-field-icon {
      width: 13px;
      height: 13px;
      margin: 0 11px 0 1px;

      @at-root .auth__input-field:nth-child(2) > & {
        width: 15px;
        height: 15px;
        margin: 0 9px 0 0;
      }
    }

    &__input-wrapper-and-unknown-height-fix {
      position: relative;
      flex: 1 1 0;
      padding: 7px 0;
      color: transparent;
      line-height: 22.8571px;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      padding: 7px 0;
      color: $text-grey-light;
      line-height: 22.8571px;
      border-bottom: 1px solid $border-grey;
    }

    &__input-placeholder-animated {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      display: block;
      width: 50px;
      height: 100%;
      padding: 7px 0;
      overflow: visible;
      color: $text-grey-light;
      line-height: 22.8571px;
      white-space: nowrap;
      transform: scale(1) translate(0, 0);
      cursor: text;
      transition: transform 0.3s;

      @at-root .auth__input:focus ~ &,
        .auth__input.have-value ~ & {
        transform: translate(-27px, -75%) scale(0.85);
        transition: transform 0.3s;
      }
    }

    &__input-underline-animated {
      position: absolute;
      bottom: -1px;
      left: 0;
      z-index: 3;
      display: block;
      width: 100%;
      height: 2px;
      background: $block-orange;
      transform: scaleX(0);
      transition: transform 0.3s;
      will-change: transform;

      @at-root .auth__input:focus ~ & {
        transform: scaleX(1);
        transition: transform 0.3s;
        will-change: transform;
      }
    }

    .auth__button {
      margin-bottom: 10px;
    }
  }
</style>
