<template>
  <div v-bar>
    <div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import delay from '@/ts/helpers/proms';

  export default Vue.extend({
    async mounted(): Promise<undefined> {
      await delay(0);
      this.$vuebar.refreshScrollbar(this.$el);
      return undefined;
    },
  });
</script>

<style lang="scss">
  .vb {
    flex: 1 1 0;
  }

  .vb > .vb-content > div {
    padding-right: 8px;
  }

  .vb.vb-invisible > .vb-content > div {
    padding-right: 0;
  }

  .vb > .vb-dragger {
    width: 3px;
    display: flex;
    flex-direction: column;
    right: 0;
    transition: height 100ms ease-out;
  }

  .vb.vb-invisible > .vb-dragger {
    display: none;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    min-height: 10px;
    flex: 1 1 0;
    display: block;
    width: 100%;
    margin: 0;
    background-color: $block-black;
    border-radius: 0;
    -webkit-transition: height 100ms ease-out;
    transition: height 100ms ease-out;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: $block-black;
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: $block-black;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: $block-black;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: $block-black;
  }
</style>
