// Замена import '@babel/polyfill';
// Подробнее в комментарии 1 в общем конфиге webpack
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

// it was shown in the browser console:
// You are running Vue in development mode...
Vue.config.productionTip = false;

// Same, but with text:
// Download the Vue Devtools extension for a better development experience...
Vue.config.devtools = false;

// Импортировать все иконки, чтобы из них создался svg спрайт и потом
// учитывать их удаление, перемещение и изменение
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
