import Vue from 'vue'
import App from './App'
import router from './router'

import wtb from './components/wrapTabBar'
import store from './store'

Vue.use(wtb);

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
