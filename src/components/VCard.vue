<!-- eslint-disable prettier/prettier -->
<template>
  <div class="card">
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
      isUnderlineExist: {
        type: Boolean,
        required: false,
        default: true,
      },
      headerText: {
        type: String,
        required: false,
        default: '',
      },
    },
    computed: {
      isPassedContentToSlot() {
        return (name: string) => {
          if (this.$slots[name]) {
            const vnode = this.$slots[name]![0];
            // could not just return condition because prettier wraps it with parens
            // and prop can return undefined
            // "Type 'boolean | undefined' is not assignable to type 'boolean'"
            if (
              vnode.text?.trim().length! > 0 ||
              vnode.children?.length! > 0 ||
              vnode.tag?.includes('vue-component-')
            ) {
              return true;
            }
            return false;
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
