import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// import HeroLists from '../components/HeroLists'
// import List from '../components/List'
// import Add from '../components/Add'
// import Edit from '../components/Edit'

// import testPage from '../components/myComps/testPage'

// import Zb from '@/views/Zb'
const Zb = () => import(/* webpackChunkName: "hero" */ '@/views/Zb');
const HeroLists = () => import(/* webpackChunkName: "hero" */ '@/components/HeroLists');
const List = () => import(/* webpackChunkName: "hero" */ '@/components/List');
const Add = () => import(/* webpackChunkName: "hero" */ '@/components/Add');
const Edit = () => import(/* webpackChunkName: "hero" */ '@/components/Edit');
const testPage = () => import(/* webpackChunkName: "hero" */ '@/components/myComps/Form/testPage');

const routes = [
  { path: '/', redirect: '/hero/list' },
  {
    path: '/hero', component: HeroLists, children: [
      { path: '', redirect: 'list' },
      { path: 'list', component: List },
      { path: 'add', component: Add },
      { name: 'edit', path: 'edit/:id', component: Edit },
    ]
  },
  { path: '/jn', component: testPage },
  { path: '/zb', component: Zb }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router
