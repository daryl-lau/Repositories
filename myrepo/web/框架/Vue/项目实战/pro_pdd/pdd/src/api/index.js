import request from './request'

const BASE_URL = 'http://localhost:8080';

export const getHomeCasual = () => request(BASE_URL + '/api/homecasual');
