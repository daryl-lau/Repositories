import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import HeroLists from '../components/HeroLists'
import List from '../components/List'
import Add from '../components/Add'
import Edit from '../components/Edit'


const routes = [
  { path: '/', redirect: '/hero/list' },
  {
    path: '/hero', component: HeroLists, children: [
      { path: '', redirect: 'list' },
      { path: 'list', component: List },
      { path: 'add', component: Add },
      { name: 'edit', path: 'edit/:id', component: Edit },
    ]
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router
