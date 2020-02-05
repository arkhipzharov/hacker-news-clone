import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const routerOptions: RouterOptions = { routes };

const router = new VueRouter(routerOptions);

export default router;
