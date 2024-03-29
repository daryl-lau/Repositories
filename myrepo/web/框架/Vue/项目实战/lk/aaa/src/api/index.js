import request from './request'

// 1. 定义基础路径
const BASE_URL = '/local_api';

// 2. 请求的方法
// 2.1 请求首页的轮播图
export const getHomeCasual = () => request(BASE_URL + '/api/homecasual');
// 2.2 请求首页的导航
export const getHomeNav = () => request(BASE_URL + '/api/homenav');
// 2.3 请求首页的商品列表
export const getHomeShopList = () => request(BASE_URL + '/api/homeshoplist');

// 3. 推荐数据请求
const PDD_BASE_URL = '/api';
// 3.1 请求推荐列表的数据
export const getRecShopList = (params) => request(PDD_BASE_URL, params);

// 4. 搜索列表
export const getSearchgoods = () => request(BASE_URL + '/api/searchgoods');

// 5. 获取短信验证码
export const getPhoneCode = (phone) => request(BASE_URL + '/api/send_code', {phone});

// 6. 手机验证码登录
export const phoneCodeLogin = (phone, code) => request(BASE_URL + '/api/login_code', {phone, code}, 'POST');

// 7. 用户名和密码登录
export const pwdLogin = (name, pwd, captcha)=> request(BASE_URL + '/api/login_pwd', {name, pwd, captcha}, 'POST');

// 8. 自动登录
export const getUserInfo = () => request(BASE_URL + '/api/userinfo');

// 9. 退出登录
export const getLogOut = () => request(BASE_URL + '/api/logout');



