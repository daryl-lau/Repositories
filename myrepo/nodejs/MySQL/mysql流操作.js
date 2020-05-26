let mysql = require('mysql');
const fs = require('fs')

let connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 33306,
    user: 'root',
    password: 'baihuzi.com',
    database: 'mydb'
})

// let writeStream = fs.createWriteStream('./test.txt')

// connection.query('SELECT * FROM `mydb`.`sp_attribute`', (err, data) => {
//     console.log(data);
// });


var query = connection.query('SELECT * FROM `mydb`.`sp_attribute`');
query
    .on('error', function (err) {
        // Handle error, an 'end' event will be emitted after this as well
    })
    .on('fields', function (fields) {
        // the field packets for the rows to follow
    })
    .on('result', function (row) {
        // Pausing the connnection is useful if your processing involves I/O
        connection.pause();

        processRow(row, function () {
            connection.resume();
        });
    })
    .on('end', function () {
        // all rows have been received
        console.log('all rows have been received');
    });


function processRow(row, cb) {
    console.log(row, Date.now());
    setTimeout(cb, 1000)
}