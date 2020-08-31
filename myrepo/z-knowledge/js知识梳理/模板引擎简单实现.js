let template = '姓名：{{name}}，年龄：{{age}}，性别：{{sex}}, {{}}';
let data = {
  name: 'jerry',
  age: 18,
  sex: '男'
}
render(template, data); // 我是姓名，年龄18，性别undefined

function render (template, data) {
  const reg = /\{\{([\w|.]*)\}\}/
  if (reg.test(template)) {
    const res = reg.exec(template)[0]
    const props = reg.exec(template)[1]
    console.log(res, props);
    template = template.replace(res, data[props])
    return render(template, data)
  }
  return template
}

let result = render(template, data)
console.log(result);


// function render (template, data) {
//   const reg = /\{\{.*?\}\}/g
//   if (reg.test(template)) {
//     let res = template.match(reg)
//     res.forEach(item => {
//       template = template.replace(item, data[item.slice(2, -2)])
//     })
//   }
//   return template
// }

// console.log(render(template, data));