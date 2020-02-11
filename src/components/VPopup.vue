<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <transition
      name="fade-backdrop"
      @after-enter="toggleIsPopupContentExist(true)"
    >
      <div
        v-if="isExist"
        class="popup__backdrop"
        @click="toggleIsPopupContentExist(false)"
      >
        <div class="popup__backdrop-inner">
          <transition
            name="zoom"
            @after-leave="close"
          >
            <div
              v-if="isPopupContentExist"
              class="popup"
            >
              <VCard
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
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import resetFactory from '@/mixins/reset-factory';

  interface Data {
    resetMixinNoDataOptionFix: undefined;
  }

  const data: Data = {
    resetMixinNoDataOptionFix: undefined,
  };

  interface DataToReset {
    isPopupContentExist: boolean;
  }

  const dataToReset: DataToReset = {
    isPopupContentExist: false,
  };

  export default mixins(resetFactory<DataToReset>(dataToReset)).extend({
    props: {
      isExist: {
        type: Boolean,
        required: true,
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
        this.reset();
      },
    },
  });
</script>

<style lang="scss">
  .popup {
    width: 100%;

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10002;
      width: 100%;
      height: 100%;
      background-color: rgba($block-black, 0.5);
    }

    &__backdrop-inner {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 20px;
    }

    .popup__popup {
      .card__body {
        padding: 24px;
      }
    }
  }

  .fade-backdrop-enter,
  .fade-backdrop-leave-to {
    opacity: 0;
    transition: opacity 0.3s;
  }

  .fade-backdrop-enter-to,
  .fade-backdrop-leave {
    opacity: 1;
    transition: opacity 0.3s;
  }

  .zoom-enter-active,
  .zoom-leave-active {
    animation-name: zoom;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }

  .zoom-leave-active {
    animation-direction: reverse;
  }

  .fade-tab-content-enter,
  .fade-tab-content-leave-to {
    opacity: 0;
    transition: opacity 0.2s;
  }

  .fade-tab-content-enter-to,
  .fade-tab-content-leave {
    opacity: 1;
    transition: opacity 0.2s;
  }

  @keyframes zoom {
    from {
      transform: scale3d(0.3, 0.3, 0.3);
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
