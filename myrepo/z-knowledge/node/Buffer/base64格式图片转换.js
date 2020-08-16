const fs = require('fs')

let buffer = fs.readFileSync('./ace.jpg')

img = 'data:image/jpg;base64,' + buffer.toString('base64')

console.log(img);



let imgBuffer = img.split(',')[1]
console.log(imgBuffer);

console.log(Buffer.from(imgBuffer, 'base64'));

fs.writeFileSync('./new.jpg', Buffer.from(imgBuffer, 'base64'))