// 入口文件
// 核心管理对象

import Vue  from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// 1、在当前项目中使用vuex
Vue.use(Vuex);

// // 2、对外暴露Vuex的store对象
export default new Vuex.Store(
    {
        state,
        mutations,
        actions,
        getters,
    }
)
