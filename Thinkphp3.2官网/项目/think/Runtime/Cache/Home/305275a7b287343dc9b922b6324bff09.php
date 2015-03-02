<?php if (!defined('THINK_PATH')) exit();?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta name="keywords" content="首季风信息科技" />
<meta name="description" content="首季风信息科技" />
<title>首季风信息科技</title>

<link href="css/style.css" rel="stylesheet" type="text/css" />
<link href="css/pro_dropdown_2.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/stuHover.js"></script>
<script language="JavaScript" type="text/javascript" src="js/prototype.js"></script>
<script language="JavaScript" type="text/javascript" src="js/effects.js"></script>
<script language="JavaScript" type="text/javascript" src="js/glider.js"></script>
<style>
<!--

#box {
 position:relative;
 width:980px;
 height:360px;
}
#box .imgList{
 position:relative;
 width:980px;
 height:360px;
 overflow:hidden;
}
#box .imgList li{
 position:absolute;
 top:0;
 left:0;
 width:980px;
 height:360px;
}
#box .countNum{
 position:absolute;
 right:0;
 bottom:5px;
}
#box .countNum li{
 width:20px;
 height:20px;
 float:left;
 color:#fff;
 border-radius:20px;
 background:#000517;
 text-align:center;
 margin-right:5px;
 cursor:pointer;
 opacity:0.7;
 filter:alpha(opacity=70);
}
#box .countNum li.current{
 background:#0035e6;
 font-weight:bold;
 opacity:1;
 filter:alpha(opacity=70);
}
-->
</style>
<script>
<!--
 function runImg(){}
 runImg.prototype={
  bigbox:null,//最外层容器
  boxul:null,//子容器ul
  imglist:null,//子容器img
  numlist:null,//子容器countNum
  prov:0,//上次显示项
  index:0,//当前显示项
  timer:null,//控制图片转变效果
  play:null,//控制自动播放
  imgurl:[],//存放图片
  count:0,//存放的个数
  $:function(obj)
  {
   if(typeof(obj)=="string")
   {
    if(obj.indexOf("#")>=0)
    {
     obj=obj.replace("#","");
     if(document.getElementById(obj))
     {
      return document.getElementById(obj);
     }
     else
     {
      alert("没有容器"+obj);
      return null;
     } 
    }
    else
    {
     return document.createElement(obj);
    }
   }
   else
   {
    return obj;
   }
  },
  //初始化
  info:function(id)
  {
   this.count=this.count<=3?this.count:3;
   this.bigbox=this.$(id);
   for(var i=0;i<2;i++)
   {
    var ul=this.$("ul");
    for(var j=1;j<=this.count;j++)
    {
     var li=this.$("li");
     li.innerHTML=i==0?this.imgurl[j-1]:j;
     ul.appendChild(li);
    }
    this.bigbox.appendChild(ul);
   }
   this.boxul=this.bigbox.getElementsByTagName("ul");
   this.boxul[0].className="imgList";
   this.boxul[1].className="countNum";
   this.imglist=this.boxul[0].getElementsByTagName("li");
   this.numlist=this.boxul[1].getElementsByTagName("li");
   for(var j=0;j<this.imglist.length;j++)
   {
    this.alpha(j,0);
   }
   this.alpha(0,100);
   this.numlist[0].className="current";
  },
  //封装程序入口
  action:function(id)
  {
   this.autoplay();
   this.mouseoverout(this.bigbox,this.numlist);
  },
  //图片切换效果
  imgshow:function(num,numlist,imglist)
  {
   this.index=num;
   var pralpha=100;
   var inalpha=0;
   for(var i=0;i<numlist.length;i++)
   {
    numlist[i].className="";
   }
   numlist[this.index].className="current";
   clearInterval(this.timer);
                        for(var j=0;j<this.imglist.length;j++)
          {
           this.alpha(j,0);
          }
   this.alpha(this.prov,100);
   this.alpha(this.index,0);
   var $this=this;
   //利用透明度来实现切换图片
   this.timer=setInterval(function(){
    inalpha+=2;
    pralpha-=2;
    if(inalpha>100){inalpha=100};//不能大于100
    if(pralpha<0){pralpha=100};
    //为兼容性赋样式
    $this.alpha($this.prov,pralpha);
    $this.alpha($this.index,inalpha);
    if(inalpha==100&&pralpha==0){clearInterval($this.timer)};//当等于100的时候就切换完成了
   },20)//经测试20是我认为最合适的值
  },
  //设置透明度
  alpha:function(i,opacity){
   this.imglist[i].style.opacity=opacity/100;
   this.imglist[i].style.filter="alpha(opacity="+opacity+")";
  },
  //自动播放
  autoplay:function(){
   var $this=this;
   this.play=setInterval(function(){
    $this.prov=$this.index;
    $this.index++;
    if($this.index>$this.imglist.length-1)<?php echo ($this["index=0"]); ?>;
    $this.imgshow($this.index,$this.numlist,$this.imglist);
    },5000)
  },
  //处理鼠标事件
  mouseoverout:function(box,numlist)
  {
   var $this=this;
   box.onmouseover=function()
   {
    clearInterval($this.play);
   }
   box.onmouseout=function()
   {
    $this.autoplay($this.index);
   }
   for(var i=0;i<numlist.length;i++)
   {
    numlist[i].index=i;
    numlist[i].onmouseover=function(){
     $this.prov=$this.index;
     $this.imgshow(this.index,$this.numlist,$this.imglist);
    }
   }
  }
 }
 window.onload=function(){
  var runimg=new runImg();
  runimg.count=3;
  runimg.imgurl=[
  "<img src=\"images/1.jpg\"/>",
  "<img src=\"images/2.jpg\"/>",
  "<img src=\"images/3.jpg\"/>"];
  runimg.info("#box");
  runimg.action("#box");
 }
