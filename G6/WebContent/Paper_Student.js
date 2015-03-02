Ext.Loader.setConfig({enabled: true}); 
Ext.Loader.setPath('Ext.ux', 'ExtJs/examples/ux');
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
            { name: 'STU_ID', type: 'int' },
            { name: 'STU_NAME', type: 'string' },
            { name: 'TIME', type: 'string', mapping:'TIME' },
            { name: 'ANS_FILE', type:'string' },
            { name: 'STU_TIME', type: 'string' },
            { name: 'STU_ANS_FILE', type: 'string' },
            { name: 'SCORE', type: 'string' },
            { name: 'STU_SCORE', type: 'string' }
        ]
    }); 
    
    var store = Ext.create('Ext.data.Store', {
        model: 'MyData',
        proxy: { 
            type: 'ajax', 
            url: 'getQuestions.action',
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

    var sm = Ext.create('Ext.selection.CheckboxModel');

    uploadStudent = Ext.create('Ext.grid.Panel',{
        store: store,
        //selModel: sm,
        columns: [
            { header: "考试编号" , dataIndex: 'ID' , width:65 , sortable: true, menuDisabled:true },
            { header: "考试标题" , dataIndex: 'TITLE' , flex:1 , sortable: true, menuDisabled:true },
            { header: '考试开始时间' , dataIndex: 'TIME',  width:180 , sortable: true, menuDisabled:true },
            //{ header: '考试总分' , dataIndex: 'SCORE',  flex:1 , sortable: true, menuDisabled:true },
            { header: '考试得分' , dataIndex: 'STU_SCORE',  flex:1 , sortable: true, menuDisabled:true },
            { header: "作答时间" , dataIndex: 'STU_TIME' , width:180 , sortable: true, menuDisabled:true },
	        { 
	        	header: '相关操作' , xtype: 'actioncolumn' ,  width:60 , sortable: true, menuDisabled:true ,
	        	items: [{
	        		icon: 'images/word.png',
	        		tooltip:'开始作答',  
	        		handler: function(grid, rowIndex, colIndex) {
	        			var rec = store.getAt(rowIndex);
	        			if(rec.get('STU_SCORE')!=""){
	        				Ext.example.msg('<font color="#ff9900">警告</font>',"不能重复作答！");
	        				return ;
	        			}
	        			else if(rec.get('ANS_FILE')==""){
	        				Ext.example.msg('<font color="#ff9900">警告</font>',"考试尚未开始！");
	        				return ;
	        			}
	        			upload(rec.get('ID'),rec.get('TITLE'),rec.get('CONTENT'),rec.get('SCORE'));
	        		}
	        	},
	        	{
	        		icon: 'images/view.gif',
	        		tooltip:'查看结果', 
	        		handler: function(grid, rowIndex, colIndex) {
	        		
			        	 var rec = store.getAt(rowIndex);
			        	 var arr = rec.get('STU_ANS_FILE').split('.');
			        	 if(!rec.get('STU_ANS_FILE')){
			        		 Ext.example.msg('<font color="#ff9900">警告</font>','没有作答，无法查看结果！');
			        		 return ;
			        	 }
			        	 if(arr[arr.length-1] =='docx'||arr[arr.length-1] == 'xlsx' ||arr[arr.length-1] == 'pptx'){
				        	 Ext.Ajax.request({
				        	 url:'setPREFIX.action',
				        	 params:{
					        	 PAPER:rec.get('ID'),
					        	 USERID:rec.get('STU_ID'),
					        	 PREFIX:'-1'
				        	 },
				        	 method:'POST',
				        	 success:function(response,opts){
			        		 
				        	 var win=new Ext.Window({
	    	    					modal:true,
	    	    					frame:false,
	    	    					maximized : true,
	    	    					draggable:true,
	    	    					layout:'fit',
	    	    					title: '<center><font size="3" color="#0000cc"> 考生得分:'+rec.get('STU_SCORE')+'</font></center>',
	    	    					items:[{
	    	    						html:'<iframe frameborder="0" width="100%" height="100%" src="Word_Compare.jsp" </iframe>'
	    	    					}]
	    	    				});
	    	    				win.show();
	    	    				
			        	 	}
				         });
			        	 }
			        	 else if(arr[arr.length-1] === 'pptx'){
				        	 Ext.Ajax.request({
					        	 url:'setPrefix.action',
					        	 params:{
						        	 PAPER:rec.get('ID'),
						        	 USERID:rec.get('STU_ID'),
						        	 PREFIX:'-1'
					        	 },
					        	 method:'POST',
					        	 success:function(response,opts){
				        		 
					        	 var win=new Ext.Window({
		    	    					modal:true,
		    	    					frame:false,
		    	    					maximized : true,
		    	    					draggable:true,
		    	    					layout:'fit',
		    	    					title: '<center><font size="3" color="#0000cc"> 考生得分:'+rec.get('STU_SCORE')+'</font></center>',
		    	    					items:[{
		    	    						html:'<iframe frameborder="0" width="100%" height="100%" src="Stu_Check.jsp" </iframe>'
		    	    					}]
		    	    				});
		    	    				win.show();
		    	    				
				        	 	}
					         });
				        	 }
				        	 else{
				        		 Ext.example.msg('<font color="#ff9900">警告</font>','请上传正确文件！');
				        		 }
				        	 
			        
			        	
			        	
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
            items: ['-',{ 
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

function upload(ID,TITLE,CONTENT,SCORE)
{
	var editform = Ext.create('Ext.form.Panel',{
	baseCls:"x-plain",
	width: 600,
    height: 450,
    bodyPadding: '20 0 20 20',
    waitMsgTarget: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 30,
        msgTarget: 'qtip'
    },
    items : [
        {
        	xtype: 'fieldcontainer',
        	layout: 'hbox',
        	frame:true,
	        fieldDefaults: {
	            labelAlign: 'right',
	            labelWidth: 30
	        },
        	items:
        	[{
        		width : 100,
        		xtype : "displayfield",
		    	fieldLabel : "标题",
		    	value: TITLE
        	},{
        		//flex: 5,
        		width : 450,
	        	xtype: 'filefield',
	        	fieldLabel: '答案',
	        	anchor : '90%',
		       	msgTarget: 'qtip',
		       	name: 'file',
			    buttonText: '浏览',
			    validator: function(value){
					var arr = value.split('.');
					if(arr[arr.length-1] > 0){
						return '文件不合法,只能上传docx文件！！！';				
					}
					else{
						return true;
					}
	 			},
	 			emptyText:'请选择文件'
	        }]
        },{
            xtype: 'hiddenfield',//隐藏提交
	        name: 'ID',
	        value: ID
	    },{
	        xtype: 'hiddenfield',//隐藏提交
		    name: 'SCORE',
		    value: SCORE
	    },{
	    	xtype : "htmleditor",
	    	height : 380,
	    	width : 550,
	    	fieldLabel : "内容",
	    	value: CONTENT,
	    	readOnly : true/*,
		    enableAlignments :false,  
	        enableColors: false,  
	        enableFont : false,  
	        enableFontSize: false,  
	        enableFormat: false,  
	        enableLinks: false,  
	        enableLists : false,  
	        enableSourceEdit: false,
	    	allowBlank : false
	    	*/
        }]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"上传答案",
		items:[editform],
		buttonAlign:"center",
		buttons:[{
			    text : "上传",
			    handler:function(){
			    	editform.getForm().submit({
					waitMsg:'正在提交......',
					url : "stuUpload.action",    
					success : function(editform,action) {
						uploadStudent.store.load();
						win.close();
						Ext.example.msg('<font color="#0000ff">温馨提示</font>',"上传成功！");
	                },failure : function(fform,action){
	                	Ext.example.msg('<font color="#ff0000">错误</font>',"请选择文件！");
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
