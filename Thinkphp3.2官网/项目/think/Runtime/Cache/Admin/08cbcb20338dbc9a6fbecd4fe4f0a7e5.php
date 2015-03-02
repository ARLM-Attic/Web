<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="/think/Public/Ext4.2/bootstrap.js"></script>
<link rel="stylesheet" type="text/css" href="/think/Public/extlogin/icon.css" />
<link rel="stylesheet" type="text/css" href="/think/Public/Ext4.2/resources/css/ext-all-neptune.css">
<script type="text/javascript" src="/think/Public/extlogin/Login.js"></script>
<title>登录页面</title>
<style type="text/css">
	#div1{position:fixed; top:0;left:0;bottom:0;right:0;z-index:-1;}
	#div1  img {height:100%; width:100%;border:0;}
	#middle{
	  position: absolute;   
	  width:300px;   
	  height:220px;   
	  left:50%;   
	  top:55%;   
	  margin-left:-150px;
	  margin-top:-110px;
	}
	#shadow{
	   position:absolute; 
	   left:0;
	   top:0;
	   width:100%;
	   height:100%;
	   background-color:#0060C0;
	   filter:alpha(opacity=20);
	}
</style>
</head>
<body>
	<div id="div1"><img id="div1" src="/think/Public/images/body.png" /></div>
	<div id='middle'>
		<div id="form" ></div>
		<div id="fform"></div>
	</div>
</body>
</html>