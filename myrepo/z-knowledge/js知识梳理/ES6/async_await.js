const axios = require('axios')

// async 会把一个普通函数变为promise对象，函数的返回值作为.then()的入参
// 返回的错误也可以被.catch() 捕获，在.then() 的第二个函数参数中也可以被捕获
async function func1 () {
  return 123
}

func1().then((data) => { console.log(data); })


async function func2 () {
  throw new Error('出错了');
}

func2().then(
  v => console.log(v),
  // e => console.log(e)
).catch(e => console.log(e))
// Error: 出错了


// await 可以后面可以是一个promise或者直接返回数据
async function func3 () {
  return await 11111
}

func3().then(v => console.log(v))


function func4 () {
  return new Promise((resolve, reject) => {
    resolve('111')
  })
}

async function func5 () {
  let res = await func4()
  console.log(res);

  // await func4() 相当于给了函数的.then 一个resolve函数，将其结果作为返回值
  // await func4()  <==>  func4().then(v => v)

}

func5()

console.log('end');


// 封装练习
function get (url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
      resolve(res.data)
    }).catch((e) => { reject(e) })
  })
}

async function getData () {
  let res
  try {
    res = await get('https://baihuzi.com:5443/home/swiper')
  } catch (e) {
    console.log(e);
  }
  console.log(res);
}

// function getData () {
//   get('https://baihuzi.com:5443/home/swiper').then((res) => {
//     console.log(res);
//   })
// }

getData()