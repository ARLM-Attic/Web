<?php
namespace Home\Controller;
use Think\Controller;
class HeadController extends  Controller {

            public function  head()
            {
                  
                       header("Content-type: text/html; charset=utf-8");
                      $Title=M('headtitle');
                      $title = $Title->select();

                      $Childtitle=M('childtitle');
                      $childtitle = $Childtitle->select();
                 
                 //生成二维数组，用于显示
                     for($i=0;$i<count($title);$i++)
                     {
                     	$temp=0;
                     	for($k=0;$k<count($childtitle);$k++)
                     	{
                     		if($title[$i]['id']==$childtitle[$k]['fatherid'])
                     		{
                     			$title[$i]['child'][$temp]=$childtitle[$k];
                     			$temp++;
                     		}
                     	}
                     }
                
                 return  $title;
       
            }

          
}
?>