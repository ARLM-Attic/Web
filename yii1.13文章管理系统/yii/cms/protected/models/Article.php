<?php
/**
 * 文章管理模型
 */
class Article extends CActiveRecord{


	public static function model($className = __CLASS__){
		return parent::model($className);
	}

	public function tableName(){
		return "{{article}}";
	}

	public function attributeLabels(){
		return array(
			'title'	=> '标题',
			'fatherid'	=> '栏目',
			'thumb'	=> '缩略图',
			'info'	=> '摘要',
			'content'=> '内容'

			);
	}
               //rules里放置才能把属性压入$articleModel->attributes = $_POST['Article'];
	public function rules(){
		return array(
			array('title','required','message'=>'标题必填'),
			array('fatherid','required','message'=>'标题必填'),
			array('info','required', 'message'=>'摘要必填'),
			array('thumb','file','types'=>'jpg,gif,png,jpeg', 'message'=>'没有上传或者类型不符'),
			array('content','required','message'=>'内容必填'),
			
			array('content,info','safe'),//不过滤html；
			);
	}


           //外键连接Category表
	public function relations(){
		return array(
			'cate'	=> array(self::BELONGS_TO,'Category', 'fatherid')
			);
	}



}










