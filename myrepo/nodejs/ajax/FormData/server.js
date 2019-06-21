const http = require('http');
const multiparty = require('multiparty');

http.createServer((req, res) => {

    let form = new multiparty.Form({
        uploadDir: './uploads/'
    });

    form.parse(req);

    form.on('filed', (name, value) => {
        console.log('filed:', name, value)
    });

    form.on('file', (name, file) => {
        console.log('file:', name, file)
    });

    form.on('close', () => {
        console.log('上传成功')
    });

}).listen(8080);