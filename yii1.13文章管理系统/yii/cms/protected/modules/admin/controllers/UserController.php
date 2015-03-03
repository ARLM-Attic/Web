<?php

class UserController extends Controller
{
	/**
	 * 修改登入密码
	 */
	public function actionPasswd()
	{
		//echo Yii::app()->user->name;
		$userModel = User::model();//实例化user模型，增加时用new实例化  new User();

		if(isset($_POST['User'])){

			$userInfo = $userModel->find('username=:name', array(':name'=>Yii::app()->user->name));

			$userModel->attributes = $_POST['User'];//把post的值压入模型，这步很重要
                                    //$userModel->validate()触发验证规则
			if($userModel->validate()){
				$password = md5($_POST['User']['password1']);

				if($userModel->updateByPk($userInfo->id, array('password'=>$password,'name'=>$_POST['User']['name']))){
					Yii::app()->session['name']=$_POST['User']['name'];
					//Yii::app()->user->setFlash('success', '修改密码成功');修改成功的提示信息，不好看
                                                            Yii::app()->user->setFlash('success', 'true');//调用get后自动销毁
				}
			}
		}

		$data=array('userModel'  =>$userModel);
		$this->render('index',$data);//传到页面
	}

          
           
}
?>