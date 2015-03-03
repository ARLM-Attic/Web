<?php
/**
 * 文章管理控制器
 */
class ArticleController extends Controller{

	public function filters(){
		return array(
				'accessControl',
			);
	}

	public function accessRules(){
		return array(
			//更加具体化
			// array(
			// 	'deny',
			// 	'actions'=>array('del','add'),
			// 	'users'	=> array('admin')
			// 	),

			array(
				'allow',
				'actions'=>array('index', 'del','add'),
				'users'	=> array('@')
				),
			array(
				'deny',
				'users' => array('*')
				),


			);
	}


	/**
	 * 查看文章
	 */
	public function actionIndex(){
		$cri = new CDbCriteria();
		//$id="7";
		// $cri->addCondition("fatherid=$id"); //查询条件，即where fatherd = 7  
		$articleModel = Article::model();
		$total = $articleModel->count($cri);

		$pager = new CPagination($total);
		$pager->pageSize = 6;
		$pager->applyLimit($cri);

		$articleInfo = $articleModel->findAll($cri);

		$data = array(
			'articleInfo'	=> $articleInfo,
			'pages'			=> $pager
			);

		$this->render('index', $data);
	}

           /* $criteria = new CDbCriteria;      
	//函数方式
	    $criteria->addCondition("id=1"); //查询条件，即where id = 1  
	    $criteria->addInCondition('id', array(1,2,3,4,5)); //代表where id IN (1,23,,4,5,);  
	    $criteria->addNotInCondition('id', array(1,2,3,4,5));//与上面正好相法，是NOT IN  
	    $criteria->addCondition('id=1','OR');//这是OR条件，多个条件的时候，该条件是OR而非AND  
	    $criteria->addSearchCondition('name', '分类');//搜索条件，其实代表了。。where name like '%分类%'  
	    $criteria->addBetweenCondition('id', 1, 4);//between 1 and 4   
	      
	    $criteria->compare('id', 1);    //这个方法比较特殊，他会根据你的参数自动处理成addCondition或者addInCondition，  
	                                    //即如果第二个参数是数组就会调用addInCondition  
	     
	    $criteria->addCondition("id = :id");  
	    $criteria->params[':id']=1;  
	   
	//属性方式  
	    $criteria->select = 'id,parentid,name'; //代表了要查询的字段，默认select='*';  
	    $criteria->join = 'xxx'; //连接表  
	    $criteria->with = 'xxx'; //调用relations   
	    $criteria->limit = 10;    //取1条数据，如果小于0，则不作处理  
	    $criteria->offset = 1;   //两条合并起来，则表示 limit 10 offset 1,或者代表了。limit 1,10  
	    $criteria->order = 'xxx DESC,XXX ASC' ;//排序条件  
	    $criteria->group = 'group 条件';  
	    $criteria->having = 'having 条件 ';  
	    $criteria->distinct = FALSE; //是否唯一查询  */






	/**
	 * 添加文章
	 */
	public function actionAdd(){
		
		$articleModel = new Article();
		$category = Category::model();

		$categoryInfo = $category->findAllBySql("SELECT cid,cname FROM {{category}}");
		$cateArr = array();
		$cateArr[] = '请选择';
		foreach ($categoryInfo as $v) {
			$cateArr[$v->cid] = $v->cname;
		}

		$data = array(
			'articleModel'	=> $articleModel,
			'cateArr'		=> $cateArr
			);
		if(isset($_POST['Article'])){

			

			$articleModel->thumb = CUploadedFile::getInstance($articleModel, 'thumb');

			if($articleModel->thumb){
				$preRand = 'img_' . time() . mt_rand(0, 9999);
				$imgName = $preRand . '.' . $articleModel->thumb->extensionName;
				$articleModel->thumb->saveAs('uploads/' . $imgName);
				$articleModel->thumb = $imgName;

				//缩略图
				$path = dirname(Yii::app()->BasePath) . '/uploads/';

				$thumb = Yii::app()->thumb;
				$thumb->image = $path . $imgName;
				$thumb->width = 130;
				$thumb->height=95;
				$thumb->mode = 4;
				$thumb->directory = $path;
				$thumb->defaultName = $preRand;

				$thumb->createThumb();
				$thumb->save();
			}	


			$articleModel->attributes = $_POST['Article'];
			$articleModel->time = time();

			if($articleModel->save()){
				$this->redirect(array('index'));
			}
		}


		$this->render('add', $data);
	}



           /**
            * 删除文章   参数$cid自动获得get参数
            */
	public function actionDel($aid){
		$articleModel = Article::model();

		if($articleModel->deleteByPk($aid)){
			$this->redirect(array('index'));
		}
	}
}









