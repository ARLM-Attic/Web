<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
  <head>
    <!-- Meta -->
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <!-- End of Meta -->
    
    <!-- Page title -->
    <title>Wide Admin - Login</title>
    <!-- End of Page title -->
    
    <!-- Libraries -->
    <link type="text/css" href="/think/Public/Login/css/login.css" rel="stylesheet" />  
    
    
    <script type="text/javascript" src="/think/Public/js/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="/think/Public/Login/js/easyTooltip.js"></script>
    <script type="text/javascript" src="/think/Public/Login/js/jquery-ui-1.7.2.custom.min.js"></script>
    <!-- End of Libraries --> 

    <link href="/think/Public/Login/asyncbox/skins/ZCMS/asyncbox.css" type="text/css" rel="stylesheet" />
   
   <script type="text/javascript" src="/think/Public/Login/asyncbox/AsyncBox.v1.4.js"></script>
  </head>

  <script type="text/javascript">
  $(function(){
    $('#bt_login').click(function(){
        if(document.loginForm.username.value==""||document.loginForm.password.value==""){
                 asyncbox.alert('请填写好账号密码!','系统提示');
                 return false;
        }
    
    });
  
  });
   /* function f1()
    {
      
     if(document.loginForm.username.value==""||document.loginForm.password.value=="")
     {
            alert('请填写好账号密码');
            return false;
     }

     
    } */
  </script>
  <body>
  <div id="container">
    <div class="logo">
      <a href="#"><img src="/think/Public/Login/assets/logo.png" alt="" /></a>
    </div>
    <div id="box">
      <form name="loginForm" action="<?php echo U('Login/login');?>" method="POST">
      <p class="main">
        <label>Username: </label>
        <input name="username"  /> 
        <label>Password: </label>
        <input type="password" name="password" >  
      </p>

      <p class="space">
        <span><input type="checkbox" />Remember me</span>
        <input  id="bt_login"onclick="return f1();" type="submit" value="Login" class="login"/>
        <!-- 另外一点写法上注意一定要 “return X();” 才能取得函数的返回值，否则只是调用函数，返回值未被传递 -->
      </p>
      </form>
    </div>
  </div>

  </body>
</html>