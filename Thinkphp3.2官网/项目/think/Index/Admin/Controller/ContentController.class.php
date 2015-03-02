<?php
namespace Admin\Controller;
use Think\Controller;
class ContentController extends SessionController{

	public function  show()
	{
		$content=D('ChildTitle');
		$kk=$content->data();
		$kk=json_encode($kk);
		$rest="{".'"root":'.$kk."}";
		echo $rest;
	}


	public  function  edit()
	{
		$id=I('fuckid');
		$time=time();
		$combo=I('combo');

		$Title=M('headtitle');
                        $title = $Title->select();
           
                        for($i=0;$i<count($title);$i++)
                        {
                        	if($title[$i]['name']==$combo)
                        	{
                        		$data['fatherid']=$title[$i]['id'];
                        		break;
                        	}
                        }

		 $Childtitle=M('childtitle');
		 $data['name']=I('title');

		/* $data['url']="/think/index.php/Home/Index/htmlhandler/id/".$data['fatherid']."#b".$time;

		 $data['position']=$time;*/
		
		 $data['content']= I('content','','');//取消htmlspecialchars过滤，让内容在html正常显示。htmlspecialchars是一个函数，功能是把html标签转化为字符串html

		 $Childtitle->where("id='$id'")->save($data); 

		 $response = array('success' => true ,'msg' => '修改传成功');
	           
  		 echo json_encode($response);
	}


	public function delete()
	{
		$id=I('id');
		$Childtitle=M('childtitle');
		$Childtitle->where("id='$id'")->delete(); 
		$response = array('success' => true );
	           
  		echo json_encode($response);
	}

	public function add()
	{
		 $time=time();
		 $data['name']=I('title');
		
		 $data['content']=I('content','','');
                         $data['id']=$time;

		 $combo=I('combo');

		$Title=M('headtitle');
                        $title = $Title->select();

                        for($i=0;$i<count($title);$i++)
                        {
                        	if($title[$i]['name']==$combo)
                        	{
                        		$data['fatherid']=$title[$i]['id'];
                        		break;
                        	}
                        }
                        $url="/think/index.php/Home/Index/htmlhandler/id/".$data['fatherid']."#b".$time;
                        $data['href']=$url;
                        $data['position']=$time;

                        $Childtitle=M('childtitle');
                        $Childtitle->data($data)->add();

                        $response = array('success' => true);
	           
  		echo json_encode($response);

	}


}
?>