const Sequelize = require('sequelize')
const Op = Sequelize.Op

// 创建一个连接的实例，下面的database，username，password也可以写到对象里面去
const sequelize = new Sequelize('pagedb', 'root', 'baihuzi.com', {
    // 这里的选项可以到【构造函数支持的参数】里面去找
    // database: 'bignews',
    // username: 'root',
    // password: 'baihuzi.com',
    host: '127.0.0.1',
    port: 33306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    define: {
        // 这是默认的模型定义，所有的模型都会应用这里定义的选项，相当于模型的全局配置
        // 这里的选项可以到【模型支持的参数】里面去找
        // 下面写几个需要注意的
        timestamps: false,      // 是否启用sequelize的时间戳，如果启用，会在模型上自动添加createdAt/updatedAt/deletedAt字段
        engine: 'InnoDB',       // 引擎的类型
        freezeTableName: true, // 如果启用，则会自动映射复数形式，假如模型是user，则在数据库中是users，默认是false
    }
})

const Class = sequelize.define('class', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

const Subject = sequelize.define('subject', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

// 定义一个模型，在数据库中对应一张表，由于上面启用了freezeTableName，因此这里些users，如果没有，则写user
const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: Class,
        //     key: 'id'
        // }
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Subject,
            key: 'id'
        }
    },
}, {
    // 模型后面也可以设置自己的定义选项，会和构造函数里面的define合并
    // 如果有冲突，会以这里的为准
})

Class.findByPk(1).then(project => {
    // project 会是 Project 的实例，而且为表中 主键 为 1 的存储内容
    // 如果未定义此类条目，则将为 null
    // console.log(project);
})

// SELECT `id`, `name`, `gender`, `age`, `class_id`, `subject_id` FROM `users` AS `users` WHERE `users`.`name` LIKE 'user%' LIMIT 10, 2;
Users.findAndCountAll({
    where: {
        name: { [Op.like]: 'user%' }
    },
    offset: 10,
    limit: 2
}).then(
    // data => console.log(data.rows)
)


// 性别为男，并且 class_id为3 或 class_id为4
// SELECT `id`, `name`, `gender`, `age`, `class_id`, `subject_id` FROM `users` AS `users` WHERE (`users`.`class_id` = 3 OR `users`.`class_id` = 4) AND `users`.`gender` = '男';
Users.findAll({
    where: {
        gender: '男',
        [Op.or]: [{ class_id: 3 }, { class_id: 4 }]
    }
})

// SELECT `id`, `name`, `gender`, `age`, `class_id`, `subject_id` FROM `users` AS `users` WHERE (`users`.`id` = 3 OR `users`.`id` = 4) AND `users`.`gender` = '男';
Users.findAll({
    where: {
        id: { [Op.or]: [3, 4] },
        gender: '男',
    }
})

// SELECT `id`, `name`, `gender`, `age`, `class_id`, `subject_id` FROM `users` AS `users` WHERE `users`.`id` > 10 ORDER BY `users`.`id` DESC;
Users.findAll({
    where: { id: { [Op.gt]: 10 } },
    order: [['id', 'DESC']]     // order 要用一个数组把整个包起来
})


// SELECT `id`, `name`, `gender`, `age`, `class_id`, `subject_id` FROM `users` AS `users` WHERE `users`.`id` > 10 GROUP BY `gender`, `class_id`;
Users.findAll({
    where: { id: { [Op.gt]: 10 } },
    group: ['gender', 'class_id']
})


// SELECT `id`, `name`, `gender`, `age`, `class_id`, `subject_id` FROM `users` AS `users` WHERE `users`.`id` = 10;
// raw: true，获得的是原始数据的数组，和mysql获取到的一样，而不是一个模型对象的实例
Users.findAll({
    where: { id: { [Op.eq]: 10 } },
    raw: true
}).then(data => console.log(data))

Users.findAll({
    where: { name: { [Op.substring]: 10 } },
})


// 计数统计
Users.count({ where: { id: { [Op.gt]: 25 } } }).then(c =>
    console.log("There are " + c + " projects with an id greater than 25.")
)

Users.count().then(c => {
    console.log("There are " + c + " projects!")
})

