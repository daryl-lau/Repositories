const fs = require('fs');


// Promise接收两个参数，resolve和reject，resolve在异步操作成功时调用，reject在异步操作失败时调用
// resolve和reject不是Promise提供，而是在使用.then时自己写，.then()接收两个函数作为参数，第一个是自己写的resolve，第二个是自己写的reject


// 1、创建promise对象，一经创建，立马执行
new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/data/a.txt', (err, data) => {
        if (err) {
            reject(err);
        } else {
            // 请求成功时，调用.then()里面自己写的resolve函数
            resolve(data);
        }
    });
}).then(
    // 下面这个函数式作为上面Promise的resolve使用
    (data) => {
        console.log(data.toString());
        // 返回一个新的Promise以用来链式调用
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + '/data/b.txt', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    },
    (err) => {
        console.log(err)
    }
).then((data) => {
    console.log(data.toString());
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/data/c.txt', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}).then((data) => {
    console.log(data.toString());
});