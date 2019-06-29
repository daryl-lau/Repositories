const koa_static = require('koa-static');
const path = require('path');

const static_path = path.resolve(__dirname, '../static');

module.exports = function Static(route, options) {

    options = options || {};
    options.image = options.image || 30;
    options.style = options.style || 30;
    options.html = options.html || 10;
    options.javascript = options.javascript || 1;


    route.all(/(\.jpg)|(\.png)|(\.gif)|(\.jpeg)/i, koa_static(static_path, {
        maxAge: 86400 * 1000 * options.image
    }));
    route.all(/\.css/i, koa_static(static_path, {
        maxAge: 86400 * 1000 * options.style
    }));
    route.all(/(\.html)|(\.htm)/i, koa_static(static_path, {
        maxAge: 86400 * 1000 * options.html
    }));
    route.all(/(\.js)|(\.jsx)/i, koa_static(static_path, {
        maxAge: 86400 * 1000 * options.javascript
    }));
};