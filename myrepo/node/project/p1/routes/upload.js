var express = require('express');
var router = express.Router();
var formidable = require('formidable');


router.post('/', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = '../UploadDir';
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if(err){
            throw err;
        }
        console.log(fields);
        console.log(files);
        res.end('success111');
    })
    // form.on('progress', function (bytesReceived, bytesExpected) {
    //     console.log(bytesExpected);
    //     console.log(bytesReceived);
    // });
    // res.end('success222');
});

module.exports = router;
