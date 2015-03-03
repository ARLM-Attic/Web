<?php

class CategoryController extends Controller
{
	/**
	 * 增加栏目
	 */
	public function actionAdd(){
		$categoryModel = new Category();

		if(isset($_POST['Category'])){

			$categoryModel->attributes = $_POST['Category'];//把信息压入模型进行验证
                                    $categoryModel->createuser=  Yii::app()->user->name;
                                    $categoryModel->time=date('Y-m-d H:m:s',time());
			if($categoryModel->save()){
				Yii::app()->user->setFlash('category', '栏目添加成功');//页面成功显示
			}

		}
		// p($_POST);
		$this->render('add', array('categoryModel'=>$categoryModel));
	}


            /**
	 * 查看栏目
	 */
	public function actionIndex(){
		$categoryModel = Category::model();
		$sql = "SELECT * FROM {{category}}";//{{}}代表表前缀
		$categoryInfo = $categoryModel->findAllBySql($sql);

		$this->render('index', array('categoryInfo'=>$categoryInfo));
	}

            /**
             * 删除栏目  参数$cid自动获得get参数
             */
	public function actionDel($cid){
		$articleModel = Category::model();

		if($articleModel->deleteByPk($cid)){
			$this->redirect(array('category/index'));
		}
	}


	 /**
             * 编辑栏目  参数$cid自动获得get参数
             */
	public function actionEdit($cid){
		//echo $cid;
		/*$userInfo = Category::model()->find('id=:name', array(':name'=>$cid));
		p($userInfo);*/
		$categoryModel = Category::model();
		$categoryInfo = $categoryModel->findByPk($cid);
		
		// p($_POST);
		if(isset($_POST['Category'])){
			$categoryInfo->attributes = $_POST['Category'];
			if($categoryInfo->save()){
				$this->redirect(array('index'));
			}
		}

		

		$this->render('edit', array('categoryModel'=>$categoryInfo));
	}

      
          
           
}
?>