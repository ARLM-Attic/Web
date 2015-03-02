<?php if (!defined('THINK_PATH')) exit();?> <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <html lang="en">
 <head>
 <meta content="text/html; charset=utf-8" http-equiv="Content-Type"></meta>
 <title> 
      
            广州飞磨有限公司

</title>
<link href="/think/Public/css/style.css" rel="stylesheet" type="text/css">
<link href="/think/Public/css/pro_dropdown_2.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/think/Public/js/stuHover.js"></script>
<script language="JavaScript" type="text/javascript" src="/think/Public/js/prototype.js"></script><style type="text/css" adt="123"></style>
<script language="JavaScript" type="text/javascript" src="/think/Public/js/effects.js"></script>
<script language="JavaScript" type="text/javascript" src="/think/Public/js/glider.js"></script>
 </head>
 <body>
  <iframe src="/think/index.php/Home/Index/head.html" marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width=100% height=100% id="iframepage" name="iframepage" onLoad="iFrameHeight()" ></iframe> 

     <script type="text/javascript" language="javascript">

      //获取iframe高度函数
      function iFrameHeight() {

        var ifm= document.getElementById("iframepage");

        var subWeb = document.frames ? document.frames["iframepage"].document :

        ifm.contentDocument;

            if(ifm != null && subWeb != null) {

            ifm.height = subWeb.body.scrollHeight;

            }

    }
</script> 

  
<div class="about_container">
        <div class="about_leftNav">
            <dl>
                <dt><img src="/think/Public/images/<?php echo ($path); ?>.png" width="193" height="50"></dt>


                <?php if(is_array($temp)): $i = 0; $__LIST__ = $temp;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><dd><span><a href="#b<?php echo ($vo["position"]); ?>"><?php echo ($vo["name"]); ?> </a></span></dd><?php endforeach; endif; else: echo "" ;endif; ?>
          
            </dl>
            <div class="leftBar_contact"><img src="/think/Public/images/aboutus_13.png"></div>
      </div>
        <div class="about_rightcontainer">
            <h2><span>当前位置：<a href="">首页</a> &gt; <?php echo ($name); ?></span></h2>
            <div><img src="/think/Public/images/ziye_banner1_10.png"></div>

            <dl class="market_list">
               <!--  <dt>1.1.移动商城-一号果</dt>
                <dd class="market_list_pic"><img src="/think/Public/images/1-1.png" width="107px" height="107px" style="padding-right:60px;" />华南首个移动水果配送商城<br/>
                <a href="case1-1.html" target="_blank" style="color:#408bc1; text-decoration:underline;">查看详情</a>
                </dd>
            </dl> -->
             <?php if(is_array($temp)): $i = 0; $__LIST__ = $temp;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><dl class="market_list">
                <dt><a name="b<?php echo ($vo["position"]); ?>"><?php echo ($vo["name"]); ?></a></dt>
                <dd><?php echo ($vo["content"]); ?></dd>
            </dl><?php endforeach; endif; else: echo "" ;endif; ?>
        </div>
    </div>

     <iframe src="/think/index.php/Home/Index/footer.html" marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width=100% height=100% id="iframepage1" name="iframepage1"  ></iframe>
       
 
    
 </body>
 </html>