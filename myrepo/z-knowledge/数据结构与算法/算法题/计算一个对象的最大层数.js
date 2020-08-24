let obj = { a: { b: { c: {} } }, c: { c: { c: { c: { c: { c: { c: {} } } } } } }, fn: () => { } }


function testLevel (param) {
  const isObject = Object.prototype.toString.call(param) === '[object Object]';
  if (!isObject) return 0;

  const level = 1;
  let childrenLevel = 0;
  Object.entries(param)
    .map(([key, value]) => {
      const valueLevel = testLevel(value, level);

      if (valueLevel > childrenLevel) childrenLevel = valueLevel;
    });
  return level + childrenLevel;
}

console.log(testLevel(obj));



function getDeep (obj, deep = 0) {
  let maxDeep = deep
  if (typeof obj === 'object') {
    let i
    for (const j in obj) {
      if ((i = getDeep(obj[j], deep + 1)) > maxDeep) {
        maxDeep = i
      }
    }
  }
  return maxDeep
}

console.log(getDeep(obj));