import request from './request'


const BASE_URL = '/local_api';
// const BASE_URL = 'http://localhost:1688';
const TEST_BASE_URL = 'https://result.eolinker.com/VJbQKNB97caee6d1f3ed47516692c387054214605594150?';


export const getHomeCarousel = () => request(BASE_URL + '/api/homecasual');

export const getHomeNav = () => request(BASE_URL + '/api/homenav');

export const getHomeShopList = () => request(BASE_URL + '/api/homeshoplist');

export const getHomeBanner = () => request(BASE_URL + '/api/homebanner');


const PDD_BASE_URL = 'http://mobile.yangkeduo.com/proxy/api/api/barrow/query';

export const getRecShopList = (params) => request('/api', params);



export const getSearchGoods = () => request(BASE_URL + '/api/searchgoods');

// 获取短信验证码
export const getPhoneCode = (phone) => request(BASE_URL + '/api/send_code', {phone});

// 手机短信登录
export const phoneCodeLogin = (phone, code) => request(BASE_URL + '/api/login_code', {phone:phone, code:code}, 'POST');

// 账号密码、图形验证码登录
export const pwdLogin = (username, pwd, code) => request(BASE_URL + '/api/login_pwd', {name: username, pwd: pwd, captcha: code}, 'POST');

export const getUserInfo = () => request(BASE_URL + '/api/userinfo');


