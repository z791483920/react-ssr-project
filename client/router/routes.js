import React from 'react';
import { Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Tree from '../pages/Tree';
// import TestHook from '../pages/TestHook';

export default [
    {
        path: '/',
        // component: Home,
        component: loadable(() => import('../pages/Home'), {
            fallback: <h2> Loading.... </h2>
        }),
        // component: () => import('../pages/Home'),
        exact: true
    },
    {
        path: '/login',
        component: loadable(() => import('../pages/Login')),
        // component: Login,

        exact: true
    },
    {
        path: '/login/:id',
        component: () => <div> 12313123 dadsasd </div>
    },
    {
        path: '/tree',
        // component: Tree
        component: loadable(() => import('../pages/Tree'))
    },
    {
        path: '/testHook',
        // component: TestHook
        component: loadable(() => import('../pages/TestHook'))
    },
    {
        component: () => (
            <Redirect
                exact
                from="/ff"
                to={{
                    pathname: '/1214as'
                }}
            />
        )
    }
];
