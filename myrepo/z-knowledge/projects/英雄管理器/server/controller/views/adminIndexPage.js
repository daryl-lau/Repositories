// let getHero = require('../../dataModules/getHero');
// const path = require('path')
// const fs = require('fs')

// module.exports = async ctx => {
//     let res = await getHero();
//     // await ctx.render('admin/index', { data: res, administrator: ctx.session.administrator })
//     // await ctx.render('admin/index', { data: res })
//     // fs.readFile(path.resolve(__dirname, '../../views/admin/index.html'), 'utf-8', (err, data) => {
//     //     console.log(data);
//     //     ctx.body = data
//     // })
//     await ctx.render('admin/index', { data: res })
// }