const express = require('express');

const app = express();

app.get('/',(req, res)=>{
    res.write('hello!');
    res.end();
});

app.get('/app',(req, res)=>{
    res.write('hello,app!');
    res.end();
});

app.listen(3000);