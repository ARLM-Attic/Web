<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
//继承Head控制器,在页面上显示head.html

    public function _initialize()
    {
       $head=A("Head");  
       $title=$head->head();//调用head控制器的head方法
       $this->assign('title',$title);
    }
  
    public function index()
    {
  
       $New=M('news');
       $new = $New->select();
       $this->assign('new',$new);
       $this->display('head');
       $this->display();

    }
 
    public function htmlhandler()
    {
    	//p($_GET);获取传过来的id
    	  $id=$_GET['id'];
        $temp=0;
        $name=0;
        $head=A("Head");  
        $title=$head->head();

        for($i=0;$i<count($title);$i++)
        {

          if($title[$i]['id']==$id)
          {
            $temp=$title[$i]['child'];
            $name=$title[$i]['name'];
            break;
          }
        }
        $this->assign('temp',$temp);
        $this->assign('name',$name);
        if($id==1)
        {
          $path="shouye";
        }
       if($id==2)
        {
          $path="gongshi";
        }
          if($id==3)
        {
          $path="xinwen";
        }
          if($id==4)
        {
          $path="changpin";
        }
          if($id==5)
        {
          $path="shangwu";
        }
          if($id==6)
        {
          $path="zhaoxian";
        }
         if($id==7)
        {
          $path="pingpai";
        }
         $this->assign('path',$path);
    	  $this->display('container');
      


    }

    public function test()
    {

      $position="当前位置：首页 > 市场和合作";
      $this->assign('position',$position);
      $User=M('user');
     
      $data = $User->select();

      $this->assign('data',$data);

      //p($data);
      $this->display();
    }

    public function gg()
    {
     
       $Columns=A("Head");  
       $Columns->add();
       $this->display('head');
    }

    public function head()
    {
      $this->display();
    }

}