import Vue from 'vue'
import Router from 'vue-router'


// 引入一级界面
import home from './../pages/home/home.vue'
import intro from './../pages/intro/intro.vue'
import search from './../pages/search/search.vue'
import chat from './../pages/chat/chat.vue'
import mine from './../pages/mine/mine.vue'
import login from './../pages/login/login'

// 引入二级界面
import department from './../pages/home/department/department'
import dress from './../pages/home/dress/dress'
import electrical from './../pages/home/electrical/electrical'
import foods from './../pages/home/foods/foods'
import hots from './../pages/home/hots/hots'
import mbaby from './../pages/home/mbaby/mbaby'
import mens from './../pages/home/mens/mens'
import shoes from './../pages/home/shoes/shoes'
import underwear from './../pages/home/underwear/underwear'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/home', component: home,
            children: [
                {path: 'department', component: department, meta: {isShow: true}},
                {path: 'dress', component: dress, meta: {isShow: true}},
                {path: 'electrical', component: electrical, meta: {isShow: true}},
                {path: 'foods', component: foods, meta: {isShow: true}},
                {path: 'hots', component: hots, meta: {isShow: true}},
                {path: 'mbaby', component: mbaby, meta: {isShow: true}},
                {path: 'mens', component: mens, meta: {isShow: true}},
                {path: 'shoes', component: shoes, meta: {isShow: true}},
                {path: 'underwear', component: underwear, meta: {isShow: true}},
                {path: '/', redirect: 'hots'}
            ]
        },
        {
            path: '/intro', component: intro, meta: {isShow: true}
        },
        {
            path: '/search', component: search, meta: {isShow: true}
        },
        {
            path: '/chat', component: chat, meta: {isShow: true}
        },
        {
            path: '/mine', component: mine, meta: {isShow: true}
        },
        {
            path: '/login', component: login, meta: {isShow: false}
        },
        {
            path: '/', redirect: '/home'
        }
    ]
})
