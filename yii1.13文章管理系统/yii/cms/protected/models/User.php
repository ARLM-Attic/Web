<?php
class User extends CActiveRecord{

	//不在数据表里的要定义
	public $password1;
	public $password2;

	//public $name;

	public static function model($className = __CLASS__){
		return parent::model($className);
	}

            /**
             * 表名,表前缀已经在config/main里配置
             */
	public function tableName(){
		return "{{user}}";
	}
            //------上面2个方法必须要


	/**
	 * 对应前台标签名,前台用<?php echo $form->labelEx($userModel, 'password') ?>调用
	 */

	public function attributeLabels(){
		return array(
			            'name'             =>'用户名',
				'password'	=> '原始密码',
				'password1'	=> '新密码',
				'password2'	=> '确认密码'

			);
	}



	/**
	 * 验证规则
	 */

	public function rules(){
		return array(
			array('name', 'required', 'message'=>'用户名必填'),
			array('password', 'required', 'message'=>'原始密码必填'),
			array('password', 'check_passwd'),//自定义规则
			array('password1', 'required', 'message'=>'新密码必填'),
			array('password1', 'check'),
			array('password2', 'required', 'message'=>'确认密码必填'),
			array('password2', 'compare', 'compareAttribute'=>'password1', 'message'=>'两次密码不相同'),
			);
	}

	      /**
	       * 编写自定义的规则
	       */
	public function check_passwd(){
		$userInfo = $this->find('username=:name', array(':name'=>Yii::app()->user->name));
		if(md5($this->password) != $userInfo->password){
			$this->addError('password', '原始密码不正确');
		}
	}


	public function check()
	{
		$userInfo = $this->find('username=:name', array(':name'=>Yii::app()->user->name));
		if(md5($this->password1)==$userInfo->password){
			$this->addError('password1', '修改密码和原密码一样');
		}
	}

}
















