import Vue from 'vue'
import Router from 'vue-router'

import home from './../pages/home/home.vue'
import intro from './../pages/intro/intro.vue'
import search from './../pages/search/search.vue'
import chat from './../pages/chat/chat.vue'
import mine from './../pages/mine/mine.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home', component: home
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
            path: '/', redirect: '/home'
        }
    ]
})
