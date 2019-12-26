import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/base';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './components/App';
import './globals';
import './ts/startup';

// 'You are running Vue in development mode. Make sure to turn on production
// mode when deploying for production'
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount('.app');
