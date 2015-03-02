Ext.Loader.setConfig({enabled: true}); 
Ext.require([ 
    'Ext.grid.*', 
    'Ext.data.*', 
    'Ext.form.*', 
    'Ext.tip.*',
    'Ext.window.MessageBox',
    'Ext.selection.CheckboxModel'
]);

Ext.onReady(function(){ 
	
	Ext.QuickTips.init();
	Ext.Msg.msgButtons[0].setText("确定");//OK  
    Ext.Msg.msgButtons[1].setText("是");//YES  
    Ext.Msg.msgButtons[2].setText("否");//NO  
    Ext.Msg.msgButtons[3].setText("取消");//CANCEL 

    Ext.define('MyData',{ 
        extend: 'Ext.data.Model', 
        fields: [ 
            { name: 'ID', type: 'int' },
            { name: 'TITLE', type: 'string' },
            { name: 'CONTENT', type: 'string' },
            { name: 'ANS_SHEET', type:'string' },
            { name: 'ANS_FILE', type: 'string' },
            { name: 'SCORE', type: 'string' },
            { name: 'TIME', type: 'string', mapping:'TIME' }
        ]
    }); 
    
    store = Ext.create('Ext.data.Store', {
        model: 'MyData',
        proxy: { 
            type: 'ajax', 
            url: 'getPapers.action',
            reader: {
                type: 'json', 
                root: 'papers', 
                totalProperty: 'length'
            }
        },
        autoLoad: true,
        sorters: [{
            property : 'ID',
            direction: 'DESC'
        }]
    }); 

    //----
    function CreatWin(){
	    var newwin=new Ext.Window({
	    	title: '<center><font size="3" color="#0000cc">勾选、设分页面</font></center>',
			modal:true,
			layout:'fit',
			frame : false,
			maximized : true,
			draggable:true,
			items:[{  
			 	html:'<iframe frameborder="0" width="100%" height="100%" src="Word_Page.jsp" </iframe>'
			}]
		})
	    newwin.show();
	    newwin.fitContainer(); //满屏
	    newwin.center();//居中
    }
//----------------
    
//-----------------------
    
     function CreatExcelWin(){
	    var newwin=new Ext.Window({
	    	title: '<center><font size="3" color="#0000cc">勾选、设分页面</font></center>',
			modal:true,
			layout:'fit',
			frame : false,
			maximized : true,
			draggable:true,
			items:[{  
			 	html:'<iframe frameborder="0" width="100%" height="100%" src="Excel_Page.jsp" </iframe>'
			}]
		})
	    newwin.show();
	    newwin.fitContainer(); //满屏
	    newwin.center();//居中
    }
    //PPT页面------------------------------

    function CreatPPTWin(){
    	var newwin=new Ext.Window({
            modal:true,
          layout:'fit',
         frame : false,
        closeAction:'close',
           draggable:true,
       items:[
          {  
 	         html : '<iframe frameborder="0" width="100%" height="100%" src="Word_Page.jsp"</iframe>'} 
 	
            ],
           buttonAlign:"center"
          })
	    newwin.show();
	    newwin.fitContainer(); //满屏
	    newwin.center();//居中
    }
    
    
    


    var sm = Ext.create('Ext.selection.CheckboxModel');

    uploadTeacher = Ext.create('Ext.grid.Panel',{
        store: store,
        selModel: sm,
        columns: [
            { header: "考试编号" , dataIndex: 'ID' , width:65 , sortable: true, menuDisabled:true },
            { header: "考试标题" , dataIndex: 'TITLE' , flex:1 , sortable: true, menuDisabled:true },
            //{ header: "考试答卷" , dataIndex: 'ANS_SHEET' , flex:1 , sortable: true, menuDisabled:true },
            { header: "考试答案" , dataIndex: 'ANS_FILE' , flex:1 , sortable: true, menuDisabled:true },
            //{ header: "考试总分" , dataIndex: 'SCORE' , flex:1 , sortable: true, menuDisabled:true },
            { header: '考试开始时间' , dataIndex: 'TIME',  width:180 , sortable: true, menuDisabled:true },
	        { 
	        	header: '相关操作' , xtype: 'actioncolumn' ,  width:60 , sortable: true, menuDisabled:true ,
	        	items: [{
	  	        	icon: 'images/search_form.png',
		        	tooltip:'查看、编辑问卷',  
		        	handler: function(grid, rowIndex, colIndex) {
		        		var rec = store.getAt(rowIndex);
		        		EditPaper(rec.get('ID'),rec.get('TITLE'),rec.get('SCORE'),rec.get('CONTENT'));
		        	}
		    	},{
	        		icon: 'images/upload.png',
	        		tooltip:'上传答案', 
	        		handler: function(grid, rowIndex, colIndex) {
	        			var rec = store.getAt(rowIndex);
	        			if(rec.get('ANS_FILE')!=""){
	        				Ext.example.msg('<font color="#ff9900">警告</font>',"不能重复上传答案！");
	        				return ;
	        			}
	        			Creatupload(rec.get('ID'));
	        		}
	        	},{
	        		icon: 'images/view.gif',
	        		tooltip:'查看、勾选标准答案',  
	        		
	        		handler: function(grid, rowIndex, colIndex) 
	        		{

        	
		        	 var rec = store.getAt(rowIndex);
		        	 var arr = rec.get('ANS_FILE').split('.');
		        	 if(!rec.get('ANS_FILE')){
		        	 	Ext.example.msg('<font color="#ff9900">警告</font>','没有数据，请先上传答案！');
		        	 	return ;
		        	 }
		        	if(arr[arr.length-1] =='docx')
		        	{
		                   Ext.Ajax.request({
						   url:'setPREFIX.action',
						   params:{
							         PAPER:rec.get('ID'),
							         USERID:0,
							         PREFIX:'-1'
						           },
						        	 method:'POST',
						        	 success:function(response,opts){
						        	 	CreatWin(rec.get('ID'),0);//PAPER USERID
						        	 }
					        	 });
				     }
		        	 if(arr[arr.length-1] =='pptx'){
		                   Ext.Ajax.request({
							   url:'setPREFIX.action',
							   params:{
								         PAPER:rec.get('ID'),
								         USERID:0,
								         PREFIX:'-1'
							           },
							        	 method:'POST',
							        	 success:function(response,opts){
							        	 	CreatPPTWin(rec.get('ID'),0);//PAPER USERID
							        	 }
						        	 });
					     }
		        	 if(arr[arr.length-1] =='xlsx')
		        	 {
		        		 Ext.Ajax.request({
		                             url:'setExcelPREFIX.action',//获取点击的序号
		                             params:{
			        			              PAPER:rec.get('ID'),
								              USERID:0,
								              PREFIX:'-1'
					
		        		                    },
		                             method:'POST',
		                             timeout:2000,
		                             success:function(response,opts){
		                            	 CreatExcelWin(rec.get('ID'),0);
		
		                             }
		                         })
		        	 }
		        	
		        	
        	}
	        		/*handler: function(grid, rowIndex, colIndex) {
	        		
		        		var rec = store.getAt(rowIndex);
		        		if(!rec.get('ANS_FILE')){
		        			Ext.example.msg('<font color="#ff9900">警告</font>','没有数据，请先上传答案！');
		        			return ;
		        		}
		        		else{
		        			Ext.Ajax.request({
		        				url:'setPREFIX.action',
		        				params:{
		        					PAPER:rec.get('ID'),
		        					USERID:0,
		        					PREFIX:'-1'
		        				},
		        				method:'POST',
		        				success:function(response,opts){
		        					CreatWin(rec.get('ID'),0);//PAPER USERID
		        				}
		        			});
		        		}
		        		
		        	}*/
	        	}]
	        }
        ],
        viewConfig: { 
            stripeRows: true,
            disableSelection: false,
            frame: true 
        },
	    dockedItems: [{
            dock: 'top', 
            xtype: 'toolbar', 
            items: ['-',
                {
			        itemId: 'ButtonAdd', 
			        text:'新建考试',
			        tooltip:'新建一次考试',  
			        iconCls:'icon-add',
			        handler:function(){
			        	CreatNew(store);
            		}
		    	},{
				    itemId: 'ButtonDel', 
				    text:'删除试卷', 
				    tooltip:'取消选中勾选',  
				    iconCls:'icon-no', 
				    handler:function(){
				    	var n = uploadTeacher.getSelectionModel().getSelection();
			        	if(n.length>0)
			        	{
			        		Ext.MessageBox.show({
			                    title:"提示",
			                    msg:"是否删除"+n.length+"份试题?",
			                	buttons:Ext.Msg.OKCANCEL,
			                	icon:Ext.MessageBox.QUESTION,
			                	fn:function(buttonId){
		                			if(buttonId=="ok") {
			                	        for (var i = 0; i < n.length; i++) {
			                	        	Ext.Ajax.request({
			                	        		url : "delPaper.action",
			                	        		params : {ID: n[i].get("ID")},
			                	        		success : function() {
			                	        			//
			                	        		},
			                	        		failure : function() {
			                	        			Ext.example.msg('<font color="#0000ff">错误</font>','出错了！');
			                	        		}
								        	});
								        }
			                	        store.remove(n);
			                	        Ext.example.msg('<font color="#0000ff">温馨提示</font>','删除成功！');
		                			};
		                		}
			        		});
			        	}   
			        	else {
			        		Ext.example.msg('<font color="#ff9900">警告</font>','请选择删除试卷！');
			        	}
            		}
		    	},'-',{ 
			        itemId: 'ButtonReset', 
			        text:'刷新', 
			        tooltip:'刷新页面',  
			        iconCls:'icon-refresh', 
			        handler:function(){
						store.load();
		    		}
		    	}
		    ]
		}]
    });
});

