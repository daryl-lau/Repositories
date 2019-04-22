var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.post('/', function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.uploadDir = '../UploadDir';
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if(err){
            throw err;
        }
        console.log(fields);
        res.end('success');
    });
});

module.exports = router;
