import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import Main from './components/pages/Main';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/top', component: Main, name: 'Main' },
  { path: '/top', component: Main, name: 'Top' },
  { path: '/new', component: Main, name: 'New' },
  { path: '/best', component: Main, name: 'Best' },
  { path: '/show', component: Main, name: 'Show' },
  { path: '/ask', component: Main, name: 'Ask' },
  { path: '/job', component: Main, name: 'Job' },
  { path: '/launch', component: Main, name: 'Launch' },
];

const routerOptions: RouterOptions = {
  routes,
  scrollBehavior() {
    // reset scroll when re-enter page
    return { x: 0, y: 0 };
  },
};

const router = new VueRouter(routerOptions);

export default router;
