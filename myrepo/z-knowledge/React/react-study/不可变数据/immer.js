const { produce, applyPatches, enablePatches } = require('immer')

enablePatches()

let obj = {
  a: { b: [1, 2, 3] },
  b: 2
}

//! 第一种使用方式
// 直接用传入对象和处理函数
let newObj = produce(obj, draft => {
  draft.c = 1000
  draft.a.b[0] = '1111'
})


console.log(newObj);

console.log(newObj === obj);    // false


// 当producer函数没有做任何修改时，就是返回原对象
let newObj2 = produce(obj, draft => { })

console.log(newObj2 === obj);   // true


// produce返回的对象是frezze的，无法对返回的对象做修改
newObj2.a.b[3] = 10
console.log(newObj2.a.b);     // 并没有做修改
// newObj2.a.b.push(4)        // 直接报错


//! 第二种使用方式
// 利用高阶函数，返回一个处理函数
let producer = produce(draft => {
  draft.a.b[0] = 1000
})

let newObj3 = producer(obj)
console.log(newObj3);

//! 如果处理函数有返回值，那么返回的新对象就是该返回值，如果没有则根据draft的操作进行返回
let newObj4 = produce(obj, draft => {
  return { a: 111 }
})

console.log(newObj4);


console.log('-'.repeat(100));

//! patch补丁功能
let initState = {
  x: 100,
  y: { n: 300 }
}

let changes = []
let inverseChanges = []

let fork = initState

fork = produce(
  fork,
  draft => {
    draft.x = 200
    draft.y.n = 200
  },
  (patches, inversePatches) => {
    // replaces = patches.filter(patch => patch.op === 'replace')
    // inverseReplaces = inversePatches.filter(patch => patch.op === 'replace')
    changes.push(patches)
    inverseChanges.push(inversePatches)
    // changes.push(...patches)
    // inverseChanges.push(...inversePatches)
  }
)

fork = produce(
  fork,
  draft => {
    draft.z = 200
  },
  (patches, inversePatches) => {
    // replaces = patches.filter(patch => patch.op === 'replace')
    // inverseReplaces = inversePatches.filter(patch => patch.op === 'replace')
    changes.push(patches)
    inverseChanges.push(inversePatches)
    // changes.push(...patches)
    // inverseChanges.push(...inversePatches)
  }
)
console.log(fork);

console.log(changes);
console.log(inverseChanges);

let step1 = applyPatches(initState, changes[0])
let step2 = applyPatches(step1, changes[1])
console.log(step1);
console.log(step2);



let back1 = applyPatches(fork, inverseChanges[1])
let back2 = applyPatches(back1, inverseChanges[0])
console.log(back1);
console.log(back2);

console.log(initState === back2);


// let patchState = applyPatches(state, changes)

// console.log(patchState);

// let inverseState = applyPatches(patchState, inverseChanges)

// console.log(inverseState);