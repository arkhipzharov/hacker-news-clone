<template>
  <div class="app">
    <TheHeader />
    <router-view />
  </div>
</template>

<script>
  import TheHeader from './TheHeader';

  export default {
    components: {
      TheHeader,
    },
    mounted() {
      window.addEventListener('load', () => {
        this.iosSafariFontWeightFix();
      });
    },
    methods: {
      iosSafariFontWeightFix() {
        const ua = window.navigator.userAgent;
        const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        const webkit = !!ua.match(/WebKit/i);
        const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
        if (iOSSafari) {
          document
            .querySelector('body')
            .classList.add('ios-safari-font-weight-fix');
        }
      },
    },
  };
</script>

<style lang="scss">
  html {
    height: 100%;
  }

  body {
    height: 100%;
    min-width: 320px;
    color: $text-white;
    font-family: $font-roboto-slab;
    font-weight: 600;
    background-color: $block-black;

    &.ios-safari-font-weight-fix {
      text-rendering: optimizeLegibility;
      -webkit-text-stroke: 0.5px;
    }
  }

  .app {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    padding: 0 23px;
    display: flex;
    flex-direction: column;

    &.noscroll {
      overflow-y: hidden;
    }
  }
</style>
