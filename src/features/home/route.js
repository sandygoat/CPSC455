import { Home, Login, Favorite } from './';

export default {
  path: '/',
  childRoutes: [{ path: '/', component: Home }, { path: '/home', component: Home }, { path: '/login', component: Login }, { path: '/favorite', component: Favorite }],
};