-->
</script>
</head>

<body>
	<div id="Header">
		<h1><a href="index.html"><img src="images/index_04.png" alt="首季风信息科技" /></a></h1>
		<div class="nav">
			<ul id="nav">
				<li class="nav_green" style="font-weight:bold;"><A href="index.html"><img src="images/nav_07.png" /></A></li>
				<li class="nav_gray"><a style="font-weight:bold;" class="a" href="about.html"><img src="images/nav_08.png" /></a>
					<ul class="sub" style="background:none;">
						<li style="height:14px; border:none; line-height:14px;"><img src="images/nav_bar_03.png" width="131" height="14" /></li>
						<li><a href="about.html#a1" class="fly">首季风语</a></li>
						<li><a href="about.html#a2" class="fly">发展历程</a></li>
						<li><a href="about.html#a3" class="fly">组织架构</a></li>
						<li><a href="about.html#a4" class="fly">企业文化</a></li>
						<li><a href="about.html#a5" class="fly">文化活动</a></li>
						<li style="border:none; line-height:1px;"><img src="images/nav_bar_08.png" width="131" height="7" /></li>
					</ul>
				</li>
				<li class="nav_gray"><a style="font-weight:bold;" href="products.html"><img src="images/nav_09.png" /></a>
					<ul class="sub" style="background:none;">
						<li style="height:14px; border:none; line-height:14px;"><img src="images/nav_bar_03.png" width="131" height="14" /></li>
						<li><a href="sns.html" class="fly">风客社区</a></li>
						<li><a href="mall.html" class="fly">风客商城</a></li>
						<li style="border:none; line-height:1px;"><img src="images/nav_bar_08.png" width="131" height="7" /></li>
					</ul>
				</li>
				<li class="nav_gray"><a style="font-weight:bold;" href="case.html"><img src="images/nav_case.png" /></a>
					<ul class="sub" style="background:none;">
						<li style="height:14px; border:none; line-height:14px;"><img src="images/nav_bar_03.png" width="131" height="14" /></li>
						<li><a href="case1.html" class="fly">移动商城系列</a></li>
						<li><a href="case2.html" class="fly">移动社区系列</a></li>
						<li><a href="case3.html" class="fly">手机娱乐系列</a></li>
						<li><a href="case4.html" class="fly">移动应用系列</a></li>
						<li style="border:none; line-height:1px;"><img src="images/nav_bar_08.png" width="131" height="7" /></li>
					</ul>
				</li>
				<li class="nav_gray"><a style="font-weight:bold;" href="market.html"><img src="images/nav_10.png" /></a>
					<ul class="sub" style="background:none;">
						<li style="height:14px; border:none; line-height:14px;"><img src="images/nav_bar_03.png" width="131" height="14" /></li>
						<li><a href="market.html#b1" class="fly">软件外包定制</a></li>
						<li><a href="market.html#b2" class="fly">企业系统合作</a></li>
						<li><a href="market.html#b3" class="fly">技术培训合作</a></li>
						<li><a href="market.html#b4" class="fly">应用软件加盟</a></li>
						<li><a href="market.html#b5" class="fly">广告投放合作</a></li>
						<li style="border:none; line-height:1px;"><img src="images/nav_bar_08.png" width="131" height="7" /></li>
					</ul>
				</li>
				<li class="nav_gray" style="background:none;"><a style="font-weight:bold;" href="contact.html"><img src="images/nav_11.jpg" /></a>
					<ul class="sub" style="background:none;">
						<li style="height:14px; border:none; line-height:14px;"><img src="images/nav_bar_03.png" width="131" height="14" /></li>
						<li><a href="rencai.html" class="fly">人才理念</a></li>
						<li><a href="zhaopin.html" class="fly">招聘信息</a></li>
						<li><a href="contact.html" class="fly">联系我们</a></li>
						<li style="border:none; line-height:1px;"><img src="images/nav_bar_08.png" width="131" height="7" /></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
