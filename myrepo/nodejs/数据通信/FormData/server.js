const http = require('http');
const multiparty = require('multiparty');


http.createServer((req, res) => {


    let form = new multiparty.Form({
        uploadDir: './uploads/'
    });

    form.parse(req);

    form.on('field', (name, value) => {
        console.log('filed:', name, value)
    });

    form.on('file', (name, file) => {
        console.log('file:', name, file)
    });

    form.on('close', () => {
        console.log('上传成功')
    });

    // 跨域声明
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write('success');
    res.end()

}).listen(8080);