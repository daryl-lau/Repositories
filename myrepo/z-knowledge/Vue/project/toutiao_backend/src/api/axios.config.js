import axios from 'axios'
import router from '@/router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://www.klxin.cn:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url != '/login') {
        const token = localStorage.getItem('token')
        config.headers.Authorization = token
    }
    // 进度条
    NProgress.start()
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.meta.msg == '无效token') {
        router.push('/login')
    }
    // 进度条
    NProgress.done()
    return response;
}, function (error) {
    return Promise.reject(error);
})

export default axios