<div id="Banner">
		<div id="box"></div>
  </div>
	<div id="ind_pro">
		<img src="images/phone_new_21.png" border="0" usemap="#Map" />
<map name="Map" id="Map"><area shape="rect" coords="600,35,685,66" href="case.html" />
<area shape="rect" coords="892,36,976,66" href="news.html" />
</map>
</div>
	<table width="980" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;">
  <tr>
    <td width="13"><img src="images/phone_new_22.png" width="13" height="249" /></td>
    <td width="690"><DIV align="center" >

<DIV class=feature id=my-glider>
<DIV class=scroller>
<DIV class=content>

<DIV class=section id=section1>
<A href="case1-1.html" target="_blank"><IMG alt="首季风" src="images/index_pic/1.png"></A>
<A href="case1-2.html" target="_blank"><IMG alt="首季风" src="images/index_pic/2.png"></A>
<A href="case1-3.html" target="_blank"><IMG alt="首季风" src="images/index_pic/3.png"></A>
<A href="case1-4.html" target="_blank"><IMG alt="首季风" src="images/index_pic/4.png"></A>
</DIV>

<DIV class=section id=section2>
<A href="case2-1.html" target="_blank"><IMG alt="首季风" src="images/index_pic/5.png"></A>
<A href="case2-2.html" target="_blank"><IMG alt="首季风" src="images/index_pic/6.png"></A>
<A href="case2-3.html" target="_blank"><IMG alt="首季风" src="images/index_pic/7.png"></A>
<A href="case2-4.html" target="_blank"><IMG alt="首季风" src="images/index_pic/8.png"></A>
</DIV>

<DIV class=section id=section3>
<A href="case3-1.html" target="_blank"><IMG alt="首季风" src="images/index_pic/9.png"></A>
<A href="case3-2.html" target="_blank"><IMG alt="首季风" src="images/index_pic/10.png"></A>
<A href="case4-3.html" target="_blank"><IMG alt="首季风" src="images/index_pic/11.png"></A>
<A href="case4-4.html" target="_blank"><IMG alt="首季风" src="images/index_pic/12.png"></A>
</DIV>


</DIV>
</DIV>
<A id=prevLink onClick="my_glider.previous();return false;" href="http://www.shoujifeng.net/">Previous</A>&nbsp;
<A id=nextLink onClick="my_glider.next();return false" href="http://www.shoujifeng.net/">Next</A>
<SCRIPT language=javascript type=text/javascript>
	var my_glider = new Glider('my-glider', {duration:0.5});
</SCRIPT>
</DIV></div></td>
    <td width="13"><img src="images/phone_new_24.png" width="13" height="249" /></td>
    <td width="264" valign="middle">
		<ul class="index_new">
			<li><a href="http://shoujifenghome.blog.sohu.com/202898830.html">首季风发布国内首个移动商城平台-风客移动..</a></li>
			<li><a href="http://shoujifenghome.blog.sohu.com/202693046.html">首季风发布国内首个智能移动社区平台-风客..</a></li>
			<li><a href="http://shoujifenghome.blog.sohu.com/176159338.html">首季风发布国内首个无线新商务平台-云客商务</a></li>
			<li><a href="http://shoujifenghome.blog.sohu.com/175500253.html">首季风发布国内首个商务浏览器平台</a></li>
			<li><a href="http://shoujifenghome.blog.sohu.com/173992025.html">首季风发布国内首个掌上花店</a></li>
			<li><a href="http://shoujifenghome.blog.sohu.com/172180050.html">首季风发布风客上网猫手机应用软件</a></li>
			<li><a href="http://shoujifenghome.blog.sohu.com/171949464.html">首季风发布Android咖啡厅管理系统</a></li>
			<li><a href="http://shoujifenghome.blog.sohu.com/169585708.html">首季风发布Android点餐系统</a></li>
		</ul>
	</td>
  </tr>
