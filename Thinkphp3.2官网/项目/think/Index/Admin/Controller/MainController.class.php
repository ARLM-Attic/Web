<?php
namespace Admin\Controller;
use Think\Controller;
class MainController extends SessionController{

	public  function  index()//登入成功主界面,使用ext4.2
	{
		$this->display();
	}

	//-------------------json样式

			/*{  
			    "items": [  
			        {  
			            "UserName": "tian",  
			            "Sex": "男",  
			            "Age":18, 
			            "XueHao":001, 
			            "BanJi":'软件一班' 
			        },  
			        {  
			            "UserName": "tian",  
			            "Sex": "男",  
			            "Age":18, 
			            "XueHao":001, 
			            "BanJi":'软件一班' 
			        }, 
			         {  
			            "UserName": "tian",  
			            "Sex": "男",  
			            "Age":18, 
			            "XueHao":001, 
			            "BanJi":'软件一班' 
			        }
			    ]  
			}*/

	//-------------------------------

	public function  xmlshow()
	{
		//读取文件路径函数
	          /*$dir = "./";

                      if (is_dir($dir)) 
                      {
		if ($dh = opendir($dir))
		{
		       while (($file = readdir($dh)) !== false)
		       {
		         echo "filename: $file : filetype: " . filetype($dir . $file) . "\n";
		       }
		       closedir($dh);
		}
	         }
	         die();*/
                       if (file_exists('./Public/images.xml'))
                       {
			$xml  = simplexml_load_file('./Public/images.xml');
			$temp=$xml->menu;
			 foreach($xml->menu as $list){  
	                              $value[]=get_object_vars($list->attributes());  
	                              
	                        }    
	                      
	           }
	           $test=array();

	           for($i=0;$i<count($value);$i++)
	           {
	           	             $test[$i]=$value[$i]['@attributes'];
	           }

	           $rest=json_encode($test);

	        

	           $rest="{".'"root":'.$rest."}";
   
                        echo $rest;//返回json
            }



            public function  xmlhandler()
            {
            	$xml=simplexml_load_file('./Public/images.xml');    

            	switch(I('temp'))
                       {
                       	     //修改
                              case 1:
                                       $id=I('id');
                                       $xg=$xml->xpath("/root/menu[@id=$id]");  
                                       foreach($xg as $list){  
	                       
	                              $list->attributes()->url=I('value');
	                              $xml->asXML('./Public/images.xml');
	                              
	                           }   
	                           echo "success";
                                       break;  
                             //删除
                              case 2:
                                    $id=I('id');
                                    $i=0;  
			foreach($xml as $dup){  
			               $sc=$dup->attributes();  
				   if($sc['id']==$id){  
					   unset($xml->menu[$i]); 
					   $xml->asXML('./Public/images.xml');
					    $path=str_replace("/think", ".", I('path'));
	                                                   unlink($path);
					   break; 
			               }  
			             $i++;  
			 }  
                                   break;
                      

                       }
            }

            public  function  imageupload()
            {
                    $id=I('id');
                    $upload = new \Think\Upload();// 实例化上传类
	        $upload->maxSize   =    3145728 ;// 设置附件上传大小
	        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
	        $upload->rootPath  =     './Datas/'; // 设置附件上传根目录
	        $upload->savePath  =     'images/'; // 设置附件上传（子）目录
	        $upload->saveName ='time';//文件名取时间
	        $upload->autoSub = false;//禁止生产日期文件夹
	        // 上传文件 
	        $info   =   $upload->upload();
	        $name=$info[datas]['savename'];//图片保存名
	        if(!$info) {// 上传错误提示错误信息
	            $response = array('success' => false, 'msg' => '上传失败' );
  		echo json_encode($response);
	        }else{// 上传成功

	        	//修改图片显示路径
	        	 if(I('op')==1)//修改
	        	 {

                           $xml=simplexml_load_file('./Public/images.xml');    
	               $xg=$xml->xpath("/root/menu[@id=$id]");  
                            foreach($xg as $list){  
	                       
	                              $list->attributes()->imageUrl="http://42.96.184.124/think/Datas/images/".$name;
	                              $xml->asXML('./Public/images.xml');
	                              
	                           } 
	                $path=str_replace("/think", ".", I('path'));
	                unlink($path);//删除图片
	            }
	            if(I('op')==2)//增加
	            {
	            	 $xml=simplexml_load_file('./Public/images.xml'); 
	            	 $app=$xml->addChild('menu');  
		             $app->addAttribute('id',time());  
			 $app->addAttribute('url',I('url'));  
			 $app->addAttribute('frame','_parent');  
			 $app->addAttribute('imageUrl',"http://42.96.184.124/think/Datas/images/".$name); 
			 $xml->asXML('./Public/images.xml');      
	            }
	             $response = array('success' => true ,'msg' => '图片上传成功');
	           
  		 echo json_encode($response);
	           
	        }
            }

            public  function newshow()
            {
            	$content=D('News');
		$kk=$content->Getdata();
		$kk=json_encode($kk);
		$rest="{".'"root":'.$kk."}";
		echo $rest;
            }



}
