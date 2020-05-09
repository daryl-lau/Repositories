const assert = require('assert');

// assert(条件，消息)

//  以下所有的assert，仅当条件失败时，才返回信息并退出程序，成功不返回任何信息

assert(5 > 3, '成功');
// 失败直接退出程序
assert(5 < 3, '失败');



//assert.deepEqual(变量，预期值, msg)，仅比较值，不比较类型，相当于‘==’
assert.deepEqual(123, '123', '匹配');
assert.deepEqual(123, '1234', '不匹配');

//assert.deepStrictEqual(变量，预期值, msg)，严格比较，不仅比较值，还比较类型，相当于‘===’
assert.deepStrictEqual(123, 123, '匹配');
assert.deepStrictEqual(123, '123', '不匹配');
