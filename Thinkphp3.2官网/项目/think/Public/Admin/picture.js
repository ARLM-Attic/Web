Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux.data', 'Ext4.2/examples/ux/data');// '类名前缀','所在路径'
Ext.Loader.setPath('Ext.ux', 'Ext4.2/examples/ux');

Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.form.*', 'Ext.tip.*',
		'Ext.window.MessageBox', 'Ext.selection.CheckboxModel']);

Ext.require('Ext.Ajax');

Ext.onReady(function() {

	Ext.QuickTips.init();
	Ext.Msg.msgButtons[0].setText("确定");// OK
	Ext.Msg.msgButtons[1].setText("是");// YES
	Ext.Msg.msgButtons[2].setText("否");// NO
	Ext.Msg.msgButtons[3].setText("取消");// CANCEL

// -----------预览頁面
	function CreatVeiw() {
		var newwin = new Ext.Window({
			title : '<center><font size="3" color="#0000cc">首页推荐图预览</font></center>',
			modal : true,
			width : 700,
			height : 500,
			layout : 'fit',
			frame : false,
			draggable : true,
			items : [{
				html : '<iframe frameborder="0" width="100%" height="100%" src="/think/index.php/Home/Index/head" </iframe>'
			}]
		});
		newwin.show();
		newwin.fitContainer(); //满屏
		newwin.center();// 居中
	}

//---------------定义修改窗口
function EditPaper(id,url)
{
    var fform1 = Ext.create('Ext.form.Panel',{
    baseCls:"x-plain",
    bodyPadding: '20 30 20 20',
    waitMsgTarget: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 35,
        msgTarget: 'qtip'
    },
    items : [ {
                    xtype: 'hiddenfield',//表单隐藏提交
	        name: 'id',
	        value: id
	    },
	    {
                    xtype: 'hiddenfield',//表单隐藏提交
	        name: 'path',
	        value: url
	    },
	    {
                    xtype: 'hiddenfield',//表单隐藏提交
	        name: 'op',
	        value: 1
	    },
    
        {
               xtype : 'filefield',  
               fieldLabel : '更换图片',  
               name : 'datas',  
               id : 'userfile1', 
               buttonText : '更换图片',
               anchor : '95%' // anchor width by percentage 
            }],
            	buttons :
		[{
			//上传提交按钮
			text:"开始上传",
			type:"submit",
			handler:function(){
				if(fform1.form.isValid()){
					Ext.MessageBox.show({
						title:"请等待",
						msg:"文件正在上传，请等待。。。",
						progressText:"",
						width:300,
						progress:true,
						closable:false,
						animEl:'loding'
					});
					
					var f = function(v){
						return function(){
							var i = v/11;
							Ext.MessageBox.updateProgress(i,'');
						}
					}
					
					for(var i = 1; i < 13; i++){
						setTimeout(f(i),i *150);
					}
					
					//提交到服务器操作
					  fform1.form.doAction("submit",{
						url:"/think/index.php/Admin/Main/imageupload",
						method:"post",
						success:function(form,action){
							
							Ext.Msg.alert('系统提示',action.result.msg);
							mangrid.store.reload();
							//window.location.replace('teacher.jsp');
							
						},
						failure:function(form, action){
							Ext.Msg.alert('系统提示',action.result.msg);
						}
					});
				}
			}
		
		}]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"修改首页图片",
		items:[fform1],
		buttonAlign:"center",
		
		});
	win.show();
}

//------增加窗口
//---------------定义修改窗口
function add22()
{
    var fform = Ext.create('Ext.form.Panel',{
    baseCls:"x-plain",
    bodyPadding: '20 30 20 20',
    waitMsgTarget: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 35,
        msgTarget: 'qtip'
    },
    items : [  
          {
        	xtype : "textfield",
	    	fieldLabel : "*跳转链接",
	    	emptyText: '请输入跳转链接',
	    	name : "url",
	    	allowBlank : false,
	    	value:"http://",
	    	blankText:"跳转链接不能为空！"
        },
        {
                    xtype: 'hiddenfield',//表单隐藏提交
	        name: 'op',
	        value: 2
	    },
    
        {
               xtype : 'filefield',  
               fieldLabel : '选择图片',  
               name : 'datas',  
               id : 'userfile12', 
               buttonText : '选择图片',
               anchor : '95%' // anchor width by percentage 
            }],
            	buttons :
		[{
			//上传提交按钮
			text:"开始上传",
			type:"submit",
			handler:function(){
				var arr=Ext.getCmp('userfile12').getValue().split('.');

				if(arr[arr.length-1] !='jpg'&&arr[arr.length-1] != 'gif'&&arr[arr.length-1] != 'png'&&arr[arr.length-1] != 'jpeg')
				{
					Ext.Msg.alert('系统提示',"请选择图片文件");
					return  false;
				}

				if(fform.form.isValid()){
					Ext.MessageBox.show({
						title:"请等待",
						msg:"文件正在上传，请等待。。。",
						progressText:"",
						width:300,
						progress:true,
						closable:false,
						animEl:'loding'
					});
					
					var f = function(v){
						return function(){
							var i = v/11;
							Ext.MessageBox.updateProgress(i,'');
						}
					}
					
					for(var i = 1; i < 13; i++){
						setTimeout(f(i),i *150);
					}
					
					//提交到服务器操作
					  fform.form.doAction("submit",{
						url:"/think/index.php/Admin/Main/imageupload",
						method:"post",
						success:function(form,action){
							
							Ext.Msg.alert('系统提示',action.result.msg);
							mangrid.store.reload();
							//window.location.replace('teacher.jsp');
							
						},
						failure:function(form, action){
							Ext.Msg.alert('系统提示',action.result.msg);
						}
					});
				}
			}
		
		}]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"增加首页图片",
		items:[fform],
		buttonAlign:"center",
		
		});
	win.show();
}


