import { Home, Login, FavoriteList, Register } from './';
import { Redirect } from 'react-router-dom';
import React from 'react';

export default {
  path: '/',
  childRoutes: [
    {
            path: '/',
      component: Home,
    },
    {
      path: '/home',
      component: Home,
    },
    { path: '/reg', component: Register },
    { path: '/login', component: Login },
    { path: '/favorite', component: FavoriteList },
  ],
};
