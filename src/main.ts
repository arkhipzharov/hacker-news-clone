import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/base';
import Vue, { CreateElement, VNode } from 'vue';
import router from './router';
import store from './store';
import App from './components/App';
import './globals';
import './ts/startup';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h: CreateElement): VNode => h(App),
});

app.$mount('.app');
