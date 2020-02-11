import Vue from 'vue';
import VueTruncate from 'vue-truncate-filter';
import { Plugin as fragment } from 'vue-fragment';
import moment from 'moment';
import stripHtml from 'string-strip-html';
import './reusable-global-components';

Vue.use(VueTruncate);
Vue.use(fragment);

// using prototype to not import things every time
// https://medium.com/@andrejsabrickis/https-medium-com-andrejsabrickis-create-simple-eventbus-to-communicate-between-vue-js-components-cdc11cd59860
Vue.prototype.$evBus = new Vue();
Vue.prototype.$moment = moment;
Vue.prototype.$stripHtml = stripHtml;

// "Property '$evBus' does not exist on type 'CombinedVueInstance..'"
// Declared here for easier editing
declare module 'vue/types/vue' {
  interface Vue {
    $evBus: {
      $on: (
        eventName: string,
        callback?: (payload?: any) => void,
      ) => void | Promise<void>;
      $emit: (eventName: string, payload?: any) => void | Promise<void>;
      $off: (eventName: string, funToOff?: Function) => void | Promise<void>;
    };
    $moment: () => string;
    $stripHtml: () => string;
  }
}
