var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/form', function (req, res, next) {
    res.render('form');
});
router.get('/apitest', function (req, res, next) {
    res.render('api_test');
});

module.exports = router;
