const Router = require('koa-router');
const Static = require('koa-static')

let staticRouter = new Router();
staticRouter.get(/(\.jpg|\.png|\.gif|\.jpeg)$/i, Static('./static', {
    maxAge: 30 * 86400 * 1000
}));
staticRouter.get(/(\.html|\.htm|\.ico)$/i, Static('./views'))
staticRouter.get(/(\.js|\.css)$/i, Static('./static'))

module.exports = staticRouter.routes();