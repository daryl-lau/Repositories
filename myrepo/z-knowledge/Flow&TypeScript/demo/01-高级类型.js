//* 交叉类型，交叉类型是将多个类型合并为一个类型
function fn(first, last) {
    var result = {};
    console.log(first);
    console.log(last);
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in last) {
        if (!result.hasOwnProperty(id)) {
            result[id] = last[id];
        }
    }
    return result;
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        console.log('loooooooooog~');
    };
    return ConsoleLogger;
}());
var res = fn(new Person('jerry'), new ConsoleLogger());
console.log(res);
//* 联合类型
var value;
value = 'string';
value = 100;
value = true;
// value = new Date()    // ERROR
