import axios from './axios.config'

export const login = (data, config) => axios.post('/login', data, config)
export const getMenus = (config) => axios.get('/menus', config)

// 用户管理页面
export const getUsers = (data, config) => axios.get('/users', data, config)
export const changeUserState = (uid, state, config) => axios.put(`users/${uid}/state/${state}`, config)
export const addUser = (data, config) => axios.post('/users', data, config)
export const deleteUser = (id, config) => axios.delete(`/users/${id}`, config)
export const getUserById = (id, config) => axios.get(`/users/${id}`, config)
export const modifyUserById = (id, data, config) => axios.put(`/users/${id}`, data, config)
export const allotRoleById = (id, data, config) => axios.put(`/users/${id}/role`, data, config)


// 权限管理页面
export const getRightList = (type, config) => axios.get(`/rights/${type}`, config)
export const getRoles = (config) => axios.get(`/roles`, config)
export const addRole = (data, config) => axios.post(`/roles`, data, config)
export const deleteRole = (id, config) => axios.delete(`/roles/${id}`, config)
export const getRoleById = (id, config) => axios.get(`/roles/${id}`, config)
export const modifyRoleById = (id, data, config) => axios.put(`/roles/${id}`, data, config)
export const removeRoleById = (roleId, rightId, config) => axios.delete(`/roles/${roleId}/rights/${rightId}`, config)
export const allotRightsToRole = (id, data, config) => axios.post(`/roles/${id}/rights`, data, config)


// 商品分类
export const getCateList = (data, config) => axios.get(`/categories`, data, config)
export const getCateById = (catId, config) => axios.get(`/categories/${catId}`, config)
export const changeCateName = (catId, data, config) => axios.put(`/categories/${catId}`, data, config)
export const addCate = (data, config) => axios.post(`/categories`, data, config)
export const deleteCate = (id, config) => axios.delete(`/categories/${id}`, config)

// 分类参数
export const getAttributes = (id, type, config) => axios.get(`/categories/${id}/attributes`, { params: { sel: type } }, config)
export const addAttribute = (catId, data, config) => axios.post(`/categories/${catId}/attributes`, data, config)
export const deleteAttribute = (catId, attrId, config) => axios.delete(`/categories/${catId}/attributes/${attrId}`, config)
export const modifyAttribute = (catId, attrId, data, config) => axios.put(`/categories/${catId}/attributes/${attrId}`, data, config)
export const getAttrById = (catId, attrId, type, config) => axios.get(`/categories/${catId}/attributes/${attrId}`, { params: { attr_sel: type } }, config)


// 商品列表
export const getGoods = (data, config) => axios.get('/goods', { params: data }, config)
export const addGoods = (data, config) => axios.post('/goods', data, config)
export const deleteGood = (id, config) => axios.delete(`/goods/${id}`, config)


// 订单列表
export const getOrders = (data, config) => axios.get('/orders', data, config)

// 物流信息
export const getWuliu = (id, config) => axios.get(`/kuaidi/${id}`, config)

// 报表
export const getReports = (config) => axios.get(`reports/type/1`, config)


