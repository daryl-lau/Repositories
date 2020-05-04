const http = require('http');
const fs = require('fs');
const querystring = require('querystring')

let server = http.createServer();
server.listen('3000');

server.on('request', (req, res) => {
    if (req.url === '/register' && req.method === 'POST') {
        let param = '';
        req.on('data', (trunk) => {
            param += trunk;
        });
        req.on('end', () => {
            let paramObj = querystring.parse(param);
            fs.readFile('./原生nodejs处理post字符串请求.txt', 'utf-8', (err, data) => {
                if (err) {
                    res.setHeader('Content-Type', 'text/html; charset=utf8')
                    res.end('注册失败');
                } else {
                    let userList = JSON.parse(data);
                    userList.push(paramObj);
                    fs.writeFile('./原生nodejs处理post字符串请求.txt', JSON.stringify(userList), (err) => {
                        if (err) {
                            res.setHeader('Content-Type', 'text/html; charset=utf8');
                            res.end('注册失败');
                        } else {
                            res.setHeader('Content-Type', 'text/html; charset=utf8');
                            res.end('注册成功');
                        }
                    })
                }
            })
        })
    }
})