import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecShopList,
  getSearchgoods,
  getUserInfo,
  getLogOut
} from '../api'

import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  REC_SHOP_LIST,
  SEARCH_GOODS,
  USER_INFO,
  RESET_USER_INFO
} from './mutation-types'


export default {
  // 1. 获取首页轮播图
  async reqHomeCasual({commit}, callBack) {
    getHomeCasual().then((response)=>{
       console.log(response);
    });
    console.log(await getHomeCasual());
    const result = await getHomeCasual();
    if (200 === result.success_code) {
      commit(HOME_CASUAL, {home_casual: result.message});
      callBack && callBack();
    }
  },

  // 2. 获取首页轮播图
  async reqHomeNav({commit}) {
    const result = await getHomeNav();
    if (200 === result.success_code) {
      commit(HOME_NAV, {home_nav: result.message});
    }
  },

  // 3. 获取首页商品列表
  async reqHomeShopList({commit}) {
    const result = await getHomeShopList();
    if (200 === result.success_code) {
      commit(HOME_SHOP_LIST, {home_shop_list: result.message});
    }
  },

  // 4. 请求推荐的列表数据
  async reqRecShopList({commit}, params, callBack) {
    const result = await getRecShopList(params);
    if (true === result.success) {
      commit(REC_SHOP_LIST, {rec_shop_list: result.data});
      // 执行回调
      callBack && callBack();
    }
  },

  // 5. 请求搜索的列表数据
  async reqSearchGoods({commit}) {
    const result = await getSearchgoods();
    if (200 === result.success_code) {
      commit(SEARCH_GOODS, {search_goods: result.message.data});
    }
  },

  // 6. 同步用户的信息
  syncUserInfo({commit}, userInfo) {
     commit(USER_INFO, {userInfo});
  },

  // 7. 获取用户信息
  async reqUserInfo({commit}) {
    const result = await getUserInfo();
    if (200 === result.success_code) {
      commit(USER_INFO, {userInfo: result.data});
    }
  },

  // 8. 退出登录
  async logOut({commit}) {
    const result = await getLogOut();
    if (200 === result.success_code) {
      commit(RESET_USER_INFO);
    }
  },
}
