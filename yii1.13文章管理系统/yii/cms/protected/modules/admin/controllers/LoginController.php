<?php

class LoginController extends Controller
{
	public function actionIndex()
	{

		 //$this->layout = '/layouts/login_page';//指定布局
		//p( Yii::app()->db );//测试数据库连接
		$loginForm = new LoginForm();//实例化LoginForm
		if(isset($_POST['LoginForm'])){
			$loginForm->attributes = $_POST['LoginForm'];
                                       //$loginForm->validate()登入账号密码认证  $loginForm->login() 登入信息存储
			if($loginForm->validate() &&$loginForm->login()){
				//echo Yii::app()->user->name;---登入账号admin
				//登入成功
				Yii::app()->session['logintime'] = time();//调用session
				$this->redirect(array('main/index'));//(控制器/方法)

			}
		}
		//p($_POST);die;
		//$this->renderPartial('index',array('loginForm'=>$loginForm));//不加载布局，把loginform传到前台页面
		$this->render('index',array('loginForm'=>$loginForm));
	}


	public function actionOut()
	{
		Yii::app()->user->logout();//清除所有session
		$this->redirect(array('index'));//跳转到本控制器的登入页面，跳到其他控制器如main/index

	}

            //验证码
	public function actions(){

		return array(
			'captcha'	=> array(
					'class'	=> 'system.web.widgets.captcha.CCaptchaAction',
					'height' => 25,
					'width'	 => 80,
					'minLength'=> 4,
					'maxLength'=> 4

				),

			);
	}
}
?>