
/**
 * Module dependencies.
 */

//加载
var express = require('express');//加1载express模块
var routes = require('./routes');//和var routes = require('./routes/index')一样;默认找index，加载routes下的index文件
//var user = require('./routes/user');
var http = require('http');//加载http模块
var path = require('path');//加载path模块

//session存放到mongodb
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');

var flash = require('connect-flash');//页面通知flash
var app = express();

// 环境设置
app.set('port', process.env.PORT || 3000);//端口设置
app.set('views', path.join(__dirname, 'views'));//dirname为全局变量，是当前所在目录
app.set('view engine', 'ejs');//设置视图引擎为ejs

app.use(flash());//使用flash模块

app.use(express.favicon());//设置icon，使用自己图标app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));//开启终端显示日志
app.use(express.bodyParser());//解析请求体
app.use(express.methodOverride());//协助处理POST请求

app.use(express.session({
  secret: settings.cookieSecret,//防止篡改Cookie
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 },//1 days
  store: new MongoStore({
    db: settings.db
  })
}));

app.use(express.static(path.join(__dirname, 'public')));//将public设为资源静态文件目录

 // 配置开发环境下的错误处理，输出错误信息
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//每次请求都会经过登入拦截
//登录拦截器----放在资源目录下面，不然加载不了样式
app.use(function (req, res, next) {   //注意死循环，每次请求都会经过拦截
  var url = req.originalUrl;//获取URL
  if (url != "/login" &&url!="/reg"&& !req.session.user) {

      return res.redirect("/login");
    //console.log("oveer----------------------");
  }
  next();//否则控制权转移
});

app.use(app.router);//调用路由解析规则

//创建http服务器并监听3000端口
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//配置路由到index.js里--把app传进去配置路由
routes(app);