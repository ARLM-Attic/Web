<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<script language="javascript" src="<?php echo Yii::app()->request->baseUrl ?>/assets/admin/layer/layer-v1.8.5/jquery-1.8.0.min.js" type="text/javascript"></script>
            <script language="javascript" src="<?php echo Yii::app()->request->baseUrl ?>/assets/admin/layer/layer-v1.8.5/layer/layer.min.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl ?>/assets/admin/css/public.css">
	<title>Document</title>
</head>
<script type="text/javascript">
 

  $(function(){

  	var ds ="<?php echo Yii::app()->user->getFlash('success') ?>" ;
  
	if(ds)
	{
		 layer.alert('密码修改成功!', 1); //风格一

	   //document.getElementById('bt_login').click();//自动点击按钮
	}
  
  });

 </script>
<body>
   <!--  开启前台JS自动验证 -->
	<?php $form=$this->beginWidget('CActiveForm', array(
		'enableClientValidation'=>true,
		'clientOptions'=>array(
			'validateOnSubmit'=>true,
		),
	)); ?>



	<?php 
		/*if(Yii::app()->user->hasFlash('success')){
			echo Yii::app()->user->getFlash('success');
			
		}*/

	 ?>
	<table class="table">
		<tr>
			<td class="th" colspan="10">修改密码</td>
		</tr>
		<tr>
			<td>用户账号</td>
			<td><?php echo Yii::app()->user->name ?></td>
		</tr>
		<tr>
			<td><?php echo $form->labelEx($userModel, 'name') ?></td>
			<td>
				<?php echo $form->textField($userModel, 'name' ,array('value' => Yii::app()->session['name']) ) ?>

				<?php echo $form->error($userModel, 'name') ?>
			</td>
		</tr>
		<tr>
			<td><?php echo $form->labelEx($userModel, 'password') ?></td>
			<td>
				<?php echo $form->passwordField($userModel, 'password') ?>

				<!-- $userModel后台实例化的模型，输出paassword的错误信息 -->
				<?php echo $form->error($userModel, 'password') ?>
			</td>
		</tr>
		<tr>
			<td><?php echo $form->labelEx($userModel, 'password1') ?></td>
			<td>
				<?php echo $form->passwordField($userModel, 'password1') ?>
				<?php echo $form->error($userModel, 'password1') ?>
			</td>
		</tr>
		<tr>
			<td><?php echo $form->labelEx($userModel, 'password2') ?></td>
			<td>
				<?php echo $form->passwordField($userModel, 'password2') ?>
				<?php echo $form->error($userModel, 'password2') ?> 
			</td>
		</tr>
		<tr>
			<td colspan="10">
				<input type="submit" class="input_button" value="修改" />
			</td>
		</tr>
	</table>
	<?php $this->endWidget() ?>
</body>
</html>