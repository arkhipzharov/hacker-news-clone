<!-- based on: https://tahazsh.com/nested-transitions-in-vue -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <VTransition @after-enter="toggleIsPopupContentExist(true)">
      <div
        v-if="isExist"
        class="popup__backdrop"
        @click="toggleIsPopupContentExist(false)"
      >
        <div class="popup__backdrop-inner">
          <VTransition
            :name="'zoom'"
            @after-leave="close"
          >
            <div
              v-if="isPopupContentExist"
              class="popup"
            >
              <button
                class="popup__close-button"
                @click="toggleIsPopupContentExist(false)"
              >
                <VIcon :href="'cross'" />
              </button>
              <button class="popup__close-button"></button>
              <VCard
                :isUnderlineExist="isUnderlineExist"
                class="popup__popup"
                @click.native.stop
              >
                <template v-slot:header>
                  <slot name="header"></slot>
                </template>
                <template v-slot:default>
                  <div>
                    <slot></slot>
                  </div>
                </template>
              </VCard>
            </div>
          </VTransition>
        </div>
      </div>
    </VTransition>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  interface Data {
    isPopupContentExist: boolean;
  }

  const data: Data = {
    isPopupContentExist: false,
  };

  export default Vue.extend({
    props: {
      isExist: {
        type: Boolean,
        required: true,
      },
      isUnderlineExist: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    data() {
      return data;
    },
    mounted() {
      this.$evBus.$on('close-popup', () => {
        this.toggleIsPopupContentExist(false);
      });
    },
    methods: {
      toggleIsPopupContentExist(isPopupContentExist: boolean) {
        this.isPopupContentExist = isPopupContentExist;
      },
      close() {
        this.$evBus.$emit('toggle-popup', 'TheAuthPopup');
        this.isPopupContentExist = false;
        this.$evBus.$emit('popup-closed');
      },
    },
  });
</script>

<style lang="scss">
  .popup {
    position: relative;
    width: 100%;

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10002;
      width: 100%;
      height: 100%;
      background-color: rgba($bg-black, 0.5);
    }

    &__backdrop-inner {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 20px;
    }

    &__close-button {
      position: absolute;
      top: 17px;
      right: 17px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;

      > svg {
        width: 10px;
        height: 10px;
        fill: $text-white;
      }
    }

    .popup__popup {
      .card__body {
        padding: 24px;
      }
    }
  }
</style>
