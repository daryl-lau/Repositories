const fs = require('fs');


// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
// 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
new Promise((resolve, reject) => {
    fs.readFile('./data/a.txt', (err, data) => {
        if (!err) {
            resolve(data)
        } else {
            reject(err)
        }
    })
})
    .then((data) => {
        console.log(data.toString());
        return '在.then()中返回的结果，会传入下一个then的参数中'
    })
    .then((data) => {
        console.log(data);
        return 1
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log('err', err);
    })