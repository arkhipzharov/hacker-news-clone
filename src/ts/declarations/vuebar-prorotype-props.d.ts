import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $vuebar: {
      [propName: string]: any;
    };
  }
}
