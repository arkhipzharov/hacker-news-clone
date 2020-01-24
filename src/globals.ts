import Vue from 'vue';
import Vuebar from 'vuebar';
import VueTruncate from 'vue-truncate-filter';
import moment from 'moment';
import stripHtml from 'string-strip-html';
import './reusable-global-components';

Vue.use(Vuebar);
Vue.use(VueTruncate);

// using prototype to not import things every time

// https://medium.com/@andrejsabrickis/https-medium-com-andrejsabrickis-create-simple-eventbus-to-communicate-between-vue-js-components-cdc11cd59860
Vue.prototype.$evBus = new Vue();
Vue.prototype.$moment = moment;
Vue.prototype.$stripHtml = stripHtml;
