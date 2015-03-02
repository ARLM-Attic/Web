<?php
namespace Admin\Controller;
use Think\Controller;
class SessionController extends Controller {
	public function _initialize()//控制器的所有的方法在执行前都会先执行它
	{
		if(!session('?id'))//如果session不存在
		{
			$this->redirect('Admin/Index/index');
		}
		
	}
	
}
?>