//---------js'跨页调用，只要在同一html引入，定义时不要加var。不要var mangrid=
          mangrid=Ext.create("Ext.grid.Panel",{
			
			title:'首页推荐图',
			frame:true,
			forceFit:true,//自动填充空白
			scroll:'both',
			
            alias:'widget.05',
            id:'picturegrid',

             plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                          clicksToEdit:1//点击一下进行编辑    
                      })
                  ],
            
          
			columns: [//配置表格列
			
			     //序号
			     Ext.create("Ext.grid.RowNumberer",{
			            flex : 1,
			    	text:'序号'
			    	
			    }),
			  
                {header: "图片编号", flex : 3, dataIndex: 'id', sortable: true},

                 {header: "跳转链接", flex : 3, dataIndex: 'url', sortable: true,
		            editor: {
			                xtype: 'textfield',
			                allowBlank: false
			            }
                     },
               
                  {header: "图片路径", dataIndex: 'imageUrl', sortable: true,  flex : 3 },
                  {
					header : '相关操作',
					xtype : 'actioncolumn',
					flex : 3,
					sortable : true,
					menuDisabled : true,
					items : [{
						icon : '/think/Public/Admin/images/edit.png',
						tooltip : '替换图片',
						handler : function(grid, rowIndex, colIndex) {
						            var rec = grid.getStore().getAt(rowIndex);
							var fuckid = rec.get('id');
							var imageUrl = rec.get("imageUrl");

							 EditPaper(fuckid,imageUrl);
						}
					}, {
						icon : '/think/Public/Admin/images/no.png',

						tooltip : '删除',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var id = rec.get('id');
							var  path=rec.get('imageUrl');
							Ext.MessageBox.show({
									title : "提示",
									msg : "是否删除图片?",
									buttons : Ext.Msg.OKCANCEL,
									icon : Ext.MessageBox.QUESTION,
									fn : function(buttonId) {
										if (buttonId == "ok") {
											Ext.Ajax.request({

												url:'/think/index.php/Admin/Main/xmlhandler',//获取点击的序号
									    			params:{id:id,
									    				 path:path,
									    				 temp:2//运行删除
									    			             },
												method : 'POST',
												timeout : 2000,
												success : function(form, action) {
													Ext.example.msg('<font color="#0000ff">温馨提示</font>','删除成功！');
													mangrid.store.reload();
												}
											});
										} else {
											return false;
										}
									}
								});
							
						}
					}]
				}

            
          
            ],
			
			store:{
				storeId:'store',
			    fields: ['id','url','frame','imageUrl'],//定义字段
			    
			    sorters:[{property:"id",direction:"DESC"}],//按id倒序
			    
			    viewConfig: {
                                 forceFit : true,//按照 width比例分配宽度

                                 stripeRows: true//在表格中显示斑马线
                             },
                  
                proxy:{  
                           type: 'ajax',  
                           url:'/think/index.php/Admin/Main/xmlshow.html', //请求的数据的url  
                           reader:{  
                                     type:'json',  
                                     root:'root', //对应action中需要被现实的字段，一般为list  
                                     successProperty:'flag',  
                                     totalProperty: 'total'  
                                  }  
                        },
			  
               autoLoad: true//自动加载
			},
			//多选框
			selType:'checkboxmodel',
			multiSelect:true,
			
            
		tbar:[//获取多选框选中数据

		   {
		   	xtype:'button',text:'增加图片',
		             icon : '/think/Public/Admin/images/add.png',
		            handler:function(buttonObj){
		    	
		    	add22();
		    	
		    }
		 },{
				text:"预览效果",
				type:"button",
				icon : '/think/Public/Admin/images/view.gif',
				handler:function(){
				CreatVeiw();
	               
	              
				}
			},
			
			
			{
	
		    xtype:"combo",
		    editable: false,
		    name: 'identitypicture',
		    width:250,
		    allowBlank:false,
		    store:["图片编号","跳转链接"],
		    fieldLabel:"选择查找方式",
		    emptyText:'图片编号',
		     value:"图片编号",
		    id:'typepicture'
		},
		{ xtype:'textfield',id:'idpicture', name:'user.idpicture'},
		{xtype:'button',text:'查找',
		    handler:function()
		    {mangrid.store.clearFilter();
		    	mangrid.store.reload();//传递参数      
		    var ids = Ext.getCmp('idpicture').getValue();
		    var type= Ext.getCmp('typepicture').getValue();//获取文本框值
		    
		    if (ids!=""&&type=="图片编号") {          
		    	
		    	mangrid.store.filter('id',ids); //查找，利用EXT的过滤器
		    	
		    	}  
		    else
		    	{mangrid.store.filter('url',ids);}
		    }            
		              

		 } 
					]
			
				   	         
				});
	                          //修改跳转链接
			mangrid.on('edit', function(editor, e) {
			    // 提交更改在编辑完以后
			    var  value=e.value;//修改的值
			    var store=mangrid.getStore();  	
			    var record=store.getAt(e.rowIdx);
			    var id=record.get('id');//获取id;
			    //通过ajax传值到后台进行存储
			    	Ext.Ajax.request({
			    		
			    			url:'/think/index.php/Admin/Main/xmlhandler',//获取点击的序号
			    			params:{id:id,
			    				 value:value,
			    				temp:1//运行修改
			    			             },//传值到后台,单传2个值到后台时以,分开
			    			method:'POST',
			    			timeout:2000,
			    			success:function(response,opts){
			    				
			    				mangrid.store.reload();
			    				
							    
			    			}
			    			
			    		})
			    
			    
			})

});



