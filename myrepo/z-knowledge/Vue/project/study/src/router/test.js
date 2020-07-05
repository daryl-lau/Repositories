import Vue from 'vue'
import Router from '../plugins/vue-router'

import List from '../components/List'
import Add from '../components/Add'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/list', component: List },
    { path: '/add', component: Add }
  ]
})

export default router
