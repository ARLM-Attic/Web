<?php if (!defined('THINK_PATH')) exit();?>﻿ <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <html lang="en">
 <head>
 <meta content="text/html; charset=utf-8" http-equiv="Content-Type"></meta>
     <title> 
      
            广州飞磨有限公司

        </title>
        <link type="text/css" rel="stylesheet" href="/think/Public/css/index.css"></link>
        <script language="javascript" src="/think/Public/js/jquery-1.8.0.min.js" type="text/javascript"></script>
        <script language="javascript" src="/think/Public/js/js.js" type="text/javascript"></script>
        <link href="/think/Public/css/style.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="/think/Public/js/stuHover.js"></script>
<script language="JavaScript" type="text/javascript" src="/think/Public/js/prototype.js"></script><style type="text/css" adt="123"></style>
<script language="JavaScript" type="text/javascript" src="/think/Public/js/effects.js"></script>
<script language="JavaScript" type="text/javascript" src="/think/Public/js/glider.js"></script>
 </head>
 <body>   

 <div class="header">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td width="187" valign="middle">
                            <img width="190" height="55" style="margin-top:20px;" src="/think/Public/images/feimo1.png"></img>
                        </td>
                        <td width="5"></td>
                        <td width="78%">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td align="right">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td width="74%">
                                                        </td>
                                                        <td width="9%">
                                                            <a href="<?php echo U('Index/index');?>" target="_parent">

                                                                返回首页

                                                            </a>
                                                        </td>
                                                   
                                                        <td width="10%" align="center">
                                                        
                                                            <a href="/think/index.php/Home/Index//htmlhandler/id/6#b3"  target="_parent">

                                                                联系我们

                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="64" align="right">
                                            <div id="nav">
                                                <ul>
                                                    <li class="dangqian1">
                                                        <a href="<?php echo U('Index/index');?>"  target="_parent">

                                                            首  页

                                                        </a>
                                                    </li>
                                                    
				 <?php if(is_array($title)): $i = 0; $__LIST__ = $title;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="qitanav">
                                                        <a href="<?php echo ($vo["href"]); ?>" target="_parent">

                                                            <?php echo ($vo["name"]); ?>

                                                        </a>
				<ul>
				        <?php if(is_array($vo['child'])): $i = 0; $__LIST__ = $vo['child'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$sub): $mod = ($i % 2 );++$i;?><li>
                                                                <a href="<?php echo ($sub["href"]); ?>" target="_parent">

                                                                    <?php echo ($sub["name"]); ?>

                                                                </a>
                                                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
														
														
                                                        </ul>
                                                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
											
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
         <div class="main">
            <div class="main_top"></div>
            <div class="img_switch">
 <div id="pic" class="img_switch_content">
                   
                            <div class="banner center">
		<object id="player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="992" height="347" >
						<param name="movie" value="/think/Public/imageshow.swf" />
						<param name="quality" value="high" />
						<param name="allowScriptAccess" value="always" />
						<param name="allowFullScreen" value="true" />
						<param name="wmode" value="Transparent" />
						<embed wmode="transparent" src="/think/Public/imageshow.swf" quality="high" allowscriptaccess="always" allowFullScreen="true"  pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="992" height="347"></embed>
		</object>
	 </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
 
 
 </body>
 </html>