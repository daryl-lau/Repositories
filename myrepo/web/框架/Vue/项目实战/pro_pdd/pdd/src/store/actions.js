// 操作界面所有状态的异步方法

import {
    GET_HOME_CAROUSEL
} from './mutation-types'

import {getHomeCarousel} from './../api'

export default {
    async getHomeCarousel({commit}) {
        const result = await getHomeCarousel();
        // console.log(result.status);
        if (result.status === 200) {
            console.log(result.message);
            commit(GET_HOME_CAROUSEL, {homecarousel: result.message})
        }
    }
}
