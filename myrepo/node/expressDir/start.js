const express = require('express');

const app = express();

app.get('/',(req, res)=>{
    res.write('hello!');
    res.end();
});

app.listen(3000);