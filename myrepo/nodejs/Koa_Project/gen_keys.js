const fs = require('fs');

const count = 2048;
const length = 1024;
const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}<>?';



let arr = [];
for (let i = 0; i < count; i++) {
    let str = '';
    for (let j = 0; j < length; j++) {
        let single = char[Math.floor(Math.random() * char.length)];
        str += single;
    }
    arr.push(str)
}

fs.writeFile('./.keys', arr.join('\n'), () => { })


