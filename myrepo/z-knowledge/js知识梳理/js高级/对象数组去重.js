
// 根据对象的id属性去重
const responseList = [
  { id: 1, a: 1 },
  { id: 2, a: 2 },
  { id: 3, a: 3 },
  { id: 1, a: 4 },
];


let res = responseList.reduce((list, curr) => {
  ids = list.map(item => item.id)
  return ids.includes(curr.id) ? list : [...list, curr]
}, [])

console.log(res);