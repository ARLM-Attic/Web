<?php 
class CategoryController extends Controller{
	public function filters(){
		return array(
				'accessControl',
			);
	}

	public function accessRules(){
		return array(
			//更加具体化
			// array(
			// 	'allow',
			// 	'actions'=>array('del','add'),
			// 	'users'	=> array('admin')
			// 	),

			array(
				'allow',
				'actions'=>array('index', 'del','add', 'edit'),
				'users'	=> array('@')
				),
			array(
				'deny',
				'users' => array('*')
				),


			);
	}

	/**
	 * 查看栏目
	 */
	public function actionIndex(){
		$categoryModel = Category::model();
		$sql = "SELECT cid,cname FROM {{category}}";
		$categoryInfo = $categoryModel->findAllBySql($sql);

		$this->render('index', array('categoryInfo'=>$categoryInfo));
	}

	/**
	 * 添加栏目
	 */
	public function actionAdd(){
		$categoryModel = new Category();

		$state=true;

		if(isset($_POST['Category'])){
			$categoryModel->attributes = $_POST['Category'];
                                 $categoryModels= Category::model();
			$sql = "SELECT cid,cname FROM {{category}}";
		           $categoryInfos = $categoryModels->findAllBySql($sql);
		           //判断是否同名
		            foreach($categoryInfos as $v)
		            {
		            	
                                     if($_POST['Category']['cname']==$v->cname)
                                     {
                                     	    Yii::app()->user->setFlash('success1', '栏目名已存在！');//调用get后自动销毁
                                     	     p($_POST['Category']['cname']);
                                     	     $state=false;
                                     	    break;	    
                                     }
                                  }
                               
                                  if($state)
                                  {
				if($categoryModel->save()){
					$this->redirect(array('index'));
				}
		           }

		}
		$this->render('add', array('categoryModel'=>$categoryModel));
	}



	/**
	 * 编辑栏目
	 */
	public function actionEdit($cid){
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


	/**
	 * 删除栏目
	 */
	public function actionDel($cid){
		$articleModel = Article::model();

		$sql = "SELECT aid FROM {{article}} WHERE cid=$cid";
		$articleInfo = $articleModel->findBysql($sql);

		if(is_object($articleInfo)){
			Yii::app()->user->setFlash('hasArt', '栏目下面有文章，请先删除文章');
			$this->redirect(array('index'));
			
		}else {
			if(Category::model()->deleteByPk($cid)){
				$this->redirect(array('index'));
			}
		}



	}


}















