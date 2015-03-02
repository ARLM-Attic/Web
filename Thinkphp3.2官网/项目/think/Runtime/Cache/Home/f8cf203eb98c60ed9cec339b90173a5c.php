<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"></meta>
        <title>

            广州飞磨有限公司

        </title>
        <link type="text/css" rel="stylesheet" href="/think/Public/css/index.css"></link>
        <script language="javascript" src="/think/Public/js/jquery-1.8.0.min.js" type="text/javascript"></script>
        <script language="javascript" src="/think/Public/js/js.js" type="text/javascript"></script>
    
    </head>
    <body>
        <div class="main">
            <div id="leamain">


      <!-- 注销iframe导入head.html，在控制器使用 display（head)插入-->

       <!-- <iframe src="/think/index.php/Home/Index/head.html" marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width=100% height=100% id="iframepage" name="iframepage" onLoad="iFrameHeight()" ></iframe> -->

     <script type="text/javascript" language="javascript">

      //获取iframe高度函数
      /*function iFrameHeight() {

        var ifm= document.getElementById("iframepage");

        var subWeb = document.frames ? document.frames["iframepage"].document :

        ifm.contentDocument;

            if(ifm != null && subWeb != null) {

            ifm.height = subWeb.body.scrollHeight;

            }

    }*/
</script> 

     </div>
        
            <div class="main_cen">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td width="5"></td>
                            <td width="279" valign="top" background="/think/Public/images/brandshow_06.jpg">
                                <div class="main_cen_left1">
                                    <h2>
                                        <img width="96" height="23" src="/think/Public/images/brandshow_06.gif"></img>
                                    </h2>
                                    <ul>
                                     
                                         <li class="dianji">
                                            <a href="<?php echo U('Index/htmlhandler?id=3#b1');?>">

                                                行业新闻

                                            </a>
                                        </li>
                                        <li class="qita">
                                            <a href="<?php echo U('Index/htmlhandler?id=3#b2');?>">

                                                飞磨新闻

                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td width="20"></td>
                            <td width="653" valign="top">
                                <div class="main_cen_right">
                              
                                    <div class="right_zhanshi">
                                        <h2>

                                            新闻资讯

                                        </h2>
                                        <p class="xian">
                                            <img width="612" height="3" src="images/brandshow_06.jpg"></img>
                                        </p>
                                        <div class="tuwen">
                                            <ul>
											 <?php if(is_array($new)): $i = 0; $__LIST__ = $new;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li>
                                                    <span>

                                                        <?php echo ($vo["time"]); ?>

                                                    </span>
                                                    <a href="<?php echo ($vo["href"]); ?>">

                                                        <?php echo ($vo["title"]); ?>

                                                    </a>
                                                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
         <iframe src="/think/index.php/Home/Index/footer.html" marginheight="0" marginwidth="0" frameborder="0" scrolling="no" width=100% height=100% id="iframepage1" name="iframepage1"  ></iframe>
       
 
    </body>

</html>