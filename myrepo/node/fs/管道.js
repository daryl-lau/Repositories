let fs = require('buffer');



let rs = fs.createReadStream('./v.f30.mp4');
let ws = fs.createWriteStream('./new.mp4');

rs.pipe(ws);