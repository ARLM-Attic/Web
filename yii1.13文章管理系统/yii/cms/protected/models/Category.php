<?php 
class Category extends CActiveRecord{



	/*非数据库字段要定义，如:
	public  $name;*/


	public static function model($className = __CLASS__){
		return parent::model($className);
	}

	public function tableName(){
		return "{{category}}";
	}
            
	public function attributeLabels(){
		return array(
			'name'	=> '栏目名称',
			'description' =>'栏目描述'

			);
	}

	public function rules(){
		return array(

			array('name', 'required', 'message'=>'栏目名必填'),
			array('description', 'required', 'message'=>'请填写栏目描述')
			);
	}

}