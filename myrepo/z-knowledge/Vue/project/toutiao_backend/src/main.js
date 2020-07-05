import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import _ from 'lodash'
import VueQuillEditor from 'vue-quill-editor'
import miment from 'miment'


// import '@/plugins/elementUI'

import '@/assets/css/normalize.css'
import '@/assets/css/base.css'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.prototype._ = _

Vue.filter('dateFormat', function (date) {
  return miment(date).format('YYYY-MM-DD hh:mm:ss')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
