// 操作界面所有状态的异步方法

import {
    GET_HOME_CAROUSEL,
    GET_HOME_NAV,
    GET_HOME_SHOP_LIST,
    GET_HOME_BANNER
} from './mutation-types'

import {
    getHomeCarousel,
    getHomeNav,
    getHomeShopList,
    getHomeBanner
} from './../api'

export default {
    async getHomeCarousel({commit}) {
        const result = await getHomeCarousel();
        // console.log(result.status);
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

}
