import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import Rest from './components/pages/Rest';
import User from './components/pages/User';
import Post from './components/pages/Post';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/top', component: Rest, name: 'Rest' },
  { path: '/top', component: Rest, name: 'Top' },
  { path: '/new', component: Rest, name: 'New' },
  { path: '/best', component: Rest, name: 'Best' },
  { path: '/show', component: Rest, name: 'Show' },
  { path: '/ask', component: Rest, name: 'Ask' },
  { path: '/job', component: Rest, name: 'Job' },
  { path: '/user/:username', component: User, name: 'User' },
  { path: '/post/:id', component: Post, name: 'Post' },
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
