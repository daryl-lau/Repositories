import request from './request'

export const getSwiper = () => request.get('/home/swiper')
export const getGroups = (areaId) => request.get('/home/groups', { params: { area: areaId } })
export const getNews = (areaId) => request.get('/home/news', { params: { area: areaId } })
export const getCityInfo = (cityName) => request.get('/area/info', { params: { name: cityName } })
export const getCityList = (level) => request.get('/area/city', { params: { level: level } })
export const getHotCityList = () => request.get('/area/hot')
export const getHouseInfo = (areaId) => request.get('/area/map', { params: { id: areaId } })
export const getHouseList = (params) => request.get('/houses', { params: params })
export const getCondition = (areaId) => request.get('/houses/condition', { params: { id: areaId } })
export const getHouseDetail = (houseCode) => request.get(`/houses/${houseCode}`)

export const login = (username, password) => request.post('/user/login', { username, password }, { timeout: 5000, })

export const getUserInfo = () => request.get('/user')

export const logout = () => request.post('/user/logout')

export const addFavorite = (houseCode) => request.post(`/user/favorites/${houseCode}`)
export const getFavorite = (houseCode) => request.get(`/user/favorites/${houseCode}`)
export const delFavorite = (houseCode) => request.delete(`/user/favorites/${houseCode}`)

export const getPublishedHouses = () => request.get('/user/houses')

export const getCommunity = (keyword, cityId) => request.get('/area/community', { params: { name: keyword, id: cityId } })

export const uploadImg = filesFormData => request.post('houses/image', filesFormData, { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 5000 })

export const addHouse = body => request.post('/user/houses', body, { timeout: 5000 })