<?php
namespace Admin\Model;
use Think\Model;
class NewsModel extends Model {

	public   function Getdata()
	{
		
		$New=M('news');
		$data = $New->select();

		return   $data;
	}


}

?>