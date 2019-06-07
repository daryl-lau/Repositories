import request from './request'

const BASE_URL = 'http://localhost:1688';
const TEST_BASE_URL = 'https://result.eolinker.com/VJbQKNB97caee6d1f3ed47516692c387054214605594150?';

export const getHomeCarousel = () => request(BASE_URL + '/api/homecasual');

export const getHomeNav = () => request(BASE_URL + '/api/homenav');

export const getHomeShopList = () => request(BASE_URL + '/api/homeshoplist');

export const getHomeBanner = () => request(BASE_URL + '/api/homebanner');


const PDD_BASE_URL = 'http://mobile.yangkeduo.com/proxy/api/api/barrow/query';

export const getRecShopList = (params) => request('/api', params);
