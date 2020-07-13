import { getCityInfo } from '../api'
const CITY_KEY = 'hkzf_city'

export const getCurrCity = () => {
  const currCity = localStorage.getItem(CITY_KEY)
  if (!currCity) {
    return new Promise((resolve, reject) => {
      try {
        const localCity = new window.BMap.LocalCity();
        localCity.get(async position => {
          const { data: res } = await getCityInfo(position.name)
          console.log(res);
          window.localStorage.setItem(CITY_KEY, JSON.stringify(res.body))
          resolve(res.body)
        })
      } catch (error) {
        reject(error)
      }
    })
  } else {
    return Promise.resolve(JSON.parse(currCity))
  }
}

export const isAuth = () => {
  const token = localStorage.getItem('hkzf_token')
  return !!token
}

export const getCity = () => JSON.parse(localStorage.getItem(CITY_KEY)) || {}

export const setCity = value => localStorage.setItem(CITY_KEY, value) 
