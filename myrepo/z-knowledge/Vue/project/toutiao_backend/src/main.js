import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lodash from 'lodash'

import '@/assets/css/normalize.css'
import '@/assets/css/base.css'

Vue.use(ElementUI)

Vue.prototype._ = lodash

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
