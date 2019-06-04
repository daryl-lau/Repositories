// 操作界面所有状态的异步方法

import {
    GET_HOME_CAROUSEL,
    GET_HOME_NAV
} from './mutation-types'

import {getHomeCarousel, getHomeNav} from './../api'

export default {
    async getHomeCarousel({commit}) {
        const result = await getHomeCarousel();
        // console.log(result.status);
        if (result.success_code === 200) {
            console.log(result.message);
            commit(GET_HOME_CAROUSEL, {homecarousel: result.message})
        }
    },

    async getHomeNav({commit}) {
        const result = await getHomeNav();
        // console.log(result.status);
        if (result.success_code === 200) {
            console.log(result.message);
            commit(GET_HOME_NAV, {homenav: result.message})
        }
    }
}