</table>

	<div id="container_hezuo">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
		  <tr>
			<td height="10"></td>
		  </tr>
		  <tr>
			<td><a href="mall.html"><img src="images/big_pic_33.png" width="229" height="123" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="sns.html"><img src="images/big_pic_35.png" width="229" height="123" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="case4-1.html"><img src="images/big_pic_37.png" width="229" height="123" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="case3-4.html"><img src="images/big_pic_39.png" width="229" height="123" /></a></td>
		  </tr>
		</table>
	</div>
	<div id="Footer">
		<div class="footer_nav">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			  <tr>
				<td height="12" colspan="5"></td>
			  </tr>
			  <tr>
				<td width="19%" height="18" rowspan="3"><img src="images/footer_bj_41.png" width="187" height="59" /></td>
				<td width="3%" height="18" rowspan="3">&nbsp;</td>
				<td width="3%" height="18" rowspan="3"><img src="images/footer_bj_43.png" width="4" height="59" /></td>
				<td width="59%" height="18"><a href="about.html">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="news.html">新闻动态</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="products.html">产品展示</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="case.html">成功案例</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="market.html">市场和合作</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="contact.html">联系我们</a></td>
				<td width="16%" height="18">&nbsp;</td>
			  </tr>
			  <tr>
			    <td height="18" rowspan="2" style="color:#999;">广州首季风信息科技有限公司所有 COPYRIGHT @ 2010 SHOUJIFENG.NET. DESIGN BY SHOUJIFENG 
粤ICP备10200632号</td>
				<td height="18">&nbsp;</td>
			  </tr>
			  <tr>
			    <td height="18">&nbsp;</td>
			  </tr>
			  
			  <tr>
				<td height="20" colspan="5">&nbsp;</td>
			  </tr>
			</table>
		</div>
		<div class="footer_links">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			  <tr>
				<td height="64" colspan="8">&nbsp;</td>
			  </tr>
			  <tr>
				<td width="7%" height="20" valign="middle" style="color:#fff;">客服QQ1：</td>
				<td width="8%" height="20" valign="middle"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1534625557&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1534625557:41" alt="点击这里给我发消息" title="点击这里给我发消息"></a></td>
				<td width="1%" height="20" valign="middle">&nbsp;</td>
				<td width="7%" height="20" valign="middle" style="color:#fff;">客服QQ2：</td>
				<td width="9%" height="20"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1914767904&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1914767904:41" alt="点击这里给我发消息" title="点击这里给我发消息"></a></td>
				<td width="24%" height="20">&nbsp;</td>
				<td width="7%" height="20">&nbsp;</td>
				<td width="37%" height="20">&nbsp;</td>
			  </tr>
			  <tr>
				<td height="31" colspan="6">&nbsp;</td>
				<td rowspan="2" style="font-size:14px; color:#fff; font-weight:bold;">分享到：</td>
				<td rowspan="2"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="20%"><!-- Baidu Button BEGIN -->
    <div id="bdshare" class="bdshare_t bds_tools_32 get-codes-bdshare">
        <a class="bds_qzone"></a>
        <a class="bds_tsina"></a>
        <a class="bds_tqq"></a>
        <a class="bds_renren"></a>
        <span class="bds_more">更多</span>
		<a class="shareCount"></a>
    </div>
<script type="text/javascript" id="bdshare_js" data="type=tools&amp;uid=732245" ></script>
<script type="text/javascript" id="bdshell_js"></script>
<script type="text/javascript">
	document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
</script>
<!-- Baidu Button END --></td>
                  </tr>
                </table></td>
			  </tr>
			  <tr>
				<td height="25" colspan="6" style="color:#f2e300;">合作伙伴</td>
			  </tr>
			  <tr>
				<td height="2" colspan="8" background="images/index_46.png"></td>
			  </tr>
			  <tr>
				<td height="30" colspan="8" valign="middle" style="color:#fff;"><img src="images/index_74.png" /></td>
			  </tr>
			  <tr>
				<td height="5" colspan="8"></td>
			  </tr>
		  </table>
		</div>
	</div>
</body>
</html>