/**
 * If there is no bug Author is tt36999
 * if not i don't know who created this
 * Created by Administrator on 2017/5/16.
 */
var fs = require('fs');
var methods = ['get', 'post', 'put', 'delete'];
module.exports = function(express, app) {
  var Mock = require('mockjs');
  var bodyParser = require('body-parser')
  app.use('/mock', express.static('./src/mock/'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.post('/mock/login', function (req, res) {
    if (!req.body.uname == 'tt36999' || req.body.pwd == 'qiuqiu') {
      res.json({status: 1, message: '登陆成功', data: {accessToken: 'asyhdsaoiuhdsakljsadhjkds'}});
    } else {
      res.json({status: 0, message: '用户名或密码错误,name=' + req.body.uname + ',pwd=' + req.body.pwd});
    }
  });

  app.get('/mock/menu', function (req, res) {
    let perid = '';
    let id = req.query.id;
    if(id!=0) {
      for (let i = 0; i < id.length; i++) {
        perid += id[i] + '-';
      }
    }
    var data = {
        status: 1,
        message: '操作成功!',
        data: {
            menu: [
                {text: perid + '1', hasChild: true, id: parseInt(id + '1'), open: false},
                {text: perid + '2', hasChild: true, id: parseInt(id + '2'), open: false},
                {text: perid + '3', hasChild: false, id: parseInt(id + '3'), open: false}
            ]
        },
    };
    res.json(data);
  });

  app.get('/mock/menus', function(req, res) {
    var menu = fs.readFileSync('./src/mock/menu.json', 'utf8');

    var data = {
      status: 1,
      data: {
        menu: JSON.parse(menu)
      },
      message: '操作成功!'
    };
    res.json(data);
  });
  console.log('Mock数据初始化完成！');
}