function CreatNew(store)
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
	    	fieldLabel : "*标题",
	    	emptyText: '请输入问卷的名字',
	    	name : "TITLE",
	    	allowBlank : false,
	    	blankText:"问卷名字不能为空！"
        },/*{	
	    	xtype : "numberfield",
	    	fieldLabel : "*总分",
	    	emptyText: '请输入试卷的总分',
	    	name : "SCORE",
	    	allowBlank : false,
	    	blankText:"总分不能为空！"
	    },*/{
	    	xtype : "htmleditor",
	        height : 380,
	    	width : 550,
	    	//anchor : '90%',
	    	fieldLabel : "内容",
	    	emptyText: '请输入问卷内容。。。',
	    	name : "CONTENT"
        }]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"新建考试",
		items:[fform],
		buttonAlign:"center",
		buttons:[{
			    text : "提交",
			    handler:function(){
					fform.getForm().submit({
					waitMsg:'正在提交......',
					url : "addPaper.action",    
					success : function(fform,action) {
						store.load();
						win.close();
						Ext.example.msg('<font color="#0000ff">温馨提示</font>',"添加成功");
	                },failure : function(fform,action){
	                	Ext.example.msg('<font color="#ff0000">错误</font>',"请按要求输入相关信息！");
	                    }
			    	});
           		}
			},{
				text : "取消",
				handler:function(){
					win.close();
				}
			}]
		});
	win.show();
}

