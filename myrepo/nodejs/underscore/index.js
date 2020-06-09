let _ = require('underscore');

// 记录一下underscore中一些有用的方法

// 随机洗牌函数
{
    let arr = ['1', '2', '3', '4', 'a', 'b', 'c', 'd', 'e'];
    let res = _.shuffle(arr);
    console.log(res);   // ['e', 'a', 'd', 'b', '3', '1', '2', '4', 'c']   每次都不一样
}

// 随机取样，可用于生成验证码
{
    let arr = ['1', '2', '3', '4', 'a', 'b', 'c', 'd', 'e'];
    let res = _.sample(arr, 4)
    console.log(res);   // [ 'e', 'a', '4', '3' ]

    let code = res.join('')
    console.log(code);
}


{
    // random _.random(min, max)
    // 返回一个min 和 max之间的随机整数。如果你只传递一个参数，那么将返回0和这个参数之间的整数。
    let res = _.random(0, 100);
    console.log(res);   // 77
}


{
    // escape _.escape(string)
    // 转义HTML字符串，替换 &, <, >, ", ', 和 /字符。
    let res = _.escape("<button type='submit' id='submit'>  </button>");
    console.log(res);       // &lt;button type=&#x27;submit&#x27; id=&#x27;submit&#x27;&gt;  &lt;/button&gt;
}

{
    // unescape _.unescape(string)
    // 和escape相反。转义HTML字符串，替换 &, & lt;, & gt;, & quot;, &#96;, 和 &#x2F; 字符。
    let res = _.unescape('&lt;button type=&#x27;submit&#x27; id=&#x27;submit&#x27;&gt;  &lt;/button&gt;');
    console.log(res);
}

{
    // now _.now()
    // 一个优化的方式来获得一个当前时间的整数时间戳。可用于实现定时 / 动画功能。
    let res = _.now();
    console.log(res);
}

{
    // flatten _.flatten(array, [shallow])
    // 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。
    let res = _.flatten([1, [2], [3, [[4]]]]);
    console.log(res);       // [ 1, 2, 3, 4 ]

    let res2 = _.flatten([1, [2], [3, [[4]]]], true);
    console.log(res2);      // [ 1, 2, 3, [ [ 4 ] ] ]
}

{
    // union _.union(* arrays)
    // 返回传入的 arrays（数组）并集：按顺序返回，返回数组的元素是唯一的，可以传入一个或多个 arrays （数组）。
    let res = _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    console.log(res);       // [1, 2, 3, 101, 10]
}

{
    // intersection _.intersection(*arrays)
    // 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。
    let res = _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    console.log(res);       // [1, 2]
}

{
    // uniq _.uniq(array, [isSorted], [iteratee]) Alias: unique
    // 返回 array去重后的副本, 使用 === 做相等测试.如果您确定 array 已经排序, 那么给 isSorted 参数传递 true值, 此函数将运行的更快的算法.
    // 如果要处理对象元素, 传递 iteratee函数来获取要对比的属性。
    let res = _.uniq([1, 2, 1, 4, 1, 3]);
    console.log(res);       // [1, 2, 4, 3]
}


{
    // object _.object(list, [values])
    // 将数组转换为对象。传递任何一个单独[key, value]对的列表，或者一个键的列表和一个值得列表。成对（Pairs）传递 则是 pairs 的反函数。
    // 如果存在重复键，最后一个值将被返回。
    let res = _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
    console.log(res);       // { moe: 30, larry: 40, curly: 50 }

    let res2 = _.object([['moe', 30], ['larry', 40], ['curly', 50]]);   // 这类似于Map数据结构
    console.log(res2);      // { moe: 30, larry: 40, curly: 50 }
}

{
    // pairs _.pairs(object)
    // 把一个对象转变为一个[key, value]形式的数组。object 逆向函数。
    let res = _.pairs({ one: 1, two: 2, three: 3 });
    console.log(res);       // [["one", 1], ["two", 2], ["three", 3]]
}


{
    // zip _.zip(* arrays)
    // 将每个 arrays 中相应位置的值合并在一起。 当您有通过匹配数组索引进行协调的独立数据源时，这非常有用。 
    // 结合 apply 一起使用传入一个二维数组。 如果你用来处理矩阵嵌套数组时，则可以使用它来转换矩阵。
    // 和python的zip函数类似
    let res = _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false]);
    console.log(res);       // [["moe", 30, true], ["larry", 40, false], ["curly", 50, undefined]]
}

{
    // unzip _.unzip(array)
    // 与zip功能相反的函数，给定若干arrays，返回一串联的新数组，其第一元素个包含所有的输入数组的第一元素，其第二包含了所有的第二元素，依此类推。
    let res = _.unzip([["moe", 30, true], ["larry", 40, false], ["curly", 50]]);
    console.log(res);       // [['moe', 'larry', 'curly'], [30, 40, 50], [true, false, undefined]]
}

{
    // mapObject _.mapObject(object, iteratee, [context])
    // 它类似于map，但是这用于对象。转换每个属性的值。

    let res = _.mapObject({ start: 5, end: 12 }, function (val, key) {
        return val + 5;
    });
    console.log(res);       // { start: 10, end: 17 }
}

{
    // extend _.extend(destination, * sources)  和原生Object.assign()一样
    // 将source对象中的所有属性简单地覆盖到destination对象上，并且返回 destination 对象.
    // 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复) 。

    let res = _.extend({ name: 'moe' }, { age: 50 });
    console.log(res);       // { name: 'moe', age: 50 }
}

{
    // isEmpty_.isEmpty(object)
    // 如果object 不包含任何值(没有可枚举的属性) ，返回true。 对于字符串和类数组（array - like）对象，如果length属性为 0，那么_.isEmpty检查返回true。

    let res = _.isEmpty([1, 2, 3]);
    console.log(res);       // false

    let res2 = _.isEmpty({});
    console.log(res2);      // true
}

{
    // pick_.pick(object, * keys)
    // 返回一个object副本，只过滤出keys(有效的键组成的数组)参数指定的属性值。或者接受一个判断函数，指定挑选哪个key。
    let res = _.pick({ name: 'moe', age: 50, userid: 'moe1' }, 'name', 'age');
    console.log(res);       // { name: 'moe', age: 50 }
    let res2 = _.pick({ name: 'moe', age: 50, userid: 'moe1' }, function (value, key, object) {
        return _.isNumber(value);
    });
    console.log(res2);      // { age: 50 }

    // omit_.omit(object, * keys)
    // 返回一个object副本，只过滤出除去keys(有效的键组成的数组)参数指定的属性值。 或者接受一个判断函数，指定忽略哪个key。
    let res3 = _.omit({ name: 'moe', age: 50, userid: 'moe1' }, 'userid');
    console.log(res3);      // { name: 'moe', age: 50 }
    let res4 = _.omit({ name: 'moe', age: 50, userid: 'moe1' }, function (value, key, object) {
        return _.isNumber(value);
    });
    console.log(res4);      // { name: 'moe', userid: 'moe1' }
}
