import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../views/Login'

const routes = [
  {path: '/login', component: Login}
]

const router = new VueRouter({
  routes
})

export default router
