<?php
/**
 * 后台登陆控制器
 */
class LoginController extends Controller{
	/**
	 * 后台登陆模板
	 */
	public function actionIndex(){
		
		// p($userInfo->password);die;
		
		// var_dump(Yii::app()->db);
		$loginForm = new LoginForm();
		if(isset($_POST['LoginForm'])){
			$loginForm->attributes = $_POST['LoginForm'];

			if($loginForm->validate() && $loginForm->login()){
				//echo Yii::app()->user->name;---登入账号admin
				//登入成功
				Yii::app()->session['logintime'] = time();
				$this->redirect(array('default/index'));
			}
		}
		
                      //$this->renderPartial('index',array('loginForm'=>$loginForm));//不加载布局，把loginform传到前台页面
		$this->render('index',array('loginForm'=>$loginForm));
	}

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

	public function actionOut(){
		Yii::app()->user->logout();
		$this->redirect(array('index'));
	}



}













