<?php

       // 3.2版本开始无需定义APP_NAME常量 
       //define('APP_NAME','Index');   //定义thinkphp 项目的名称 ,比如我定义是app       
       define('APP_PATH','./Index/');  //定义thinkphp项目的路径       

       // 定义运行时目录
       define('RUNTIME_PATH','./Runtime/');

       define('APP_DEBUG',TRUE); // 开启thinkphp调试模式,有助于我们书写查看错误。

       require './ThinkPHP/ThinkPHP/ThinkPHP.php'; //加载框架入口文件

 ?>