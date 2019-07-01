const fs = require('fs');

const count = 2048;
const length = 1024;
const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]{};<>?!@#$%^&*()_+';

const ws = fs.createWriteStream('./.keys');

for (let i = 0; i < count; i++) {
    let str = '';
    for (let j = 0; j < length; j++) {
        let single = char[Math.floor(Math.random() * char.length)]
        str += single;
    }
    if (i === count - 1) {
        ws.write(str)
    } else {
        ws.write(str + '\n')
    }
}

ws.end();


