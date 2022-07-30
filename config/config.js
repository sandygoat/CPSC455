module.exports = {
    'secret': 'sup', // used when we create and verify JSON Web Tokens
    'database': 'mongodb+srv://cpsc455team7:cpsc455team7@cluster0.d64vlsq.mongodb.net/?retryWrites=true&w=majority', // 填写本地自己 mongodb 连接地址,xxx为数据表名
    'redis': {
      host:'127.0.0.1',
      port:'6379',
    }
  };