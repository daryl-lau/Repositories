
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);
var co = require('co')

var gen = function* () {
    var r1 = yield readFileThunk('./data/a.text');
    var r2 = yield readFileThunk('./data/b.text');
    console.log(r1.toString());
    console.log(r2.toString());
};

var g = gen();
// 手动的执行
var r1 = g.next();
console.log(r1);        // { value: [Function], done: false }   vale值就是yield出来的thunk函数
r1.value(function (err, data) {   // 执行thunk函数的回调函数, data就是readFileThunk的结果，然后把结果传入给generator
    if (err) throw err;
    // console.log(data.toString()); // aaaaa, 但是一般不在执行器里面处理结果，执行器仅进行流程控制，一般是把得到的结果传给generator，在generator里面进行处理
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if (err) throw err;
        g.next(data);
    });
});
// 自动管理需要自己写一个方法，递归的进行自动处理
function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}

run(gen)

// 有一个大神写的co库，可以进行自动处理
// 效果和自己写的run方法作用一样，但是co内部进行了很多处理，逻辑更加严谨
// 在co的4.0版本中,yield不仅可以是一个thunk函数,也可以是一个Promise对象
co(gen)

// co还支持并发的异步操作,就是把各个一步操作放在一个数组里面,当所有的操作执行成功后,再进行下一步

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

// 数组的写法
co(function* () {
    var res = yield [
        readFile('./data/a.text'),
        readFile('./data/b.text')
    ];
    console.log('res', res);
}).catch();

// 对象的写法
co(function* () {
    var res = yield {
        1: Promise.resolve(1),
        2: Promise.resolve(2),
    };
    console.log(res);
}).catch();

