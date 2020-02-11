<!-- eslint-disable prettier/prettier -->
<template>
  <div
    v-if="isExist"
    class="card"
  >
    <div
      v-if="isPassedContentToSlot('header')"
      class="card__header"
    >
      <slot name="header"></slot>
    </div>
    <p
      v-if="isPassedContentToSlot('default')"
      class="card__body"
    >
      <slot></slot>
    </p>
    <span
      v-if="isUnderlineExist"
      class="card__underline-decorator"
    ></span>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      isExist: {
        type: Boolean,
        required: false,
        default: true,
      },
      isUnderlineExist: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    computed: {
      isPassedContentToSlot() {
        return (name: string) => {
          const slotData = this.$slots[name];
          if (slotData) {
            const vnode = slotData[0];
            // https://github.com/vuejs/vue/issues/10450
            return (
              // check if not passed '' to slot
              vnode.text?.trim().length! > 0 ||
              // check if passed html or component to slot
              vnode.tag?.includes('vue-component-') ||
              vnode.tag
            );
          }
          return false;
        };
      },
    },
  });
</script>

<style lang="scss">
  .card {
    position: relative;
    overflow: hidden;
    background-color: $block-grey-dark;
    border-radius: 3px;
    box-shadow: rgba($shadow, 0.14) 0 2px 2px 0,
      rgba($shadow, 0.2) 0 3px 1px -2px, rgba($shadow, 0.12) 0 1px 5px 0;

    &__header {
      background-color: $block-orange;

      @at-root .card--submitted > & {
        background-color: $block-purple;
      }

      @at-root .card--post-by > & {
        background-color: $block-blue;
      }
    }

    &__body {
      padding: 20px;
      font-size: 15px;
      line-height: 26px;
    }

    &__underline-decorator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $block-orange;

      @at-root .card--submitted > & {
        background-color: $block-purple;
      }
    }
  }
</style>
