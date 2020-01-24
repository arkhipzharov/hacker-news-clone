<!-- eslint-disable prettier/prettier -->
<template>
  <div class="card">
    <a
      v-if="headerText"
      class="card__header"
    >
      {{ headerText }}
    </a>
    <p
      v-if="isPassedContentToDefaultSlot"
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
      isPassedContentToDefaultSlot(): boolean {
        const vnode = this.$slots.default![0];
        return vnode.text?.trim().length! > 0 || vnode.children?.length! > 0;
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
      display: block;
      padding: 15px 20px;
      color: $text-white;
      line-height: 19.2px;
      background-color: $block-orange;

      @at-root .card--purple > & {
        background-color: $block-purple;
      }
    }

    &__body {
      padding: 20px;
      line-height: 26px;
    }

    &__underline-decorator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $block-orange;

      @at-root .card--purple > & {
        background-color: $block-purple;
      }
    }
  }
</style>
