// 引入模块
let mgos = require('mongoose');

// 连接数据库
mgos.connect('mongodb://localhost:27017/mongoose');

// 监听连接状态
let db = mgos.connection;

// 连接失败处理
db.on('error', () => {
    console.log('连接数据库失败!');
});

// 连接成功处理
db.once('open', () => {
    console.log('连接数据库成功!')
});

db.once('close', () => {
    console.log('连接数据库断开成功!')
});


// 创建schema对象
let Schema = mgos.Schema;

let personSchema = new Schema({
    name: String,
    age: Number,
    wechat: String,
    gender: {
        type: String,
        default: 'man',
    }
});


// 创建Model集合对象
let personModel = mgos.model('person', personSchema);

// 往集合中插入文档，增
personModel.create(
    {name: 'Mars', age: 23, wechat: 'Mars1990'},
    {name: 'Mars', age: 23, wechat: 'Mars1990'},
    {name: '火星哥', age: 23, wechat: 'Mars1990', gender: 'female'},
    {name: '火星哥', age: 23, wechat: 'Mars1990', gender: 'female'},
    {name: '火星哥', age: 23, wechat: 'Mars1990', gender: 'female'}
    // 如果这里插入schema中没有定义的字段，将不会被插入
, (err)=>{
    if(!err){
        console.log('插入数据成功!');
    }else {
        throw err;
    }
});





//////////////////////////////////////////////////////////////////////////////////////

// 查
// 查询所有
personModel.find({}, (err, result) => {
    if (!err) {
        console.log(result[0]);
    } else {
        throw err;
    }
});

// 条件查询
personModel.find({name: 'Mars'}, (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        throw err;
    }
});

// 查询个别字段
// 方式一
personModel.find({}, {name: 1, _id: 0, gender: 1}, (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        throw err;
    }
});

// 方式二
personModel.find({}, '-_id name age', (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        throw err;
    }
});


//////////////////////////////////////////////////////////////////////////////////////

// 改
personModel.updateOne({name: 'Mars'}, {$set:{age: 20}}, (err, row)=>{
    if(!err){
        console.log('修改成功!');
        console.log(row);
    }else {
        throw err;
    }
});

personModel.updateMany({name: 'Mars'}, {$set:{age: 40}}, (err)=>{
    if(!err){
        console.log('修改成功!');
    }else {
        throw err;
    }
});


personModel.find({}, '-_id name age', (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        throw err;
    }
});


//////////////////////////////////////////////////////////////////////////////////////

// 删
personModel.deleteOne({name: 'Mars'}, (err)=>{
    if(!err){
        console.log('删除成功!')
    }else {
        throw err;
    }
});

personModel.find({}, '-_id name age', (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        throw err;
    }
});