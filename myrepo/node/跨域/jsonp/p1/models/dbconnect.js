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

// // 创建Model集合对象
let personModel = mgos.model('person', personSchema);

// 创建Model集合对象
// let personModel = mgos.model('person', personSchema);

// module.exports = db;
// module.exports = mgos;
// module.exports = personSchema;
module.exports = personModel;