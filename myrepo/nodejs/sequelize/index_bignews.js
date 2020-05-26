const Sequelize = require('sequelize')

// 创建一个连接的实例，下面的database，username，password也可以写到对象里面去
const sequelize = new Sequelize('bignews', 'root', 'baihuzi.com', {
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

// 定义一个模型，在数据库中对应一张表，由于上面启用了freezeTableName，因此这里些users，如果没有，则写user
let Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nickname: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    userPic: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    password: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
}, {
    // 模型后面也可以设置自己的定义选项，会和构造函数里面的define合并
    // 如果有冲突，会以这里的为准
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

