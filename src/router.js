/* eslint-disable object-property-newline */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './components/pages/Main';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Main, name: 'Main' },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
