// http 请求封装
import axios from 'axios'

export default function request(url = '', params = '', method = 'GET') {
    let promise;
    return new Promise((resolve, reject) => {
        if ('GET' === method) {
            let paramsStr = '';
            Object.keys(params).forEach(key => {
                paramsStr += key + '=' + params[key] + '&'
            });
            if (paramsStr !== '') {
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
                url += '?' + paramsStr;
            }
            promise = axios.get(url);
        } else if ('POST' === method) {
            promise = axios.post(url, params);
        }
        promise.then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error)
        })
    })
}
