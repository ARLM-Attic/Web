<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl ?>/assets/admin/css/public.css">
	<title>Document</title>
</head>
<body>

	<table class="table">
		<tr>
			<td class="th" colspan="10">查看文章</td>
		</tr>

		<tr>
			<td>序号</td>
			<td>栏目</td>
			<td>标题</td>
			<td>文章状态</td>
			<td>发表时间</td>
			<td>操作</td>
		</tr>
		
		<?php  $i=0;
		foreach($articleInfo as $v): 
		              ?>
			<tr>
			            <td><?php  $i++; echo $i ?></td>
				<td><?php echo $v['cate']->name //外键关联通过fatherid读取出栏目名，需在模型设置
                                                           //echo $v->fattherid
				      ?></td>
				<td><?php echo $v->title ?></td>
				<td><?php if($v->state=="true") echo "通过" ;
				            else
				            	echo "未通过";
				          ?></td>
				<td><?php echo $v->time ?></td>
				<td>
					[<a href="<?php echo $this->createUrl('edit', array('aid'=>$v->id)) ?>">编辑</a>]
					[<a href="<?php echo $this->createUrl('del', array('aid'=>$v->id)) ?>">删除</a>]
				</td>
			</tr>
		<?php  endforeach ?>
	</table>
	<div class="page">
		<?php 
			$this->widget('CLinkPager', array(
				'header'	=>	'',
				'firstPageLabel'	=> '首页',
				'lastPageLabel'	=> '末页',
				'prevPageLabel'	=> '上一页',
				'nextPageLabel'	=> '下一页',
				'pages'			=> $pages,
				'maxButtonCount'=> 5,
				

				));
		 ?>
	</div>
</body>
</html>