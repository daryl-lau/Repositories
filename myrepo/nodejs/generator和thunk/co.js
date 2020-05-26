var co = require('co');
const fs = require('fs')


var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

co(function* () {
    // yield any promise
    var result = yield Promise.resolve(true);
}).catch();

co(function* () {
    // resolve multiple promises in parallel
    var a = yield readFile('./data/a.txt')
    var b = yield readFile('./data/b.txt')
    var c = yield readFile('./data/c.txt')

    console.log(a.toString());
    console.log(b.toString());
    console.log(c.toString());
})

console.log(11111);