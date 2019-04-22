var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
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
        res.end('success');
    })
    // form.on('progress', function (bytesReceived, bytesExpected) {
    //     console.log(bytesExpected);
    //     console.log(bytesReceived);
    // });
});

module.exports = router;