function EditPaper(id,title,score,content)
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
            xtype: 'hiddenfield',//隐藏提交
	        name: 'ID',
	        value: id
	    },{	
        	xtype : "textfield",
	    	fieldLabel : "*标题",
	    	emptyText: '请输入问卷的名字',
	    	name : "TITLE",
	    	allowBlank : false,
	    	value : title,
	    	blankText:"问卷名字不能为空！"
        }/*,{	
	    	xtype : "numberfield",
	    	fieldLabel : "*总分",
	    	emptyText: '请输入试卷的总分',
	    	name : "SCORE",
	    	allowBlank : false,
	    	value : score,
	    	blankText:"总分不能为空！"
	    }*/,{
	    	xtype : "htmleditor",
	    	height : 380,
    		width : 550,
	    	fieldLabel : "内容",
	    	emptyText: '请输入问卷内容。。。',
	    	name : "CONTENT",
	    	value : content
        }]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"修改考试信息",
		items:[fform],
		buttonAlign:"center",
		buttons:[{
			    text : "保存",
			    handler:function(){
					fform.getForm().submit({
					waitMsg:'正在提交......',
					url : "editPaper.action",    
					success : function(fform,action) {
						store.load();
						win.close();
						Ext.example.msg('<font color="#0000ff">温馨提示</font>',"保存成功");
	                },failure : function(fform,action){
	                	Ext.example.msg('<font color="#ff0000">错误</font>',"请按要求输入相关信息！");
	                    }
			    	});
           		}
			},{
				text : "取消",
				handler:function(){
					win.close();
				}
			}]
		});
	win.show();
}

function Creatupload(paper){
	var addfile = Ext.create('Ext.form.Panel', {
	        frame: true,
	    	baseCls:"x-plain",
	        width: 320,
	        height: 120,
	    	bodyPadding: '35 15 15 30',
	        waitMsgTarget: true,
	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 65
	        },
	        defaultType: 'textfield',
	        items: [
	        {
	        	xtype: 'displayfield',
	        	fieldLabel: '试卷编号',
	        	value: paper
	        },{
	            xtype: 'hiddenfield',//隐藏提交
	            name: 'ID',
	            value: paper
	        },{
	        	xtype: 'filefield',
	        	fieldLabel: '上传答案',
	        	anchor : '90%',
		       	msgTarget: 'qtip',//under,title,qtip,side
		       	allowBlank: true,
		       	name: 'file',
			    buttonText: '浏览',
			    validator: function(value){
					var arr = value.split('.');
					if(arr[arr.length-1] >0){
						return '文件不合法,只能上传docx文件！！！';				
					}
					else{
						return true;
					}
	 			},
	 			emptyText:'请选择文件'
	        }]
	    });
	    
	    var win2=new Ext.Window({
			modal:true,
			draggable:true,
			title:"文件上传",
			items:[addfile],
			buttonAlign:"center",
			buttons: [{
	            text: '确定',
	            handler: function(){
					addfile.getForm().submit({
		                url: 'upload.action',
		                waitMsg: '正在处理......',
		                success : function(addfile,action) {
		                	Ext.example.msg('<font color="#0000ff">温馨提示</font>',"上传成功！");
		                	store.load();
		    	            win2.close();
		            	},
		        		failure : function(addfile,action) {
		            		Ext.example.msg('<font color="#ff0000">错误</font>',"请选择正确的文件！");	
		            	}
		            });
	            }
	        },{
	    	   	text : "取消",
	    	   	handler:function(){
	        		win2.close();
	        	}
	        }]
	    });
	win2.show();
}	