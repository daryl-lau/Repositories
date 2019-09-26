export default {
  // 支持值为 Object 和 Array
  'GET /api/users': {users: [1, 2]},

  // GET POST 可省略
  '/api/users/1': {id: 1},

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    res.end('OK');
  },

  'GET /api/currentUser': {
    name: 'momo.zxy',
    // avatar: imgMap.user,
    userid: '00000001',
    notifyCount: 12,
  },
  'GET /api/goods': [{title: 'web'}, {title: 'java'}]
};
