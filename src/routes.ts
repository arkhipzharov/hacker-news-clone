import { RouteConfig } from 'vue-router';
import Main from './components/pages/Main';
import User from './components/pages/User';
import Post from './components/pages/Post';

const routes: RouteConfig[] = [
  {
    path: '/:wallPostsType',
    component: Main,
    name: 'root',
  },
  {
    path: '/',
    component: Main,
    redirect: {
      name: 'root',
      params: { wallPostsType: 'top' },
    },
    name: 'main',
  },
  {
    path: '/',
    component: Main,
    props: { wallPostsType: 'top' },
    name: 'top',
  },
  {
    path: '/',
    component: Main,
    props: { wallPostsType: 'new' },
    name: 'new',
  },
  {
    path: '/',
    component: Main,
    props: { wallPostsType: 'best' },
    name: 'best',
  },
  {
    path: '/',
    component: Main,
    props: { wallPostsType: 'show' },
    name: 'show',
  },
  {
    path: '/',
    component: Main,
    props: { wallPostsType: 'ask' },
    name: 'ask',
  },
  {
    path: '/',
    component: Main,
    props: { wallPostsType: 'job' },
    name: 'job',
  },
  {
    path: '/user/:username',
    component: User,
    name: 'user',
  },
  {
    path: '/post/:id',
    component: Post,
    name: 'post',
  },
];

export default routes;
