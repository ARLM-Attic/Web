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

    Ext.define('Exams',{ 
        extend: 'Ext.data.Model', 
        fields: [ 
            { name: 'ID', type: 'int' },
            { name: 'TITLE', type: 'string' }
            //{ name: 'SCORE', type: 'string' },
            //{ name: 'TIME', type: 'string', mapping:'TIME' }
        ]
    }); 
    
    Ext.define('Exam',{ 
        extend: 'Ext.data.Model', 
        fields: [ 
            { name: 'ID', type: 'int' },
            { name: 'TITLE', type: 'string' },
		    { name: 'QUESTION', type: 'string' }
        ]
    }); 
    
    examlist = Ext.create('Ext.data.Store', {
        model: 'Exams',
        proxy: { 
            type: 'ajax', 
            url: 'getExams.action',
            reader: {
                type: 'json', 
                root: 'exams', 
                totalProperty: 'length'
            }
        },
        autoLoad: true,
        sorters: [{
            property : 'ID',
            direction: 'DESC'
        }]
    }); 
    
    examview = Ext.create('Ext.data.Store', {
        model: 'Exam',
        proxy: { 
            type: 'ajax', 
            url: 'getExam.action',
            reader: {
                type: 'json', 
                root: 'exam', 
                totalProperty: 'length'
            }
        },
        autoLoad: true,
        sorters: [{
            property : 'ID',
            //direction: 'DESC'
        }]
    });
    
    viewgrid = Ext.create('Ext.grid.Panel', {
		id: 'viewgrid',
		region: 'center',
		flex: 1,
	    //title: '试卷预览',
	    frame: true,
	    //border: false,
	    //forceFit: true,
	    scroll:'both',
	    store: examview,
	    columns: [
	        { xtype: 'rownumberer' },
	        { text: '题型', flex: 20, dataIndex: 'TITLE'},
	        { text: '题目', flex: 80, dataIndex: 'QUESTION'}
	    ]
	});

    //----
    function CreatWin(){
	    var newwin=new Ext.Window({
	    	title: '<center><font size="3" color="#0000cc">设置试卷</font></center>',
			modal:true,
			layout:'fit',
			frame : false,
			maximized : true,
			draggable:true,
			items:[{  
			 	html:'<iframe frameborder="0" width="100%" height="100%" src="Exam_Page.jsp" </iframe>'
			}]
		})
	    newwin.show();
	    newwin.fitContainer(); //满屏
	    newwin.center();//居中
    }

    function ShowExamWin(id){
	    var newwin=new Ext.Window({
	    	title: '<center><font size="3" color="#0000cc">查看试卷</font></center>',
			modal:true,
			layout:'fit',
			frame : false,
			maximized : true,
			draggable:true,
			//items:[viewgrid]
			items:[{  
			 	html:'<iframe frameborder="0" width="100%" height="100%" src="Exam_View.jsp" </iframe>'
			}]
		})
	    newwin.show();
	    newwin.fitContainer(); //满屏
	    newwin.center();//居中
    }
