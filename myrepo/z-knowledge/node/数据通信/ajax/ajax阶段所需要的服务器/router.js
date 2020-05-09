
var express = require('express')
const multipart = require('connect-multiparty');
const cm = multipart();
// 引入处理模块
var handler = require('./handler')
// 创建路由实例
var router = express.Router()


// 添加路由配置--挂载路由配置
// 当触发某个路由规则的时候，会自动的触发路由配置中的回调函数，同时会默认给回调函数两个参数值：req,res
router.get('/getinfo',handler.getinfo)
      .get('/getUserList',handler.getUserList)
      .get('/validataUserName',handler.validataUserName)
      .get('/',handler.getIndexPage)
      .get('/index',handler.getIndexPage)
      .get('/add',handler.getAddPage)
      .get('/edit',handler.getEditPage)
      .get('/delete',handler.doDelete)
      .get('/login',handler.getLoginPage)
      .post('/login',handler.doLogin)
      .get('/exit',handler.exit)
      .get('/getjson',handler.getjson)
      .get('/getcode',handler.getcode)
      .get('/register.html',handler.getregister)
      .get('/getalldata',handler.getalldata)
      .get('/getHeroById',handler.getHeroById)
      .post('/addUser',cm,handler.addUser)
      .post('/edit',handler.doEdit)
      .post('/uploadFile',handler.doFileUpload)
      .post('/doRegister',cm,handler.doRegister)
      .get('/getxml',handler.getxml)
      .post('/add',handler.doAdd)


module.exports = router