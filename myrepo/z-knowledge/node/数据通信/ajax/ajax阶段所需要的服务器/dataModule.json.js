// 这个模块专门进行数据操作
var fs = require('fs')
// 新增 
// 删除
// 修改
// 查询

// 获取所有数据
exports.getAllData = (callback) => {
    fs.readFile(__dirname + "/data/heros.json", 'utf-8', (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, JSON.parse(data))
        }
    })
}

// 新增数据
exports.insertHero = (obj, callback) => {
    // json文件操作止步
    // 1.读取文件，获取json格式字符串
    fs.readFile(__dirname + "/data/heros.json", (err, data) => {
        if (err) {
            callback(err)
        } else {
            // 2.将json格式字符串转换为js对象或数组
            var data = JSON.parse(data.toString())
            // 生成id:获取数组中最后一个元素的id加1
            if (data.heros.length == 0) {
                obj.id = 1
            } else {
                obj.id = data.heros[data.heros.length - 1].id + 1
            }
            // 3.对对象或数组进行操作
            data.heros.push(obj)
            // 4.将对象或数组转换为json格式字符串
            var dataStr = JSON.stringify(data, null, ' ')
            // 5.将转换之后的结果重新写入到文件
            fs.writeFile(__dirname + "/data/heros.json", dataStr, (err) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null)
                }
            })
        }
    })
}

// 根据id获取单个英雄数据
exports.getHeroById = (id, callback) => {
    // js的词法作用域
    this.getAllData((err, data) => {
        if (err) {
            callback(err)
        } else {
            for (var i = 0; i < data.heros.length; i++) {
                if (data.heros[i].id == id) {
                    // 说明找到
                    callback(null, data.heros[i])
                }
            }
        }
    })
}

// 实现数据的编辑
exports.editHero = (newobj, callback) => {
    this.getAllData((err, data) => {
        if (err) {
            callback(err)
        } else {
            // 1.forEach的时候，每次从data.heros中拿出一个元素，赋值给value
            // 2.参数赋值都是不副本赋值
            data.heros.forEach(function (value, index) {
                if (value.id == newobj.id) {
                    // value = newobj
                    value.name = newobj.name
                    value.gender = newobj.gender
                    value.img = newobj.img
                    // 将修改好的数据重新写入到文件
                    fs.writeFile(__dirname + "/data/heros.json", JSON.stringify(data, null, ' '), (err) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(null)
                        }
                    })
                }
            })
        }
    })
}

// 实现数据的删除
exports.deleteHeroById = (id, callback) => {
    this.getAllData((err, data) => {
        if (err) {
            callback(err)
        } else {
            for (var i = 0; i < data.heros.length; i++) {
                if (data.heros[i].id == id) {
                    data.heros.splice(i, 1)
                    // 将删除之后的源数组重新写入到文件
                    fs.writeFile(__dirname + "/data/heros.json", JSON.stringify(data, null, ' '), (err) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(null)
                        }
                    })
                }
            }
        }
    })
}