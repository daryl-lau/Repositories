const Router = require('koa-router');
let getHero = require('../dataModules/getHero')

// let getIndexPage = require('../controller/views/getIndexPage')


let router = new Router();

router.get('/', (ctx) => { ctx.redirect('index.html') })

router.use('/api', require('./APIs'));
router.use('/admin', require('./admin'));

module.exports = router.routes();