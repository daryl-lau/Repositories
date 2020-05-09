const http = require('http');
const multiparty = require('multiparty');

http.createServer((req,res)=>{
    let form = new multiparty.Form({
        uploadDir: './upload'
    });

    form.parse(req);

    form.on('field', (name,value)=>{
        console.log('字段', name, value)
    });

    form.on('file', (name, value)=>{
        console.log('文件', name, value)
    });

    form.on('close', ()=>{
        console.log('表单解析完成')
    });

    res.setHeader("Access-Control-Allow-Origin","*");
    res.writeHead(200);
    res.end()
}).listen(3000);