//----------------
    
    
    var sm = Ext.create('Ext.selection.CheckboxModel');

    ExamList = Ext.create('Ext.grid.Panel',{
        store: examlist,
        selModel: sm,
        columns: [
            { header: "试卷编号" , dataIndex: 'ID' , width:65 , sortable: true, menuDisabled:true },
            { header: "试卷标题" , dataIndex: 'TITLE' , flex:1 , sortable: true, menuDisabled:true },
            //{ header: "考试总分" , dataIndex: 'SCORE' , flex:1 , sortable: true, menuDisabled:true },
            //{ header: '上传时间' , dataIndex: 'TIME',  width:180 , sortable: true, menuDisabled:true },
	        { 
	        	header: '相关操作' , xtype: 'actioncolumn' ,  width:60 , sortable: true, menuDisabled:true ,
	        	items: [{
	  	        	icon: 'images/edit.png',
		        	tooltip:'修改试卷信息',  
		        	handler: function(grid, rowIndex, colIndex) {
		        		var rec = examlist.getAt(rowIndex);
		        		EditExam(rec.get('ID'),rec.get('TITLE')/*,rec.get('SCORE')*/);
		        	}
	        	},{/*
	        		icon: 'images/result.png',
	        		tooltip:'设置试题',
	        		handler: function(grid, rowIndex, colIndex) {
	        			var rec = examlist.getAt(rowIndex);
	        			Ext.Ajax.request({
	        				url:'getExamId.action',
	        				params:{
	        					EXAMID:rec.get('ID')
	        				},
	        				method:'POST',
	        				success:function(response,opts){
	        					CreatWin(rec.get('ID'),0);
	        				}
	        			});
	        		}
	        	},{*/
	        		icon: 'images/view.gif',
	        		tooltip:'查看试卷',
	        		handler: function(grid, rowIndex, colIndex) {
	        			var rec = examlist.getAt(rowIndex);
	        			Ext.Ajax.request({
	        				url:'getExamId.action',
	        				params:{
	        					EXAMID:rec.get('ID')
	        				},
	        				method:'POST',
	        				success:function(response,opts){
	        					ShowExamWin(rec.get('ID'));
	        				}
	        			});
	        		}
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
            items: ['-','-',
                {
			        itemId: 'ButtonAdd', 
			        text:'新建试卷',
			        tooltip:'新建一份试卷',  
			        iconCls:'icon-add',
			        handler:function(){
			        	CreatNewExam(examlist);
            		}
		    	},{
				    itemId: 'ButtonDel', 
				    text:'删除试卷', 
				    tooltip:'取消选中勾选',  
				    iconCls:'icon-no', 
				    handler:function(){
				    	var n = ExamList.getSelectionModel().getSelection();
			        	if(n.length>0)
			        	{
			        		Ext.MessageBox.show({
			                    title:"提示",
			                    msg:"已选中"+n.length+"份试卷。确认删除？",
			                	buttons:Ext.Msg.OKCANCEL,
			                	icon:Ext.MessageBox.QUESTION,
			                	fn:function(buttonId){
		                			if(buttonId=="ok") {
			                	        for (var i = 0; i < n.length; i++) {
			                	        	Ext.Ajax.request({
			                	        		url : "delExam.action",
			                	        		params : {ID: n[i].get("ID")},
			                	        		success : function() {
			                	        			//
			                	        		},
			                	        		failure : function() {
			                	        			Ext.example.msg('<font color="#0000ff">错误</font>','出错了！');
			                	        		}
								        	});
								        }
			                	        examlist.remove(n);
			                	        Ext.example.msg('<font color="#0000ff">温馨提示</font>','删除成功！');
		                			};
		                		}
			        		});
			        	}   
			        	else {
			        		Ext.example.msg('<font color="#ff9900">警告</font>','请选择删除试卷！');
			        	}
            		}
		    	},'-','-',{ 
			        itemId: 'ButtonReset', 
			        text:'刷新', 
			        tooltip:'刷新页面',  
			        iconCls:'icon-refresh', 
			        handler:function(){
						examlist.load();
		    		}
		    	}
		    ]
		}]
    });
});

function CreatNewExam(examlist)
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
	    	emptyText: '请输入试卷的标题',
	    	name : "TITLE",
	    	allowBlank : false,
	    	blankText:"试卷标题不能为空！"
        },/*{	
	    	xtype : "numberfield",
	    	fieldLabel : "*总分",
	    	emptyText: '请输入试卷的总分',
	    	name : "SCORE",
	    	allowBlank : false,
	    	blankText:"总分不能为空！"
	    },{
	    	xtype : "htmleditor",
	        height : 380,
	    	width : 550,
	    	//anchor : '90%',
	    	fieldLabel : "内容",
	    	emptyText: '请输入试题内容。。。',
	    	name : "CONTENT"
        }*/]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"新建试卷",
		items:[fform],
		buttonAlign:"center",
		buttons:[{
			    text : "提交",
			    handler:function(){
					fform.getForm().submit({
					waitMsg:'正在提交......',
					url : "addExam.action",    
					success : function(fform,action) {
						examlist.load();
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

function EditExam(id,title)
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
	    	emptyText: '请输入试卷的标题',
	    	name : "TITLE",
	    	allowBlank : false,
	    	value : title,
	    	blankText:"试卷标题不能为空！"
        }/*,{	
	    	xtype : "numberfield",
	    	fieldLabel : "*总分",
	    	emptyText: '请输入试卷的总分',
	    	name : "SCORE",
	    	allowBlank : false,
	    	value : score,
	    	blankText:"总分不能为空！"
	    },{
	    	xtype : "htmleditor",
	    	height : 380,
    		width : 550,
	    	fieldLabel : "内容",
	    	emptyText: '请输入问卷内容。。。',
	    	name : "CONTENT",
	    	value : content
        }*/]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"修改试卷信息",
		items:[fform],
		buttonAlign:"center",
		buttons:[{
			    text : "保存",
			    handler:function(){
					fform.getForm().submit({
					waitMsg:'正在提交......',
					url : "editExam.action",    
					success : function(fform,action) {
						examlist.load();
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