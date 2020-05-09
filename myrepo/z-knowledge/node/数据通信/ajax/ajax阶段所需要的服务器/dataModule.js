// 这个模块专门进行数据操作
var mysql = require('mysql');
// 创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    port: 33306,
    user:'root',
    password:'baihuzi.com',
    database:'heima',
    useConnectionPooling: true
})
// 连接不用手动打开，它会自动开启
// 新增 
// 删除
// 修改
// 查询

exports.doRegister = (obj,callback) => {
    var sql = 'insert users set ?'
    connection.query(sql,[obj],(err,results,fields) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

exports.validataUserName = (name,callback)=>{
    var sql = `select id,userName,password,phone from users where userName='${name}'`
    connection.query(sql,(err,results,fields) => {
        if(err){
            callback(err)
        }else{
            callback(null,results[0])
        }
    })
}

// 获取所有数据
exports.getAllData = (callback) =>{
    // 创建sql语句
    var sql = 'select id,name,gender,img from heros where isDelete = 0 order by id'
    // var sql = 'delete from heros where id = 6'
    // 执行操作 query方法是一个异步方法
    // 方法参数说明
    // sql:需要执行的sql语句
    // 回调参数：
    // err:执行失败的错误信息对象
    // results:操作结果。查询的操作结果和增删改不一样。查询是返回一个数组，增删改是返回一个对象，对象中包含受影响行数
    // fields：字段信息，查询返回对应的字段信息，但是增删改的fields为undefined
    connection.query(sql,(err,results,fields) => {
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
    })
}

// 新增数据
exports.insertHero = (obj,callback) => {
    // 1.拼接字符串：创建新增sql语句
    // var sql = "insert into heros(name,gender,img) values('"+obj.name+"','"+obj.gender+"','"+obj.img+"')"
    // 2.ES6的新语法：反引号  ，反引号可以解析变量
    // var sql = `insert into heros(name,gender,img) values('${obj.name}','${obj.gender}','${obj.img}')`
    // 3.使用mysql的特性：它可以设置参数占位  ?就是占位符，说明这个?后期需要替换为一个值.使用占位不再需要添加引号
    var sql = "insert into heros (name,gender,img) values(?,?,?)"
    // 执行新增操作
    // query,其实还可以在sql和回调之间添加一个参数,这个参数就对应着占位符所需要的数据，它是一个数组
    connection.query(sql,[obj.name,obj.gender,obj.img],(err,results,fields) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 实现数据的编辑
// newobj：{id:'',name:'',gender:'',img:''}
exports.editHero = (newobj,callback)=>{
    // 1.创建sql语句 
    // var sql = "update heros set name=?,gender=?,img=? where id = ?"
    // 修改的时候，我们可以这样写：set ?说明它会修改指定的所有数据，这个数组由对应的数据对象来决定，它会将对象中的所有属性值进行修改
    var sql = "update heros set ? where id = ?"
    // 2.执行
    connection.query(sql,[newobj,newobj.id],(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

exports.addUser = (newobj, callback) => {
    console.log(newobj);
    // 1.创建sql语句 
    // var sql = "update heros set name=?,gender=?,img=? where id = ?"
    // 修改的时候，我们可以这样写：set ?说明它会修改指定的所有数据，这个数组由对应的数据对象来决定，它会将对象中的所有属性值进行修改
    var sql = "insert into users set ?"
    // 2.执行
    connection.query(sql,newobj,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 实现数据的删除
exports.deleteHeroById = (id,callback)=>{
    // 1.sql语句 
    // 以后要不轻易将数据真正的删除，所以在以后很多场景都是实现软删除--不是删除，而是添加删除标记
    // var sql = 'delete from heros where id =' + id
    var sql = 'update heros set isDelete = 1 where id='+id
    // 2.执行操作
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 根据id获取用户数据
exports.getHeroById = (id,callback) => {
    var sql = `select id,name,gender,img from heros where id = ${id}`
    connection.query(sql,(err,results,fields) => {
        if(err){
            callback(err)
        }else{
            // results是一个数组，但是我们根据id只能获取到一条记录，所以我们应该返回数组中的第0个元素
            callback(null,results[0])
        }
    })
}


// 实现登陆验证
exports.login = (username,callback) => {
    var sql = `select id,username,userpwd from users where username='${username}'`
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null,results[0])
        }
    })
}