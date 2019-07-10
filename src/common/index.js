import Vue from 'vue';
import router from './services/router'
import { initState } from './services/state'
import './services/proto'
import './style.less'
import './comps'

export function init(app, key) {
    Vue.config.productionTip = false;
    Vue.prototype.$state = initState(key);
    new Vue({
        el: '#app',
        router,
        render: h => h(app),
    })
}