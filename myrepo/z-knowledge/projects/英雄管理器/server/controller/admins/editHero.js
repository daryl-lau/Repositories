let editHero = require('../../dataModules/editHero');

module.exports = async ctx => {
    let params = ctx.request.fields;
    let flag = true;
    for (key in params) {
        if (!params[key]) {
            flag = false;
        }
    }
    if (flag) {
        let { id, name, gender, img } = params;
        await editHero([name, gender, img, id]).then((data) => {
            ctx.body = { code: 200, msg: '修改成功' }
        })
    } else {
        ctx.body = { code: 400, msg: `参数错误` };
    }
}