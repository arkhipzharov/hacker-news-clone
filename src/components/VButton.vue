<!-- eslint-disable prettier/prettier -->
<template>
  <a
    class="button"
    @click.prevent="optionalHref"
  >
    <div class="button__content">
      <span>
        <slot></slot>
      </span>
      <VIcon :href="'arrow-right-long'" />
    </div>
  </a>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import optionalHref from '@/mixins/optional-href';

  export default mixins(optionalHref).extend({
    props: {
      href: {
        type: [String, Number],
        required: false,
        default: undefined,
      },
    },
  });
</script>

<style lang="scss">
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    background-color: $block-orange;
    border-radius: 2px;
    box-shadow: rgba($shadow, 0.14) 0 2px 2px 0,
      rgba($shadow, 0.2) 0 3px 1px -2px, rgba($shadow, 0.12) 0 1px 5px 0;

    &__content {
      position: relative;

      > span {
        color: $text-white;
        font-size: 14px;
      }

      > svg {
        position: absolute;
        top: 50%;
        left: calc(100% + 12px);
        width: 13px;
        height: 13px;
        transform: translateY(-50%);
        fill: $text-white;
      }
    }
  }
</style>