// 最大最小值
// SELECT max(`age`) AS `max` FROM `users` AS `users` WHERE `users`.`age` > 5;
Users.max('age', { where: { age: { [Op.gt]: 5 } } }).then(max => {
    console.log('max', max);    // max 34
})

// SELECT min(`age`) AS `min` FROM `users` AS `users` WHERE `users`.`age` > 5;
Users.min('age', { where: { age: { [Op.gt]: 5 } } }).then(min => {
    console.log('min', min);    // min 18

})

// 求和
Users.sum('age', { where: { age: { [Op.gt]: 5 } } }).then(sum => {
    console.log('sum', sum);    // sum 1891
})

// 测试连接的代码
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })


// 外键约束，如果没有加{ foreignKey: 'class_id' }，默认情况下，将根据目标模型名称和目标主键名称来生成belongsTo关系的外键。
// 默认情况会使用主表的主键作为引用的键，如果想要自定义其他键，使用targetKey指定，我这里id就是主键，所以可以省略
// Users表有一个外键字段class_id，引用自Class，目标主键字段为id
Class.hasMany(Users, { foreignKey: 'class_id', targetKey: 'id' })
Users.belongsTo(Class, { foreignKey: 'class_id', targetKey: 'id' })

// Users表有一个外键字段subject_id，引用自Subject，目标主键字段为id
Users.belongsTo(Subject, { foreignKey: 'subject_id', targetKey: 'id' })
Subject.hasMany(Users, { foreignKey: 'subject_id', targetKey: 'id' })

// sequelize.sync()

// 联合查询
Users.findAndCountAll({
    where: {
        gender: '女',
        class_id: 1
    },
    include: [{
        model: Class,
        attributes: [['name', 'className'], 'id'],

        // 设置了require为true，表示Users里面只有有class信息才会被查找出来，如果不设置，则不管有没有class都会被查询出来
        require: true
    }]
}).then((data) => {
    console.log(JSON.stringify(data));
})

//  创建用户
// Users.create({
//     name: 'test',
//     gender: '男',
//     age: 22,
//     class_id: 10,
//     subject_id: 1,
// }).then(data => console.log(data))

// 更新用户
// Users.update({ age: 30 }, {
//     where: {
//         name: 'test'
//     }
// })



// where条件空值判断，通过判断向where对象里添加条件
let gender = ''
let class_id = '1'

let where = {};
if (gender) {
    where['gender'] = gender;
}
if (class_id) {
    where['class_id'] = class_id;
}

// SELECT `id`, `name`, `gender`, `age`, `class_id`, `subject_id` FROM `users` AS `users` WHERE `users`.`class_id` = '1';
Users.findAll({
    where
})
// .then(data => console.log(data))



// 事务，托管事务，自动回调执行
// 隔离级别
// 启动事务时可以使用的隔离级别：
// Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED // "READ UNCOMMITTED"
// Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED // "READ COMMITTED"
// Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ  // "REPEATABLE READ"
// Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE // "SERIALIZABLE"
// 默认情况下，sequelize使用数据库的隔离级别。如果要使用其他隔离级别，请传入所需的级别作为第一个参数：
sequelize.transaction({
    // isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
}, t => {
    // chain all your queries here. make sure you return them.
    return Class.create({
        name: '测试课程11',
    }, { transaction: t })
        .then(() => {
            return Subject.create({
                name: '测试课程11',
            }, { transaction: t });
        });
}).then(result => {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
    console.log(result);
}).catch(err => {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
    console.log('err', err);
});


// 非托管事务 (then-callback)
// 非托管事务需要你手动回滚或提交事务。如果不这样做，事务将会挂起，直到超时。
// 要启动非托管事务，请在没有回调的情况下调用sequelize.transaction() （仍然可以传递选项对象），然后对返回的promise调用then。
// 需要注意，commit()和rollback()返回一个promise。

sequelize.transaction().then(t => {
    return Class.create({
        name: '测试课程111',
    }, { transaction: t }).then(() => {
        return Subject.create({
            name: '测试课程111',
        }, { transaction: t });
    }).then(() => {
        return t.commit();
    }).catch((err) => {
        console.log(err);
        return t.rollback();
    });
});