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

    Ext.define('MyData', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'examname',
							type : 'string'
						}, {
							name : 'stuName',
							type : 'string'
						}, {
							name : 'score',
							type : 'string'
						}, {
							name : 'stuId',
							type : 'string'
						}, {
							name : 'teachername',
							type : 'string'
						}, {
							name : 'paperid',
							type : 'string'
						}

            
            ]
    }); 
    
    var pageSize = 17;//每页的数据
    //考生试卷的数据源
    student_store = Ext.create('Ext.data.Store', {
    	pageSize: pageSize,
        model: 'MyData',
        proxy: { 
            type: 'ajax', 
            url: 'get_student_socre.action',
            reader: {
                type: 'json', 
                root: 'stu_Scores', 
                totalProperty: 'length'
            }
        },
       	autoLoad:{params:{start:0,limit:pageSize}},//自动加载
        sorters: [{
            property : 'id',
            direction: 'desc'
        }]
    }); 
     student_store.on('beforeload', function (store, options) {  
      	var studentScoreSearch = Ext.getCmp('studentScoreSearch').getValue();
      	var studentScoreTerm  = Ext.getCmp('studentScoreTerm').getValue();
      	if(studentScoreSearch.indexOf("'")!=-1)
      	{
			studentScoreSearch = studentScoreSearch.replace('\'', "");
			Ext.Msg.show({
     						title:'温馨提示',
     						msg: "不支持字符 ' 的搜索",
     						icon: Ext.Msg.WARNING
						});
      	}
     	var new_params = {term:encodeURIComponent(studentScoreTerm),search:encodeURIComponent(studentScoreSearch)};  
       	Ext.apply(store.proxy.extraParams, new_params);
      	
    });  
    // 分页
    
     var qBar_paper=new Ext.PagingToolbar({  			 //设置分页的工具栏 
        store:student_store,
		displayInfo : true, // 是否显示总体信息
		displayMsg : "第 {0}页 -  共 {2}条",
		emptyMsg : "没有符合条件的记录"
    });

    //考生试卷的页面
    student_Score = Ext.create('Ext.grid.Panel',{
    	bbar:qBar_paper,
        store: student_store,
        columns: [
        	new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
            { header: "考试名称" , dataIndex: 'examname' , flex:1 , sortable: true, menuDisabled:true },
            { header:'出卷老师', dataIndex: 'teachername' , flex:1 , sortable: true, menuDisabled:true },
            {
					header : "学生名字",
					dataIndex : 'stuName',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '学号',
					dataIndex : 'stuId',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '学生得分',
					dataIndex : 'score',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '相关操作',
					xtype : 'actioncolumn',
					flex : 1,
					sortable : true,
					menuDisabled : true,
					items : [{
								icon : 'images/search_form.png',
								tooltip : '查看作答情况',
								handler : function(grid, rowIndex, colIndex) {
									var rec = student_store.getAt(rowIndex);
									var paperid = rec.get('paperid') ;// 试卷的id
									var studentid = rec.get('stuId'); // 考生的id
									var isanswer = rec.get('score');
									if (isanswer == '未作答') {
										Ext.MessageBox.show({
											title : '温馨提示',
											msg : "该学生没有作答!",
											buttons : Ext.Msg.OK
										})	
									}	
									else
									{
										see_student_without_Submit(paperid,studentid,isanswer,student_store);
									}
								}
							}]
				}],
		viewConfig : { 
            stripeRows: true,
            disableSelection: false,
            frame: true 
        },
         dockedItems: [{
            dock: 'top', 
            xtype: 'toolbar', 
            items: ['-',
            	 {
					xtype : "combo",		
   		    		store : new Ext.data.SimpleStore({  
           			fields : [ 'text'],  
          			data : [['考试名称'],['出卷老师'],['学生名字'],['学号']]  
    					}),  
    				hiddenName:'studentScoreTerm',//提交到后台的input的name 
    				id : 'studentScoreTerm',
    				name:'studentScoreTerm',
    				mode:'local',//数据加载模式，'local'本地加载，'remote'远程加载
    				displayField : 'text',  //显示字段  
    				emptyText : '请选择查询条件',  //提示信息  
    				mode : 'local', //数据加载模式，local代表本地数据  
    				triggerAction : 'all',  // 显示所有下列数据，一定要设置属性triggerAction为a  
    				readOnly : false,   //只读，为true时不能编辑不能点击  
   					editable:false  //是否可编辑，为true时可以手写录入     					
				}
				,{			
					labelAlign: 'right',
        			labelWidth: 35,
        			xtype : "textfield",
	    			emptyText:'请输入查询值',
	    			name : "studentScoreSearch",
	    			id:"studentScoreSearch",   
   					listeners:{
            			change:{
            			fn:function()
            				{
            					var termTemp  = Ext.getCmp('studentScoreTerm').getValue();
            					if(termTemp=="学号")
            					{

            						var searchtemp = Ext.getCmp('studentScoreSearch').getValue();
            						if (searchtemp!=null && searchtemp!="")
   									{
        								if( !isNaN(searchtemp) ==false )
        								{
        									Ext.Msg.show({
     												title:'温馨提示',
     												msg: "请输入数字！",
     												icon: Ext.Msg.WARNING
												});
        								}
    								}
            					}    							
            				}
            			
            			}
   					}
        		}, {
						xtype : "button",
						text : "搜索",
						icon : "images/search.png",
						handler : function() {
							student_store.load();
						}

					}, '-' ]
         }]
    });
});



