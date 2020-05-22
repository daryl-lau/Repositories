const Koa = require('koa');
const betterBody = require('koa-better-body')
const Mysql = require('mysql');
const Router = require('koa-router');
const co = require('co-mysql')

let app = new Koa();
app.listen(3000);

app.use(betterBody());

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})

const db = Mysql.createPool({
    host: 'localhost',
    port: 33306,
    user: 'root',
    password: 'baihuzi.com',
    database: 'pageDB'
});

app.context.db = co(db);

let router = new Router();

router.get('/getUsers', async (ctx) => {
    let params = ctx.query;

    let sql = genSql(params, 'users.*,class.name as className, subject.name as subjectName')
    let totalSQL = genSql(params, 'count(*) as total', false);

    try {
        let res = await ctx.db.query(sql)
        let total = await ctx.db.query(totalSQL)
        ctx.body = { code: 200, data: res, total: total[0].total }
    } catch {
        ctx.body = { code: 201, msg: '查询失败' }
    }
})

router.get('/getClasses', async (ctx) => {
    await ctx.db.query('select * from class')
        .then((data) => { ctx.body = { code: 200, data } })
        .catch(() => {
            ctx.body = { code: 201, msg: '获取课程失败' }
        })
})

app.use(router.routes())

function genSql(params, coloum, paging = true) {
    let sql = `SELECT ${coloum} from users
    JOIN class on users.class_id = class.id
    JOIN subject on users.subject_id = subject.id
    WHERE 1=1`

    if (params.cid) {
        sql += ` AND class_id = ${params.cid}`
    }
    if (params.gender) {
        sql += ` AND gender = '${params.gender}'`
    }
    if (params.name) {
        sql += ` AND users.name LIKE '%${params.name}%'`
    }

    if (paging) {
        sql += ` ORDER BY users.id limit ${(params.page - 1) * params.pageSize} ,${params.pageSize}`
    }
    return sql
}