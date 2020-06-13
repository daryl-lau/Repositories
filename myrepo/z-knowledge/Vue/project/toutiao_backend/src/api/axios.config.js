import axios from 'axios'

axios.defaults.baseURL = 'http://www.klxin.cn:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url != '/login') {
        const token = localStorage.getItem('token')
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default axios