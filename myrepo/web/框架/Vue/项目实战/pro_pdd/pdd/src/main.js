import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import wtb from './components/wrapTabBar'
import store from './store'

import Cube from 'cube-ui'

Vue.use(Cube);
Vue.use(wtb);
Vue.use(MintUI);

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
