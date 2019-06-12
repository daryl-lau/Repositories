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
                {path: 'department', component: department},
                {path: 'dress', component: dress},
                {path: 'electrical', component: electrical},
                {path: 'foods', component: foods},
                {path: 'hots', component: hots},
                {path: 'mbaby', component: mbaby},
                {path: 'mens', component: mens},
                {path: 'shoes', component: shoes},
                {path: 'underwear', component: underwear},
                {path: '/', redirect: 'hots'}
            ]
        },
        {
            path: '/intro', component: intro
        },
        {
            path: '/search', component: search
        },
        {
            path: '/chat', component: chat
        },
        {
            path: '/mine', component: mine
        },
        {
            path: '/login', component: login, meta: {isShow: true}
        },
        {
            path: '/', redirect: '/home'
        }
    ]
})
