<?php
namespace Admin\Controller;
use Think\Controller;
class NewsController extends SessionController{

	public function deletenew()
	{
		$id=I('id');

		$New=M('news');
		$New->where("id='$id'")->delete(); 
		$response = array('success' => true );
	           
  		echo json_encode($response);
	}

	public   function  edit()
	{
		$title=I('title');
		$url=I('url');
		$id=I('id');
		$data['title']=$title;
		$data['href']=$url;
		$data['time']= date("Y/m/d ", time());
		$New=M('news');
		$New->where("id='$id'")->save($data); 
		$response = array('success' => true );
	           
  		echo json_encode($response);
	}


	public function add()
	{
		$title=I('title');
		$url=I('url');
		$data['title']=$title;
		$data['href']=$url;
		$data['time']= date("Y/m/d ", time());
		$New=M('news');
		$New->data($data)->add();
		$response = array('success' => true );
	           
  		echo json_encode($response);
	}

	  public  function  user()
            {
                       $psd=I('psd');
                       p($psd);

                       $data['password']=$psd;
                       $User=M('user');
                       $User->where("name=admin")->save($data); 
                       $response = array('success' => true ,'msg' => '修改传成功');
	           
  		echo json_encode($response);
            }
		
 
}
?>