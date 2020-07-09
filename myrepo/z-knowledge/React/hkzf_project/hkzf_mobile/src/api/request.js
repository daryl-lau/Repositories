import axios from 'axios'
import config from '../config'

const request = axios.create({
    baseURL: config.baseURL
})

export default request