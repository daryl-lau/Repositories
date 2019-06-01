import request from './request'

const BASE_URL = 'http://localhost:8080';
const TEST_BASE_URL = 'https://result.eolinker.com/VJbQKNB97caee6d1f3ed47516692c387054214605594150?';

export const getHomeCarousel = () => request(TEST_BASE_URL + 'uri=getHomeCarousel');
