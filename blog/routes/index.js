
/*
 * 路由规则配置
 * get用req.query获取参数
 * post用req.body获取参数
 * 页面跳转：res.redirect("/kkk/lll")即请求地址为localhost:3000/kkk/lll,对应app.get('/kkk/lll')的页面
 */



var crypto = require("crypto");//密码加密MD5
var User=require('../models/user.js');
var Post=require('../models/post.js');

module.exports = function(app) {

  app.get('/',function(req,res){

      var postList=[];
      Post.get(null,function(err,posts){
          postList=posts;
          if (err) {
              posts = [];
          }
          res.render('index', {
              title: '主页'+postList.length,//传递参数给前台
              user:req.session.user,
              sucMsg: req.flash('sucMsg').toString(),
              errMsg: req.flash('errMsg').toString(),
              posts: postList
          });
      })
      //放到这里，nodejs会先执行res,此时还没查完数据
   /*   console.log("session122: +++++++++++++++++ :"+postList.length);
    res.render('index', {
        title: '主页'+postList.length,//传递参数给前台
        user:req.session.user,
        sucMsg: req.flash('sucMsg').toString(),
        errMsg: req.flash('errMsg').toString(),
        posts: postList
    });*/
  });

  app.get('/reg',function(req,res){
    //res.send('index');
    res.render('reg', {
      title: '注册',
        user:req.session.user,
      sucMsg: req.flash('sucMsg').toString(),
      errMsg: req.flash('errMsg').toString()
    });
  });
 /**
 * 注册验证
 */
  app.post('/reg',function(req,res){
    //获取post参数
    var username=req.body.username;
    var password=req.body.password;
    var password_re=req.body.again;
    var email=req.body.email;
    console.log("username :"+username+"  password ："+password+" re:"+password_re+"  email: "+email);

      //检查内容填写是否完整
    if((!password_re)||(!username)||(!password)||(!email)){
      req.flash('errMsg','请填写完整信息');
      return res.redirect("/reg");//返回注册页面--return阻止代码继续执行
    }

    //判断2次密码是否相等
    if(password!=password_re){
      req.flash('errMsg','两次输入的密码不一致');
      return res.redirect("/reg");//返回注册页面--return阻止代码继续执行
    }

   //生成密码的MD5值
    password=crypto.createHash("md5").update(password).digest("hex");

    //定义用户集合
    var newUser=new User({
      name:username,
      password:password,
      email:email
    });

    //检查用户名是否已经存在 ----返回user
    User.get(newUser.name, function (err, user) {
      if (user) {
        req.flash('errMsg', '用户已存在!');
        return res.redirect('/reg');//返回注册页
      }
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('errMsg', err);
          return res.redirect('/reg');//注册失败返回主册页
        }
        req.session.user = user;//用户信息存入 session
        req.flash('sucMsg', '注册成功!');
        res.redirect('/');//注册成功后返回主页
      });
    });

  });

  app.get('/login',function(req,res){
    res.render('login', {
        title: '登入',
        user:req.session.user,
        sucMsg: req.flash('sucMsg').toString(),
        errMsg: req.flash('errMsg').toString()
    });
  });
 /**
  * 用户登入验证
 */
  app.post('/login',function(req,res){
      var username=req.body.name;//获取post参数
      var password=req.body.password;

      if((!username)||(!password))
      {
          req.flash('errMsg','账号密码不能为空!');
          return res.redirect('/login');
      }
      //生成密码的MD5值
      password=crypto.createHash("md5").update(password).digest("hex");

      //检查用户是否存在
      User.get(username,function(err,user){    //查询返回值为user
          if(!user){
              req.flash('errMsg','用户不存在!');
              return res.redirect('/login');
          }
          if(user.password!=password){
              req.flash('errMsg','密码错误!');
              return res.redirect('/login');
          }
          req.session.user=user;//登入成功把用户信息存入session、
          req.flash('sucMsg','登入成功!');
          res.redirect('/');
         // res.json({success: false,message:"此用户不存在"});
      })

  });
  /**
  * 用户退出登入
  */
  app.get('/logout',function(req,res){
      req.session.user=null;
      req.flash('sucMsg','退出登入成功');
      res.redirect('/');
  });

  app.get('/post',function(req,res){
      res.render('post', {
          title: '文章发表',//传递参数给前台
          user:req.session.user,
          sucMsg: req.flash('sucMsg').toString(),
          errMsg: req.flash('errMsg').toString()
      });
  });
    //文章发布
  app.post('/post',function(req,res){
      var title=req.body.title;//获取post参数
      var post=req.body.post;
      var user=req.session.user;//获得当前用户
      var postDb=new Post(user.name,title,post);
      //存储文章
      postDb.save(function(err){
          if(err){
              req.flash('errMsg',err);
              return  res.redirect('/');
          }
          req.flash('sucMsg','发表成功');
          return  res.redirect('/');
      })
  });
  app.get('/test',function(req,res){

      if(NaN){
          res.send("Yes");
      }
      else{
          res.send("No");
      }

  })

};