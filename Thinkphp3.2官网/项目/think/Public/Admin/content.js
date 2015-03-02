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



//---------------定义修改窗口
function EditContent(fuckid,content,name,father)
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
    items : [ {
                    xtype: 'hiddenfield',//表单隐藏提交
	        name: 'fuckid',
	        value: fuckid
	    },
	    {
	
		    xtype:"combo",
		    editable: false,
		    name: 'identity',
		    width:250,
		    allowBlank:false,
		    store:["产品展示","新闻资讯","公司简介","品牌展示","招贤纳士","商务合作"],
		    fieldLabel:"主标题",
		    emptyText:"请选择主标题",
		    value:father,
		    id:'combo1'
	  },
	  {
        	            xtype : "textfield",
	    	fieldLabel : "小标题",
	    	emptyText: '请输入标题',
	    	id : "title1",
	    	allowBlank : false,
	    	value:name,
	    	blankText:"标题不能为空！"
            },
	  {
	    	xtype : "htmleditor",
	            height : 380,
	    	width : 550,
	    	//anchor : '90%',
	    	fieldLabel : "内容",
	    	emptyText: "请输入内容",
	    	value:content,
	    	allowBlank : false,
	    	id : "content123"
            }
	  
    
         ],
            	buttons :
		[{
			//上传提交按钮
			text:"确定",
			
			handler:function()
			{

				var con=Ext.getCmp('content123').getValue();
				var  com=Ext.getCmp('combo1').getValue();
				var  title=Ext.getCmp('title1').getValue();

				if(!con||!com||!title)
				{
					Ext.Msg.alert('系统提示',"请填写完整信息");
					return  false;
				}

				Ext.Ajax.request({

							url:'/think/index.php/Admin/Content/edit',//获取点击的序号
						             params:{fuckid:fuckid,
						             	content:con,
						             	title:title,
						             	combo:com
							            
							   },
							method : 'POST',
							timeout : 2000,
							success : function(form, action) {
											          Ext.example.msg('<font color="#0000ff">温馨提示</font>','修改成功！');
											           contentgrid.store.reload();
											}
						});	
			}
		
		},
		{
				text : "取消",
				handler:function(){
					win.close();
				}
			}
		]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"修改首页图片",
		items:[fform],
		buttonAlign:"center",
		
		});
	win.show();
}

//------增加窗口

function add12()
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
	
		    xtype:"combo",
		    editable: false,
		    name: 'identity',
		    width:250,
		    allowBlank:false,
		    store:["产品展示","新闻资讯","公司简介","品牌展示","招贤纳士","商务合作"],
		    fieldLabel:"主标题",
		    emptyText:"请选择主标题",
		    value:"新闻资讯",
		    id:'combo123'
	  },
	  {
        	            xtype : "textfield",
	    	fieldLabel : "小标题",
	    	emptyText: '请输入标题',
	    	id : "title123",
	    	allowBlank : false,

	    	blankText:"标题不能为空！"
            },
	  {
	    	xtype : "htmleditor",
	            height : 380,
	    	width : 550,
	    	//anchor : '90%',
	    	fieldLabel : "内容",
	    	emptyText: "请输入内容",
	    	//value:content,
	    	id : "content12312"
            }
	  
    
         ],
            	buttons :
		[{
			//上传提交按钮
			text:"确定",
			
			handler:function()
			{

				var con=Ext.getCmp('content12312').getValue();
				var  com=Ext.getCmp('combo123').getValue();
				var  title=Ext.getCmp('title123').getValue();
				if(!con||!com||!title)
				{
					Ext.Msg.alert('系统提示',"请填写完整信息");
					return  false;
				}
				Ext.Ajax.request({

							url:'/think/index.php/Admin/Content/add',//获取点击的序号
						             params:{
						             	content:con,
						             	title:title,
						             	combo:com
							            
							   },
							method : 'POST',
							timeout : 2000,
							success : function(form, action) {
											          Ext.example.msg('<font color="#0000ff">温馨提示</font>','添加成功！');
											           contentgrid.store.reload();
											}
						});	
			}
		
		},
		{
				text : "取消",
				handler:function(){
					win.close();
				}
			}
		]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"增加内容",
		items:[fform],
		buttonAlign:"center",
		
		});
	win.show();
}

