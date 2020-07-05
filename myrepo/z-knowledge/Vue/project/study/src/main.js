import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import router from './router/test'
import store from './store'


import wtb from './components/wrapTabBar'

Vue.use(wtb)

// Bootstrap 4.5
import 'bootstrap/dist/css/bootstrap.min.css'

import '@/plugins/elementUI.config.js'

import '@/icons/index'
// axios
import axios from 'axios'
console.log(process.env.VUE_APP_FLAG)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
