// 异步转同步，获取actions提交的状态,进行同步处理


import {
    GET_HOME_CAROUSEL,
    GET_HOME_NAV,
    GET_HOME_SHOP_LIST,
    GET_HOME_BANNER,
    GET_REC_SHOP_LIST
} from './mutation-types'

export default {
    [GET_HOME_CAROUSEL](state, {homecarousel}) {
        state.homecarousel = homecarousel
    },
    [GET_HOME_NAV](state, {homenav}) {
        state.homenav = homenav
    },
    [GET_HOME_SHOP_LIST](state, {homeshoplist}) {
        state.homeshoplist = homeshoplist
    },
    [GET_HOME_BANNER](state, {homebanner}) {
        state.homebanner = homebanner
    },
    [GET_REC_SHOP_LIST](state, {recshoplist}) {
        state.recshoplist = recshoplist
    },
}
