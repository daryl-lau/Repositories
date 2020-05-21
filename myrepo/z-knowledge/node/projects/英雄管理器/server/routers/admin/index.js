const Router = require('koa-router');

// let adminIndexPage = require('../../controller/views/adminIndexPage')
// let adminEditPage = require('../../controller/views/adminEditPage')
// let adminAddPage = require('../../controller/views/adminAddPage')

let router = new Router()

// router.get('/login', async (ctx, next) => {
//     await ctx.render('admin/login')
// })

// router.get('/register', async (ctx, next) => {
//     await ctx.render('admin/register')
// })

// router.all('*', async (ctx, next) => {
//     if (ctx.session.administrator) {
//         await next();
//     } else {
//         await ctx.redirect('/admin/login')
//     }
// })

// router.get('/index', adminIndexPage)
// router.get('/edit', adminEditPage)
// router.get('/add', adminAddPage)

module.exports = router.routes();