// 操作界面所有状态的异步方法

import {
    GET_HOME_CAROUSEL,
    GET_HOME_NAV,
    GET_HOME_SHOP_LIST,
    GET_HOME_BANNER,
    GET_REC_SHOP_LIST,
    GET_SEARCH_GOODS,
    SYNC_USER_INFO
} from './mutation-types'

import {
    getHomeCarousel,
    getHomeNav,
    getHomeShopList,
    getHomeBanner,
    getRecShopList,
    getSearchGoods
} from './../api'

export default {
    async getHomeCarousel({commit}) {
        const result = await getHomeCarousel();
        if (result.success_code === 200) {
            commit(GET_HOME_CAROUSEL, {homecarousel: result.message})
        }
    },

    async getHomeNav({commit}) {
        const result = await getHomeNav();
        if (result.success_code === 200) {
            commit(GET_HOME_NAV, {homenav: result.message})
        }
    },

    async getHomeShopList({commit}) {
        const result = await getHomeShopList();
        if (result.success_code === 200) {
            commit(GET_HOME_SHOP_LIST, {homeshoplist: result.message})
        }
    },

    async getHomeBanner({commit}) {
        const result = await getHomeBanner();
        if (result.success_code === 200) {
            commit(GET_HOME_BANNER, {homebanner: result.message})
        }
    },

    async getRecShopList({commit}, params) {
        const result = await getRecShopList(params);
        console.log(result);
        if (result.success === true) {
            commit(GET_REC_SHOP_LIST, {recshoplist: result.data})
        }
    },

    async getSearchGoods({commit}) {
        const result = await getSearchGoods();
        if (result.success_code === 200) {
            console.log(result.message);
            commit(GET_SEARCH_GOODS, {searchgoods: result.message})
        }
    },

    syncUserInfo({commit}, params){
        commit(SYNC_USER_INFO, {userinfo: params})
    }

}
