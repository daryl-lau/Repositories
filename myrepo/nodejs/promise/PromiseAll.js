const fs = require('fs');

// Promise.all()接收一个以Promise组成的数组，将所有的异步操作放在里面
// 只有当所有的异步操作都成功的时候，才会进入.then()的resolve，否则报错
// 数组里的异步请求时异步的，同时请求，等所有的请求成功后，再按照Promise的先后进行排序
Promise.all([
    new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/data/a.txt', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }),
    new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/data/b.txt', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }),
    new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/data/c.txt', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
])
    // 如果是Promise.all()，那么.then()第一个参数还是resolve，但是resolve参数是一个arr，
    // 该arr保存的是上面异步请求所有的结果，组成的数组，顺序按照上面Promise的顺序来
    // 第二个参数是reject，reject的参数是res，报错信息，只要上面的异步操作有任何一个错误，都会报错
    .then((arr) => {
        arr.map((value, index) => {
            console.log(`${index}, ${value.toString()}`)
        })
    },
    (res) => {
        console.log('错了');
        console.log(res)
    }
);