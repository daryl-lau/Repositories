import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决路由重复点击控制台报错的问题 Error: Avoided redundant navigation to current location: '/xxx'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// import Login from '@/views/Login'
// import Home from '@/views/Home'
// import Welcome from '@/views/Welcome'
// import Categories from '@/views/Categories'
// import Goods from '@/views/Goods'
// import Orders from '@/views/Orders'
// import Params from '@/views/Params'
// import Reports from '@/views/Reports'
// import Rights from '@/views/Rights'
// import Roles from '@/views/Roles'
// import Users from '@/views/Users'
// import Add from '@/components/Add.vue'

const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login/index')
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home')
const Welcome = () => import(/* webpackChunkName: "Welcome" */ '@/views/Welcome')
const Categories = () => import(/* webpackChunkName: "Categories" */ '@/views/Categories')
const Goods = () => import(/* webpackChunkName: "Goods" */ '@/views/Goods')
const Orders = () => import(/* webpackChunkName: "Orders" */ '@/views/Orders')
const Params = () => import(/* webpackChunkName: "Params" */ '@/views/Params')
const Reports = () => import(/* webpackChunkName: "Reports" */ '@/views/Reports')
const Rights = () => import(/* webpackChunkName: "Rights" */ '@/views/Rights')
const Roles = () => import(/* webpackChunkName: "Roles" */ '@/views/Roles')
const Users = () => import(/* webpackChunkName: "Users" */ '@/views/Users')
const Add = () => import(/* webpackChunkName: "Goods" */ '@/components/Add')

const routes = [
  { path: '/', redirect: '/welcome' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/categories', component: Categories },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Orders },
      { path: '/params', component: Params },
      { path: '/reports', component: Reports, meta: ['数据统计', '数据报表'] },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/users', component: Users },
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
    if (!token) return next('/login')
    else next()
  }
})

export default router
