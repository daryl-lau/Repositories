import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap 4.5
import 'bootstrap/dist/css/bootstrap.min.css'

import '@/plugins/elementUI.config.js'

// axios
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
