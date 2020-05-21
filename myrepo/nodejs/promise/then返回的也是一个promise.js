
const fs = require('fs')

let readFile = new Promise((resolve, reject) => {
    fs.readFile('./data/test.txt', (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    });
});


readFile
    .then(data => {
        console.log('data', data);
        return '一个新的promise'    // then方法返回的是一个新的Promise实例，第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数
    })
    .then(data => { console.log(data); })  // '一个新的promise'
    .catch(err => { console.log('error', err); })