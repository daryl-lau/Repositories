// 异步转同步，获取actions提交的状态,进行同步处理


import {
    GET_HOME_CAROUSEL,
    GET_HOME_NAV
} from './mutation-types'

export default {
    [GET_HOME_CAROUSEL](state, {homecarousel}) {
        state.homecarousel = homecarousel
    },
    [GET_HOME_NAV](state, {homenav}) {
        state.homenav = homenav
    },
}
