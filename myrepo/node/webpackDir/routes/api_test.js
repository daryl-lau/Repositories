var express = require('express');
var router = express.Router();
var peopleModel = require('./../models/dbconnect');
/* GET home page. */
// router.post('/', function (req, res, next) {
//     var body = req.body;
//     var people = new peopleModel({
//         name: body.name,
//         age: body.age,
//         wechat: body.wechat,
//         gender: body.gender
//     });
//     people.save((err)=>{
//         // console.log('aaa');
//         if(err){
//             throw err;
//         }else {
//             console.log('写入数据成功');
//         }
//     });
//     peopleModel.find()
//     res.end();
// });

router.get('/', function (req, res, next) {
    console.log(req.query);
    peopleModel.findOne({_id: req.query.id}, (err, result) => {
        if (err) {
            // throw err;
            res.json({
                status: 201,
                data: 'query failed'
            })
        } else {
            console.log(result);
            res.json({
                status: 200,
                data: result
            })
        }
    });
});

module.exports = router;