function changecontent(value)
{
         if(value.length>=28)
         	return value.substr(0, 28); 
         else
         	return value;
}


//---------js'跨页调用，只要在同一html引入，定义时不要加var。不要var contentgrid=
          contentgrid=Ext.create("Ext.grid.Panel",{
			
			title:'内容管理',
			frame:true,
			forceFit:true,//自动填充空白
			scroll:'both',
			
            alias:'widget.01',
            id:'contentgrid',

          
          
			columns: [//配置表格列
			
			     //序号
			     Ext.create("Ext.grid.RowNumberer",{
			            flex : 1,
			    	text:'序号'
			    	
			    }),
			  
                {header: "主标题", flex : 3, dataIndex: 'fatherid', sortable: true},

                 {header: "小标题", flex : 3, dataIndex: 'name', sortable: true
		         
                     },
               
                  {header: "主要内容", dataIndex: 'content', sortable: true,  flex : 3,renderer:changecontent},
                  {
					header : '相关操作',
					xtype : 'actioncolumn',
					flex : 3,
					sortable : true,
					menuDisabled : true,
					items : [{
						icon : '/think/Public/Admin/images/edit.png',
						tooltip : '修改内容',
						handler : function(grid, rowIndex, colIndex) {
						            var rec = grid.getStore().getAt(rowIndex);
							var fuckid = rec.get('id');
							var content = rec.get("content");
							var  name=rec.get("name");
							var father=rec.get("fatherid")

							 EditContent(fuckid,content,name,father);
						}
					}, {
						icon : '/think/Public/Admin/images/no.png',

						tooltip : '删除',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var id = rec.get('id');
							Ext.MessageBox.show({
									title : "提示",
									msg : "是否删除此内容?",
									buttons : Ext.Msg.OKCANCEL,
									icon : Ext.MessageBox.QUESTION,
									fn : function(buttonId) {
										if (buttonId == "ok") {
											Ext.Ajax.request({

												url:'/think/index.php/Admin/Content/delete',//获取点击的序号
									    			params:{id:id
									    			             },
												method : 'POST',
												timeout : 2000,
												success : function(form, action) {
													Ext.example.msg('<font color="#0000ff">温馨提示</font>','删除成功！');
													contentgrid.store.reload();
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
			    fields: ['id','fatherid','name','content'],//定义字段
			    
			    sorters:[{property:"fatherid",direction:"DESC"}],//按id倒序
			    
			    viewConfig: {
                                 forceFit : true,//按照 width比例分配宽度

                                 stripeRows: true//在表格中显示斑马线
                             },
                  
                proxy:{  
                           type: 'ajax',  
                           url:'/think/index.php/Admin/Content/show', //请求的数据的url  
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

		   {xtype:'button',text:'增加内容',
		   icon : '/think/Public/Admin/images/add.png',
		    handler:function(buttonObj){
		    	
		    	add12();
		    	
		    }
		 },
			
			
			{
	
		    xtype:"combo",
		    editable: false,
		    name: 'identitycontent',
		    width:250,
		    allowBlank:false,
		    store:["主标题","小标题"],
		    fieldLabel:"选择查找方式",
		    emptyText:'图片编号',
		    value:'主标题',
		    id:'typecontent'
		},
		{ xtype:'textfield',id:'idcontent', name:'user.idcontent'},
		{xtype:'button',text:'查找',
		    handler:function()
		    {contentgrid.store.clearFilter();
		    	contentgrid.store.reload();//传递参数      
		    var ids = Ext.getCmp('idcontent').getValue();
		    var type= Ext.getCmp('typecontent').getValue();//获取文本框值
		    
		    if (ids!=""&&type=="主标题") {          
		    	
		    	contentgrid.store.filter('fatherid',ids); //查找，利用EXT的过滤器
		    	
		    	}  
		    else
		    	{contentgrid.store.filter('name',ids);}
		    }            
		              

		 } 
				]
			
				   	         
				});
	
			

});



