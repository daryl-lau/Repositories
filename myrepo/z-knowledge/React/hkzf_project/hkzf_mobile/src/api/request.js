import axios from 'axios'
import config from '../config'

const request = axios.create({
    baseURL: config.baseURL
})

request.interceptors.request.use(config => {
    const { url } = config
    if (url.startsWith('/user') && url !== '/user/login' && url !== '/user/registered') {
        config.headers.authorization = localStorage.getItem('hkzf_token')
    }
    return config
})

request.interceptors.response.use(response => {
    const { data } = response
    if (data.status === 400) {
        localStorage.removeItem('hkzf_token')
    }
    return response
})

export default request