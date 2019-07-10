import Login from '../views/Login.vue'
import Error from '../views/Error.vue'
import Main from '../views/Main.vue'

import home from '../../pages/home/index';
import demo from '../../pages/demo/index';

export const HomePage = {
    path: '/'
}

const MainRouteMap = [
    { path: '/', component: home },
    { path: '/demo', component: demo },
];

export const RouteMap = {
    routes: [{
        path: '/login',
        name: '登录',
        component: Login,
        hidden: true
    }, {
        path: '/Error',
        component: Error,
        name: 'Not Found',
        hidden: true
    }, {
        path: '/',
        component: Main,
        children: MainRouteMap
    }, {
        path: '*',
        hidden: true,
        redirect: { path: '/Error' }
    }]
}