const fs = require('fs');

fs.readFile(__dirname + '/data/a.txt', (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log(data.toString());
        fs.readFile(__dirname + '/data/b.txt', (err, data) => {
            if (err) {
                throw err;
            } else {
                console.log(data.toString());
                fs.readFile(__dirname + '/data/c.txt', (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(data.toString());
                    }
                });
            }
        });
    }
});