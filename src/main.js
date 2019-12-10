import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './js/libs/svg-sprite-cache';
import './scss/base/base';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './components/App';
import './globals';
import vhFix from './js/startup/vh-fix';

Vue.config.productionTip = false;

Vue.config.devtools = false;

// Import all the icons so that they create an svg sprite and then consider
// deleting, moving and changing them
const icons = require.context('@/assets/img/icons', true, /\.svg$/);
icons.keys().forEach(icons);

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount('.app');

document.addEventListener('DOMContentLoaded', () => {
  vhFix();
});
