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
//----------------------------
function  EditNew(id,title,url)
{
    var fformnew = Ext.create('Ext.form.Panel',{
    baseCls:"x-plain",
    bodyPadding: '20 30 20 20',
    waitMsgTarget: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 50,
        msgTarget: 'qtip'
    },
    items : [ {
                    xtype: 'hiddenfield',//表单隐藏提交
	        name: 'id',
	        value: id
	    },
	  
	    {
                    xtype : "textfield",
	    	fieldLabel : "新闻标题",
	    	emptyText: '请输入新闻标题',
	    	name : "title",
	    	id:'newtitle',
	    	width : 350,
	    	value:title,
	    	allowBlank : false,
	    	blankText:"新闻标题不能为空！"
	    },
	    
	    {
                        xtype : "textfield",
	    	fieldLabel : "跳转链接",
	    	emptyText: '请输入跳转链接',
	    	name : "url",
	    	width :350,
	    	id:'newurl',
	    	value:url,
	    	allowBlank : false,
	    	blankText:"跳转链接不能为空！"
	    }
    
    
               ],
            	buttons :
		[{
			
			text:"确定",
			handler:function(){
				var title=Ext.getCmp('newtitle').getValue();
				var url=Ext.getCmp('newurl').getValue();
				if(!title||!url)
				{
					Ext.Msg.alert('系统提示',"请填写完整内容");
					return false;
				}
				var temp=url.substr(0, 4); 
				if(temp!="http")
				{
					Ext.Msg.alert('系统提示',"请填正确的链接");
					return false;
				}
				Ext.Ajax.request({

							url:'/think/index.php/Admin/News/edit',//获取点击的序号
							params:{title:title,
								url:url,
								id:id
									    			
							 },
							method : 'POST',
							timeout : 2000,
							success : function(form, action) {
									Ext.example.msg('<font color="#0000ff">温馨提示</font>','修改成功！');
									newsgrid.store.reload();
							}
						});
				
			}

		
		},{
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
		title:"修改首页新闻",
		items:[fformnew],
		buttonAlign:"center",
		
		});
	win.show();
}
//--------------------------------
function addnew()
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
	    	fieldLabel : "新闻标题",
	    	emptyText: '请输入标题',
	    	id : "titlenew1",
	    	allowBlank : false,
                        width :350,
	    	blankText:"标题不能为空！"
            },
	  {
	    	xtype : "textfield",
	    	fieldLabel : "跳转链接",
	    	emptyText: '请输入跳转链接',
	    	id : "urlnew1",
	    	allowBlank : false,
                       width :350,
	    	blankText:"跳转链接不能为空！"
            }
	  
    
         ],
            	buttons :
		[{
			//上传提交按钮
			text:"确定",
			
			handler:function()
			{

				var url=Ext.getCmp('urlnew1').getValue();
				var  title=Ext.getCmp('titlenew1').getValue();
				if(!url||!title)
				{
					Ext.Msg.alert('系统提示',"请填写完整信息");
					return  false;
				}
				var temp=url.substr(0, 4); 
				if(temp!="http")
				{
					Ext.Msg.alert('系统提示',"请填正确的链接");
					return false;
				}
				Ext.Ajax.request({

							url:'/think/index.php/Admin/News/add',//获取点击的序号
						             params:{
						             
						             	title:title,
						             	url:url
							            
							   },
							method : 'POST',
							timeout : 2000,
							success : function(form, action) {
											          Ext.example.msg('<font color="#0000ff">温馨提示</font>','添加成功！');
											          newsgrid.store.reload();
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
		title:"增加新闻",
		items:[fform],
		buttonAlign:"center",
		
		});
	win.show();
}



//---------js'跨页调用，只要在同一html引入，定义时不要加var。不要var mangrid=
          newsgrid=Ext.create("Ext.grid.Panel",{
			
			title:'首页新闻',
			frame:true,
			forceFit:true,//自动填充空白
			scroll:'both',
			
            alias:'widget.news',
            id:'newsgrid',
			columns: [//配置表格列
			
			     //序号
			     Ext.create("Ext.grid.RowNumberer",{
			            flex : 1,
			    	text:'序号'
			    	
			    }),
			  
                {header: "新闻标题", flex : 3, dataIndex: 'title', sortable: true},

                 {header: "发布时间", flex : 3, dataIndex: 'time', sortable: true
		
                     },
               
                  {header: "跳转链接", dataIndex: 'href', sortable: true,  flex : 3 },
                  {
					header : '相关操作',
					xtype : 'actioncolumn',
					flex : 3,
					sortable : true,
					menuDisabled : true,
					items : [{
						icon : '/think/Public/Admin/images/edit.png',
						tooltip : '修改新闻',
						handler : function(grid, rowIndex, colIndex) {
						            var rec = grid.getStore().getAt(rowIndex);
							var fuckid = rec.get('id');
							var title=rec.get('title');
							var url=rec.get('href');
							 EditNew(fuckid,title,url);
						}
					}, {
						icon : '/think/Public/Admin/images/no.png',

						tooltip : '删除',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var id = rec.get('id');
							Ext.MessageBox.show({
									title : "提示",
									msg : "是否删除该新闻?",
									buttons : Ext.Msg.OKCANCEL,
									icon : Ext.MessageBox.QUESTION,
									fn : function(buttonId) {
										if (buttonId == "ok") {
											Ext.Ajax.request({

												url:'/think/index.php/Admin/News/deletenew',//获取点击的序号
									    			params:{id:id
									    			
									    			             },
												method : 'POST',
												timeout : 2000,
												success : function(form, action) {
													Ext.example.msg('<font color="#0000ff">温馨提示</font>','删除成功！');
													newsgrid.store.reload();
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
			    fields: ['id','title','time','href'],//定义字段
			    
			    sorters:[{property:"id",direction:"DESC"}],//按id倒序
			    
			    viewConfig: {
                                 forceFit : true,//按照 width比例分配宽度

                                 stripeRows: true//在表格中显示斑马线
                             },
                  
                proxy:{  
                           type: 'ajax',  
                           url:'/think/index.php/Admin/Main/newshow.html', //请求的数据的url  
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
			
            
		tbar:[
		 {xtype:'button',text:'增加新闻',
		   icon : '/think/Public/Admin/images/add.png',
		    handler:function(buttonObj){
		    	
		    	addnew();
		    	
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



