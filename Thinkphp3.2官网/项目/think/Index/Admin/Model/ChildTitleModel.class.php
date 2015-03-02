<?php
namespace Admin\Model;
use Think\Model;
class ChildTitleModel extends Model {
	public function   data()
	{
	          header("Content-type: text/html; charset=utf-8");
                      $Title=M('headtitle');
                      $title = $Title->select();

                      $Childtitle=M('childtitle');
                      $childtitle = $Childtitle->select();
                 
                 //生成二维数组，用于显示
                     for($i=0;$i<count($childtitle);$i++)
                     {
                     	  for($k=0;$k<count($title);$k++)   
                     	  {
                     	  	if($childtitle[$i]['fatherid']==$title[$k]['id'])
                     	  	{
                     	  		$childtitle[$i]['fatherid']=$title[$k]['name'];
                     	  		break;
                     	  	}
                     	  }               	
                     }
                     return   $childtitle;
	}

}

?>