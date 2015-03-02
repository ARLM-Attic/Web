<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
//继承Session控制器,判断seesion是否存在

    public function _initialize()//控制器的所有的方法在执行前都会先执行它
    {
          header("Content-type: text/html; charset=utf-8"); //防止输出中文乱码。。
           //echo  md5("广州飞磨有限公司");
                      
    }


    public function index()//显示登入页面
    {

       $this->display('login');

    }

    public  function ext()
    {
       $this->display();
    }

    public function  loginAction()//登入验证
    {
            //不是post提交，返回登入页面，表单post提交
            if(!IS_POST)
            {
              $this->redirect('Admin/Index/index');
            }

            //获取表单内容
            $data['username']=I('username');
            $data['password']=I('password');

            $user=D('User');//实例化usermodel。

            $result=$user->loginAction($data);
        
            if($result)
            {
               
                session('id',$result['ID']);
                session('name',$result['NAME']);

                $this->success('登入成功!,页面正在跳转......',U('Main/index'),1);//使用U函数。
             
                //$this->redirect('Admin/Login/s','',1,'登入成功!,页面正在跳转......');    可以跳转   
            }                      
             else{

                  $this->error("登入失败!");
             }


    }


    public  function fileupload()
    {
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =    3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','txt');// 设置附件上传类型
        $upload->rootPath  =     './Datas/'; // 设置附件上传根目录
        $upload->savePath  =     ''; // 设置附件上传（子）目录
        $upload->saveName = 'time';//文件名取时间、//要保持上传的文件名不变，取$upload->saveName = '';
        // 上传文件 
        $info   =   $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        }else{// 上传成功
            $this->success('上传成功！');
        }
   }

}