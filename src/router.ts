import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import Main from './components/pages/Main';

Vue.use(VueRouter);

const routes = [{ path: '/', component: Main, name: 'Main' }];

const routerOptions: RouterOptions = {
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
};

const router = new VueRouter(routerOptions);

export default router;
