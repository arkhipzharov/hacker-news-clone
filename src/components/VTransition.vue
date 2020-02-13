<!--
  based on: https://vuejsdevelopers.com/2018/02/26/vue-js-reusable-transitions/

  you should always use keyframes animation and this component when
  want to use vue transitions
-->
<!-- eslint-disable prettier/prettier -->
<template>
  <!-- https://github.com/vuejs/vue/issues/8461 -->
  <div
    :is="isGroup ? 'transition-group' : 'transition'"
    :name="name"
    v-bind="$attrs"
    v-on="hooks"
  >
    <slot></slot>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      duration: {
        type: Number,
        required: false,
        default: 300,
      },
      name: {
        type: String,
        required: false,
        default: 'fade',
      },
      isGroup: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    computed: {
      hooks(this: any) {
        return {
          beforeEnter: this.beforeEnter,
          afterEnter: this.afterEnter,
          beforeLeave: this.beforeLeave,
          afterLeave: this.afterLeave,
          // you can set event callback inside specific component with this
          ...this.$listeners,
        };
      },
    },
    methods: {
      beforeEnter(el: HTMLElement) {
        this.setDuration(el);
      },
      afterEnter(el: HTMLElement) {
        this.setDuration(el);
      },
      beforeLeave(el: HTMLElement) {
        this.setDuration(el);
      },
      afterLeave(el: HTMLElement) {
        this.setDuration(el);
        this.triggerScrollToInvokeInfiniteLoading();
      },
      setDuration(el: HTMLElement) {
        el.style.animationDuration = `${this.duration}ms`;
      },
      resetDuration(el: HTMLElement) {
        el.style.animationDuration = '';
      },
      triggerScrollToInvokeInfiniteLoading() {
        // cannot trigger after-leave event on <transition-group> once and
        // invoke infinite loading without just scrolling by 2px down or
        // using setTimeout with animation duration
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      },
    },
  });
</script>

<style lang="scss">
  // only reusable animations must be defined here

  .fade-enter-active,
  .fade-leave-active {
    animation-name: fade;
    animation-fill-mode: both;
  }

  .fade-leave-active {
    animation-direction: reverse;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .zoom-enter-active,
  .zoom-leave-active {
    animation-name: zoom;
    animation-fill-mode: both;
  }

  .zoom-leave-active {
    animation-direction: reverse;
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
