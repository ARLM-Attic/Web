<?php

class MainController extends Controller
{
	/**
	 * 登入成功的后台首页
	 */
	public function actionIndex()
	{
		//echo Yii::app()->session['name'];
		
		$this->render('index');
	}

            /**
             * 后台右侧首页
             */
	public function  actionmain()
	{
		$this->render('main');
	}

           
}
?>