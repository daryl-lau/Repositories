import { getCityInfo } from '../api'

export const getCurrCity = () => {
  const currCity = localStorage.getItem('hkzf_city')
  if (!currCity) {
    return new Promise((resolve, reject) => {
      try {
        const localCity = new window.BMap.LocalCity();
        localCity.get(async position => {
          const { data: res } = await getCityInfo(position.name)
          window.localStorage.setItem('hkzf_city', JSON.stringify(res.body))
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

