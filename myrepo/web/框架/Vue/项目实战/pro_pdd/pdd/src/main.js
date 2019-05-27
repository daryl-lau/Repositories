import Vue from 'vue'
import App from './App'
import router from './router'

import wtb from './components/wrapTabBar'
Vue.use(wtb)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
