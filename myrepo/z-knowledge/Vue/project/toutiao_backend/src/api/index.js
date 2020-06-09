import axios from './axios.config'

export const login = (data, config) => axios.post('/authorizations', data, config)