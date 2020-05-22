const path = require('path')
const fs = require('fs')

module.exports = ctx => {
    let filePath = ctx.request.files[0].path;
    let ext = path.extname(ctx.request.files[0].name);
    fs.renameSync(filePath, filePath + ext);
    ctx.body = { code: 200, imgUrl: 'http://localhost:8080/uploads/' + path.basename(filePath) + ext }
}