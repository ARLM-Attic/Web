<?php
namespace Admin\Model;
use Think\Model;
class UserModel extends Model {

	public   function  loginAction($array)
	{
		
		$User=M('user');
		$id=$array['username'];
		$pwd=$array['password'];
		$data = $User->where("name='$id'  AND password='$pwd' ")->find();
		return   $data;
	}

}

?>