const koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');
const cors = require('koa2-cors');
const ejs = require('koa-ejs');
const path = require('path');
let { genCode } = require('./libs/genCode');
let { getDate } = require('./libs/getDate')
let url = require('url');


let server = new koa();
server.listen(8000);

let router = new Router();


// cookie循环秘钥
server.keys = [
    'sdf7as9d8f7asd7f9sdfa9ssdfas8df^*(&(^HASHJD^TA^&SAIJda78a5s5da',
    'sdfasd6fgjhgjgdgjsfgsf5sHSIHD&S^*HId*F*SA*6s7HAsjajasoioasS^&*',
    'nk54h3k2klj78kh89kh5kh3_+)((SLDKKJsaasjdao7687d5a7sdhaj*&T%&jo',
];



ejs(server, {
    root: path.resolve(__dirname, './template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});


server.use(body({
    uploadDir: './upload',
}));

server.use(cors())

server.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(500, e)
    }
});

// 将db变量放到server.context上。可以在全局范围内，用ctx.db访问到变量
server.context.db = require('./libs/mysql');


const query = function (sql, arg) {
    return new Promise((resolve, reject) => {
        server.context.db.query(sql, arg, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    })
}


router.post('/info_submit', async ctx => {
    let { name, phone, car_id, fx, passenger } = ctx.request.fields;
    passenger instanceof Array ? passenger : passenger = new Array(passenger)
    let passengerArr = ['', '', '', '', '', '', '', '', '', '',]
    for (let i = 0; i < passenger.length; i++) {
        passengerArr[i] = passenger[i]
    }

    let user_info = await ctx.db.query(`SELECT * FROM user WHERE phone=${phone}`);


    if (user_info == '') {
        await ctx.render('fail', {
        })
    } else if (name === user_info[0].name) {

        console.log(name)
        // 设置cookie
        let username = new Buffer(name).toString('base64');
        ctx.cookies.set('_name', username, {
            signed: true,
            maxAge: 86400 * 1000 * 30
        })

        ctx.cookies.set('_phone', phone, {
            signed: true,
            maxAge: 86400 * 1000 * 30
        })

        let car = new Buffer(car_id).toLocaleString('base64');
        ctx.cookies.set('_car', car, {
            signed: true,
            maxAge: 86400 * 1000 * 30
        })

        let code = genCode();
        console.log(code)
        let create_time = Math.floor(new Date().getTime() / 1000)
        console.log(create_time)
        if (fx == 'in') {
            let data = await query('INSERT INTO user_sub(code,create_time, car_id, pass_id, name, id, work_id, phone, fx, des, org, passenger1, passenger2, passenger3, passenger4, passenger5, passenger6, passenger7, passenger8, passenger9, passenger10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [code, create_time, user_info[0].car_id, user_info[0].pass_id, name, user_info[0].id, user_info[0].work_id, phone, "进城", "", "机场工作人员", ...passengerArr],
                (err, data) => {
                    if (err) {
                        throw err
                    }
                })
            await ctx.render('code', { code });
        } else {
            let data = await query('INSERT INTO user_sub(code, create_time, car_id, pass_id, name, id, work_id, phone, fx, des, org, passenger1, passenger2, passenger3, passenger4, passenger5, passenger6, passenger7, passenger8, passenger9, passenger10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [code, create_time, user_info[0].car_id, user_info[0].pass_id, name, user_info[0].id, user_info[0].work_id, phone, "出城", "天河机场", "机场工作人员", ...passengerArr],
                (err, data) => {
                    if (err) {
                        throw err
                    }
                })
            await ctx.render('code', { code });
        }

    } else {
        await ctx.render('fail', {
        })
    }


});

router.get('/', async ctx => {
    let c_name = '';
    let c_phone = '';
    let c_car = '';

    if (!ctx.cookies.get('_name')) {
        c_name = '';
    } else {
        c_name = new Buffer(ctx.cookies.get('_name'), 'base64').toString();
    }

    if (!ctx.cookies.get('_phone')) {
        c_phone = '';
    } else {
        c_phone = ctx.cookies.get('_phone');
    }

    if (!ctx.cookies.get('_car')) {
        c_car = '';
    } else {
        c_car = new Buffer(ctx.cookies.get('_car'), 'base64').toString();
    }

    await ctx.render('index', { name: c_name, phone: c_phone, car: c_car })
})

router.get('/cx', async ctx => {
    await ctx.render('cx', {});
});


router.post('/cx', async ctx => {
    let cx_code = ctx.request.fields.cx_code;
    let data = await query(`SELECT * from  user_sub WHERE code = '${cx_code}' `);
    console.log(cx_code, data);
    let { code, create_time, car_id, pass_id, name, id, work_id, phone, fx, des, org, passenger1, passenger2, passenger3, passenger4, passenger5, passenger6, passenger7, passenger8, passenger9, passenger10 } = data[0];
    console.log(code, fx)

    let nowDate = getDate()

    await ctx.render('confirm', { code, nowDate: nowDate, name: name, work_id: work_id, car_id: car_id, pass_id: pass_id, id: id, phone: phone, org: org, fx: fx, passenger1, passenger2, passenger3, passenger4, passenger5, passenger6, passenger7, passenger8, passenger9, passenger10 });
})


router.post('/confirm', async ctx => {
    let confirm_time = Math.floor(new Date().getTime() / 1000);

    let code = ctx.request.fields.code;

    let data = await query(`UPDATE user_sub SET check_time = ${confirm_time} where code = '${code}'`)
    // console.log(111111)
    console.log(code)
    // await ctx.render('cx', {});
    // ctx.body = 'asdsdf'
    await ctx.render('cx', {})

})

server.use(router.routes());