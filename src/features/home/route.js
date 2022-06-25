import { Home, Login, Favorite, Register } from './';
import { Redirect } from 'react-router-dom';
import React from 'react';

export default {
  path: '/',
  childRoutes: [
    {
      path: '/home',
      component: Home,
    },
    { path: '/reg', component: Register },
    { path: '/login', component: Login },
    { path: '/favorite', component: Favorite },
  ],
};
