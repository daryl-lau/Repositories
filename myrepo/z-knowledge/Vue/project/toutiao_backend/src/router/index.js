import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决路由重复点击控制台报错的问题 Error: Avoided redundant navigation to current location: '/xxx'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/Welcome'
import Categories from '@/views/Categories'
import Goods from '@/views/Goods'
import Orders from '@/views/Orders'
import Params from '@/views/Params'
import Reports from '@/views/Reports'
import Rights from '@/views/Rights'
import Roles from '@/views/Roles'
import Users from '@/views/Users'


const routes = [
  {path: '/', redirect: '/welcome'},
  { path: '/login', component: Login },
  {
    path: '/home', component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/Categories', component: Categories },
      { path: '/Goods', component: Goods },
      { path: '/Orders', component: Orders },
      { path: '/Params', component: Params },
      { path: '/Reports', component: Reports },
      { path: '/Rights', component: Rights },
      { path: '/Roles', component: Roles },
      { path: '/Users', component: Users },
    ]
  }
]


const router = new VueRouter({
  routes
})



router.beforeEach((to, from, next) => {

  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    console.log(token);
    if (!token) return next('/login')
    else next()
  }
})

export default router