//没有上传按钮的
function Editquestion2(title,type,question)
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
    items : [
    	
   	 	{
	    	readOnly:true,
        	xtype : "textfield",
	    	fieldLabel : "标题",
	    	name : "title",
	    	id:"title1",
	    	allowBlank : true,
	    	blankText:"问卷名字不能为空！",
	    	value:title
        },
        {
	    	readOnly:true,
        	xtype : "textfield",
	    	fieldLabel : "类型",
	    	id : 'type1',
    		name:'type',
	    	allowBlank : true,
	    	blankText:"问卷名字不能为空！",
	    	value:type
        },
			{
			readOnly:true,
			value:question,
	    	labelStyle : "text-align:right;",//向右对齐
		    fieldLabel: '题干',
		    id:'question1',
            name:'question',
  			height:180,
  			width:550,
  	        preventScrollbar: true ,
       		frame: true,
       	 	layout: 'fit',
      	  	fieldLabel: '题干',
            xtype: 'htmleditor',
            enableColors: true,
            enableAlignments: true
        }]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"显示题目",
		
		items:[fform1],
		buttonAlign:"center",
		buttons:[{
			    text : "确定",
			    handler:function(){
					win.close();
           		}
			}]
		});
	win.show();
}

//考生考试 题目的 函数
//没有提交按钮
function see_student_without_Submit(paperid,studentid,isanswer,student_store)
{
	Ext.define('MyData',{ 
        extend: 'Ext.data.Model', 
        fields: [ 
            { name: 'id', type: 'string' },
            { name: 'paper', type: 'string' },//试卷的id
            { name:'questionid',type:'string'},
            { name: 'stuAnswer', type: 'string' },//学生答案的文件路径
            { name: 'stuId', type:'string' },//学生的id
            { name: 'stuScore', type: 'string' },//学生的得分
            { name: 'stuAnswerName', type: 'string' },//学生上传的文件名   
            { name: 'title', type: 'string' },//题目
            { name: 'question', type: 'string' },//问题
            { name: 'type', type: 'string' },//考试类型
            {name : 'condition',type:'string'},//学生作答的状态
            {name :'question_score',type:'string'}
            
        ]
    }); 
    
    var pageSize  = 16 ;  
    //考生考试题目的数据源
   var question_store = Ext.create('Ext.data.Store', {
   		pageSize : pageSize ,
        model: 'MyData',
        proxy: { 
            type: 'ajax', 
            url: 'teacher_get_Paper_student.action',
            reader: {
                type: 'json', 
                root: 'student_answer_list', 
                totalProperty: 'length'
            }
        },
        	
        autoLoad:{params:{start:0,limit:pageSize}},//自动加载
        sorters: [{
            property : 'id',
            direction: 'desc'
        }]
    }); 
 
    question_store.on('beforeload', function (store, options) {  
        var question_storeSearch = Ext.getCmp('question_storeSearch').getValue();
      	var question_storeTerm  = Ext.getCmp('question_storeTerm').getValue();
      	if(question_storeSearch.indexOf("'")!=-1)
      	{
			question_storeSearch = question_storeSearch.replace('\'', "");
      	}
        var new_params = { term:encodeURIComponent(question_storeTerm),search:encodeURIComponent(question_storeSearch),paperid:paperid,studentid:studentid};  //先提交一个试卷的id
        Ext.apply(store.proxy.extraParams,new_params);  
     
    });  
    

    var qBar_question=new Ext.PagingToolbar({  			 //设置分页的工具栏 
        store:question_store,
		displayInfo : true, // 是否显示总体信息
		displayMsg : "第 {0}页 -  共 {2}条",
		emptyMsg : "没有符合条件的记录"
    });
	

  var  showquestion = Ext.create('Ext.grid.Panel',{
		region: 'center',
		split: true,
		
        store: question_store,
        bbar:qBar_question,
        columns: [
  		
            { header: "题目标题" , dataIndex: 'title' , flex:1 , sortable: true, menuDisabled:true },
            { header: "题目类型" , dataIndex: 'type' , flex:1 , sortable: true, menuDisabled:true },
        	{ header: '得分' , dataIndex: 'stuScore',  flex:3  , sortable: true, menuDisabled:true },
            {header: '作答情况' , dataIndex: 'condition',  flex:1  , sortable: true, menuDisabled:true},
            
	        { 
	        	header: '相关操作' , xtype: 'actioncolumn' , flex:1 , sortable: true, menuDisabled:true ,
	        	items: [{
	  	        	icon: 'images/search_form.png',
		        	tooltip:'查看题目',  
		        	handler: function(grid, rowIndex, colIndex) {
		        			var rec=grid.getStore().getAt(rowIndex);
     						
		        			if(isanswer=="未作答")
		        				{
		        					var f = rec.get('stuAnswerName');
		        					if(f==null||f==""){f="请上传答案"}
		        					Editquestion(rec.get('id'),rec.get('title'),rec.get('type'),rec.get('question'),question_store,rec.get('questionid'),f);
		        				}
		        				else
		        				{
									
		        					Editquestion2(rec.get('title'),rec.get('type'),rec.get('question'));
		        						        				
		        				}
		        	}
		        },
		        {
	  	        	icon: 'images/search.png',
		        	tooltip:'查看错误',  
		        	handler: function(grid, rowIndex, colIndex) {

		        		var rec=grid.getStore().getAt(rowIndex);
		        		 if(rec.get('condition')!="已上传")
		        		{
		        			Ext.Msg.show({
     								title:'温馨提示',
     								msg: '该学生没有上传答案',
     								icon: Ext.Msg.WARNING
								});
		        		}					
		        		else
		        			{
		        				if(isanswer=="未作答")
		        				{
		        					({
     								title:'温馨提示',
     								msg: '请先完成试卷的作答',
     								icon: Ext.Msg.WARNING
									});
		        				}
		        				else 
		        					{
		        					
			        	 			var arr = rec.get('stuAnswerName').split('.');
			        	 			if(!rec.get('stuAnswerName')){
			        	 				Ext.Msg.show({
     										title:'温馨提示',
     										msg: '没有作答，无法查看结果！',
     										icon: Ext.Msg.WARNING
										});
			        		 			return ;
			        				 }
			        	 if(arr[arr.length-1] =='docx'||arr[arr.length-1] == 'xlsx' ||arr[arr.length-1] == 'pptx'){
				        	 Ext.Ajax.request({
				        	 url:'setPREFIX.action',
				        	 params:{
					        	 PAPER:rec.get('questionid'),
					        	 USERID:rec.get('stuId'),
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
	    	    					title: '<center><font size="3" color="#0000cc">'+rec.get('stuScore')+'</font></center>',
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
						        	 PAPER:rec.get('questionid'),
						        	 USERID:rec.get('stuId'),
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
		    	    					title: '<center><font size="3" color="#0000cc">'+rec.get('stuScore')+'</font></center>',
		    	    					items:[{
		    	    						html:'<iframe frameborder="0" width="100%" height="100%" src="Stu_Check.jsp" </iframe>'
		    	    					}]
		    	    				});
		    	    				win.show();
		    	    				
				        	 	}
					         });
				        	 }
				        	 else{
				        	 	Ext.Msg.show({
     										title:'温馨提示',
     										msg: '请上传正确文件！',
     										icon: Ext.Msg.WARNING
										});
				        		 }
				        	 
		        					}
		        			}
		        		
		        	}
		        }]
	        }
        ],
         dockedItems: [{
            dock: 'top', 
            xtype: 'toolbar', 
            items: ['-',
      				{
					xtype : "combo",	
   		    		store : new Ext.data.SimpleStore({  
           			fields : [ 'text'],  
          			data : [['题目标题'],['作答情况'],['Word题目'], [ 'PowerPoint题目'], [ 'Excel题目']]  
    					}),  
    				hiddenName:'question_storeTerm',//提交到后台的input的name 
    				id : 'question_storeTerm',
    				name:'question_storeTerm',
    				mode:'local',//数据加载模式，'local'本地加载，'remote'远程加载
    				displayField : 'text',  //显示字段  
    				emptyText : '请选择查询条件',  //提示信息  
    				mode : 'local', //数据加载模式，local代表本地数据  
    				triggerAction : 'all',  // 显示所有下列数据，一定要设置属性triggerAction为a  
    				readOnly : false,   //只读，为true时不能编辑不能点击  
   					editable:false,
   					
						listeners : {
							change : {
								fn : function() {
									Ext.getCmp('question_storeSearch').setValue('');

									var termTemp = Ext.getCmp('question_storeTerm')
											.getValue();
									if (termTemp == 'Word题目'
											|| termTemp == 'PowerPoint题目'
											|| termTemp == 'Excel题目') {
										Ext.getCmp('question_storeSearch').setFieldLabel('题目标题');
									} else {
										Ext.getCmp('question_storeSearch').setFieldLabel('');
									}
									question_store.load();
								}

							}
						}
				}
				,{			
					labelAlign: 'right',
        			labelWidth: 60,
        			xtype : "textfield",
	    			emptyText:'请输入查询值',
	    			name : "question_storeSearch",
	    			id:"question_storeSearch"
        		}, {
						xtype : "button",
						text : "搜索",
						icon : "images/search.png",
						handler : function() {
							question_store.load();
						}
					}, '-']
		 }],
        viewConfig: { 
            stripeRows: true,
            disableSelection: false,
            frame: true 
        }
    })
      showquestion.setWidth(520); 
     

       var window = Ext.create('Ext.Window', {  
      			closable:true,
				layout:'border',	    	  
				title : '查看试卷',  
	    	    width : 800,
	    	    maximizable : true,
	    	    height:document.body.clientHeight-50,
	    	    modal:true, //模态对话框 ， 打开这个对话框后，后面的东西不能处理
	    	    plain:true, 
	    	    items : [ showquestion]  
	    	});  
	    	window.show();
}



