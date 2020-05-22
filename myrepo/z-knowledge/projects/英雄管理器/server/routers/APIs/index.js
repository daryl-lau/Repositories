const Router = require('koa-router')
const router = new Router();

const getHero = require('../../controller/admins/getHero')
const validataUserName = require('../../controller/admins/validataUserName')
const addHero = require('../../controller/admins/addHero')
const uploadFile = require('../../controller/admins/uploadFile')
const editHero = require('../../controller/admins/editHero')
const getHeroById = require('../../controller/admins/getHeroById')
const delHero = require('../../controller/admins/delHero')
const register = require('../../controller/admins/register')
const login = require('../../controller/admins/login')
const logout = require('../../controller/admins/logout')
const verifyToken = require('../../controller/admins/verifyToken')


router.get('/', ctx => { ctx.body = 'api' })
router.get('/getHero', getHero);
router.get('/validataUserName', validataUserName);
router.get('/getHeroById', getHeroById)
router.get('/logout', logout)

router.post('/addHero', addHero);
router.post('/uploadFile', uploadFile)
router.post('/editHero', editHero)
router.post('/delHero', delHero)
router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)

module.exports = router.routes();