<?php if (!defined('THINK_PATH')) exit();?> <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <html lang="en">
 <head>
 <meta content="text/html; charset=utf-8" http-equiv="Content-Type"></meta>
     <title> 
      
            广州飞磨有限公司

        </title>
 </head>
 <body>
 <div class="main_bottom"></div>
 <div class="ft">
            <p>

              <?php echo ($position); ?>

            </p>
            <?php if(is_array($data)): $i = 0; $__LIST__ = $data;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; echo ($vo["ID"]); ?>:<?php echo ($vo["NAME"]); ?><br/><?php endforeach; endif; else: echo "" ;endif; ?>

</div>
    
 </body>
 </html>