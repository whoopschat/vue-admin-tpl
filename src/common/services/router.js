import Vue from 'vue'
import VueRouter from 'vue-router'
import { logout } from '../apis/login';
import { RouteMap } from '../datas/route'
import { getState } from './state'

Vue.use(VueRouter);

const router = new VueRouter(RouteMap);

router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == '/logout') {
        logout();
    }
    if (!getState('userLoggedIn') && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})

export default router
