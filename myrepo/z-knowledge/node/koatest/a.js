const Koa = require('koa')
let app = new Koa()
// 异步函数
const logger = () => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      console.log('logger')
      resolve()
    }, 1000)
  })
}
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})
app.use(async (ctx, next) => {
  console.log(3)
  await logger()
  next()
  console.log(4)
})
app.use((ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})
app.listen(4000)
// 1
// 3
// 2
// 等待1s
// logger
// 5
// 6
// 4