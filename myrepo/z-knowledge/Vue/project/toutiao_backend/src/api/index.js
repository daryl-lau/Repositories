import axios from './axios.config'

export const login = (data, config) => axios.post('/login', data, config)
export const getMenus = (config) => axios.get('/menus', config)