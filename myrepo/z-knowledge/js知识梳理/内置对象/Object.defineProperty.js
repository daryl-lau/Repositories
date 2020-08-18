'use strict'


// Object.defineProperty接收三个参数，
// 第一个参数是需要定义属性的对象
// 第二个参数是需要定义对象的的key值
// 第三个参数是属性描述符，是一个对象

// 属性描述符可以有以下属性：
// value： 描述属性属性的值，默认值undefined
let Person = {}

Object.defineProperty(Person, 'name', {
    value: 'jerry'
})
console.log(Person.name);   // jerry，如果不给value值，则为undefined


// writeable： 该属性是否可以被修改，默认false
let Person1 = {}
Object.defineProperty(Person1, 'name', {
    value: 'jerry',
    writable: true
})
Person1.name = 'tom'
console.log(Person1.name);  // 如果writable为true，则为tom， 否则则为jerry


// configurable：描述该属性是否可以被配置，以及是否可以被删除
let Person2 = {}
Object.defineProperty(Person2, 'name', {
    value: 'jerry',
    writable: true,
    configurable: true
})

delete Person2.name
console.log(Person2.name);  // 如果configurable: true， 则为undefined，否则则为jerry

// 这里有个细节需要注意，当writable设置的是true的时候，即使configurable设置为了false，依旧可以对对象进行重新配置，但不能删除属性
let Person3 = {}
Object.defineProperty(Person3, 'name', {
    value: 'jerry',
    writable: true,
    configurable: false
})
console.log(Person3.name);  // jerry

// delete Person3.name      // 在非严格模式下，会静默失败，在严格模式下，将会抛出异常。
console.log(Person3.name);  // jerry

// 如果上面writable: true,configurable设置为了false，这里依旧可以重新定义属性配置，但不能删除属性
// 如果上面writable: false, configurable设置为了false， 这里就不能重新定义属性配置，也不能删除属性
Object.defineProperty(Person3, 'name', {
    value: 'tom'
})
console.log(Person3.name);  // tom


// 描述是否是可枚举的，如果为false，则不能使用Object.keys或Object.values拿到属性名或属性值
let Person4 = {}
Object.defineProperty(Person4, 'name', {
    value: 'jerry',
    enumerable: false
})
Object.defineProperty(Person4, 'age', {
    value: '18',
    enumerable: true
})
Object.defineProperty(Person4, 'gender', {
    value: 'male',
    enumerable: true
})
console.log(Object.keys(Person4));      // [ 'age', 'gender' ]
console.log(Object.values(Person4));    // [ '18', 'male' ]

for (let key in Person4) {
    console.log(key);                   // age, gender
}

for (let key of Object.keys(Person4)) {
    console.log(key);                   // age, gender
}

for (let values of Object.values(Person4)) {
    console.log(values);                // 18, male
}

// 判断属性是否是可枚举的
console.log(Person4.propertyIsEnumerable('name'));      // false
console.log(Person4.propertyIsEnumerable('age'));       // true
console.log(Person4.propertyIsEnumerable('gender'));    // true


// 当直接给一个对象赋值的时候，默认writable、configurable、enumerable都是true，即：
let Person5 = {}
Person5.name = 'jerry'
// ===等价于
Object.defineProperty(Person5, 'name', {
    value: 'jerry',
    writable: true,
    configurable: true,
    enumerable: true
})

// 但是使用Object.defineProperty定义属性的时候，默认writable、configurable、enumerable都是false，即：
Object.defineProperty(Person5, 'age', {
    value: 18,
})
// ===等价于
Object.defineProperty(Person5, 'age', {
    value: 18,
    writable: false,
    configurable: false,
    enumerable: false
})

// 对象常量
// 结合writable: false 和 configurable: false 就可以创建一个真正的常量属性（不可修改，不可重新定义或者删除）
let Person6 = {}
Object.defineProperty(Person6, 'name', {
    value: 'jerry',
    writable: false,
    configurable: false
})
// Person6.name = 'tom'    // 不可赋值，在非严格模式下，会静默失败，在严格模式下，将会抛出异常。
// delete Person6.name     // 不可删除，在非严格模式下，会静默失败，在严格模式下，将会抛出异常。
// Object.defineProperty(Person6, 'name', {    // 不可重新定义
//     value: 'tom',
// })
console.log(Person6.name);  // jerry


// 禁止扩展
// 如果你想禁止一个对象添加新属性并且保留已有属性，就可以使用Object.preventExtensions(...)
let Person7 = { name: 'jerry' }
Object.preventExtensions(Person7)
// Person7.age = 18         // 在非严格模式下，新增属性会静默失败，在严格模式下，将会抛出异常。
// delete Person7.name      // 可以删除原有的属性

// 对于在阻止扩展之前定义的属性，仍然可以进行操作，如果已经删除了则无法操作
Person7.name = 'tom'
console.log(Person7.name);          // tom

Object.defineProperty(Person7, 'name', {
    value: 'jack',
})
console.log(Person7.name);          // jack

// 密封
// Object.seal()会创建一个密封的对象，
// 这个方法实际上会在一个现有对象上调用object.preventExtensions(...)
// 并把所有现有属性标记为configurable: false。
let Person8 = { name: 'jerry' }
Object.seal(Person8)

// Person8.age = 18     // 不可扩展属性
// delete Person8.name  // 不可删除属性
// 可以操作原有的属性
Object.defineProperty(Person8, 'name', {
    value: 'tom',
})
console.log(Person8.name);


// 冻结
// Object.freeze()会创建一个冻结对象，
// 这个方法实际上会在一个现有对象上调用Object.seal(), 
// 并把所有现有属性标记为writable: false, 这样就无法修改它们的值。
let Person9 = { name: 'jerry' }
Object.freeze(Person9)

// Person9.age = 18     // 不可扩展属性
// delete Person9.name  // 不可删除属性
// Person9.name = 'tom' // 不可操作原有属性





var obj = { __book: '三国演义' }

// getter和setter函数中的this指向传入的对象
// 设置的属性名字需要注意，如果属性名在对象中已经存在了，那么在get的时候会造成死循环，set中也是
Object.defineProperty(obj, 'book', {

    // getter ：是一种获得属性值的方法
    get: function () {
        return '<<' + this.__book + '>>'
    },

    // setter：是一种设置属性值的方法，val参数是设置属性的值
    set: function (val) {
        this.__book = val
    }
})

console.log(obj.book)   // "<<三国演义>>"

obj.book = '水浒传'

console.log(obj.book)   // "<<水浒传>>"

console.log(obj);





let obj1 = { name: 'jerry' }

function defineReactive (obj, key, value) {
    Object.defineProperty(obj, key, {
        get () {
            console.log('get');
            return value
        },
        set (newValue) {
            console.log('set');
            value = newValue
        }
    })
}
defineReactive(obj1, 'name', obj1['name'])

console.log(obj1.name);
obj1.name = 'newName'
console.log(obj1.name);

