const http = require('http');
const multiparty = require('multiparty');


http.createServer((req, res) => {
    if (req.url === '/upload' && req.method === 'POST') {
        let form = new multiparty.Form({
            uploadDir: './uploads/'
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }
            console.log(fields, files);
        });

        // form的事件处理
        form.on('error', (err) => {
            console.log(err);
        })

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
        res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" });
        res.write('success');
        res.end()
        return
    }


}).listen(3000);