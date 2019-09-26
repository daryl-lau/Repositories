import axios from 'axios'

export const getGoods = () => {
  return axios.get('/api/goods')
};
