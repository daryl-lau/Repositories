const express = require('express');
const cookieSession = require('cookie-session');

let server = express();
server.listen(8080);


server.use(cookieSession({
    name: 'session',

    // 循环秘钥
    keys: ['sdfa97sdfasdfasf922i3n2n3i42h3912', 'sdfjasdfasdf9weqk9s8dfagllopdfd9', 'sdfa89s7df8asdf9as87asohou89v'],

    // 有效期不能太长，一般为20分钟
    maxAge: 20 * 60 * 1000
}));

server.get('/a', (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.session['view']);
    
    if (!req.session['view']) {
        req.session['view'] = 1;
        req.session['aaa'] = 'aaa';
    } else {
        req.session['view']++
    }

    res.send(`欢迎你第${req.session['view']}次访问本站！${req.session['aaa']}`)
});