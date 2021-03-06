Ext.Loader.setConfig({enabled: true}); 

Ext.onReady(function(){
	
	var pageSize = 20;
	
	var treestore = Ext.create('Ext.data.TreeStore', {
		fields: [
		    {name: 'id', type: 'string'},
		    {name: 'fid', type: 'string'},
		    {name: 'prefix', type: 'string'},
		    {name: 'node', type: 'string'},
		    {name: 'content', type: 'string'},
		    {name: 'leaf', type: 'bool'},
	        {name: 'paper', type: 'string'},
	        {name: 'userid', type: 'string'}
	    ],
        proxy:{
    	    type:'ajax',
    	    url:'getXmlTree.action',
    	    reader:{
    	    	type:'json'
    	    }
    	},
		root:{
    	    text:'根节点',
    	    expanded:false,
    	    leaf: false
		}
    });

	treepanel = Ext.create('Ext.tree.Panel',{
		id: 'treepanel',
		region: 'west', 
		flex:5,
		split: true,
		forceFit: true,
		title: '文档结构',
	    store: treestore,
	    rootVisible: false,
	    singleExpand: false,
	    frame: true,
	    tbar: ['-',
		    {
		        text:'全部折叠', 
		        iconCls:'icon-collapse-all',
		        handler:function(){
		        	treepanel.collapseAll();
	    		}
	    	}
	    ],
	    columns: [
	        {
	            xtype: 'treecolumn',
	            dataIndex: 'node',
	            text: '节点名字',
	            flex: 2
	        },{
				text : '内容预览',
				xtype : 'gridcolumn',
				dataIndex: 'content',
				flex: 1,
				renderer : function(value, metadata, record, rowIndex, colIndex) {
	        		var str = '';
	        		var content = record.get('content');
	        		if(content == ""){
		            	return content;
		            }
					else if (record.get('node').indexOf('Drawing') >= 0) {
						return '';//'<img src="data/word/images/'+record.get('content')+'" width="15px" height="15px">';
					}else{
						return content;
					}
				}
	        }
	    ]
	});

	treepanel.getView().on('render', function(view) {
			view.tip = Ext.create('Ext.tip.ToolTip', {
		        target: view.el,
		        delegate: view.itemSelector,
		        trackMouse: true,
		        listeners: {
		            beforeshow: function updateTipBody(tip) {
		            	var enName = view.getRecord(tip.triggerElement).get('node');
		            	var content = view.getRecord(tip.triggerElement).get('content');
		            	if(content == ""){
		            		return false;
		            	}/*
		            	else if(enName.indexOf('Drawing') >= 0){
		            		var imgName = view.getRecord(tip.triggerElement).get('content');
		        			tip.update('<img src="data/word/images/'+imgName+'" width="100%" />');// width="400px"
		            	}*/else{
		            		tip.update(content);
		            	}
		        	}
		        }
		    });
	});

	treepanel.on('itemclick', function(view, rec, item, index, e){
		view.toggleOnDblClick = false;
		Ext.Ajax.request({
			url:'setPREFIX.action',
			params:{
				PREFIX:rec.get('prefix'),
				PAPER:rec.get('paper'),
		        USERID:0
			},
			method:'POST',
			success:function(response,opts){
				valuegrid.store.loadPage(1);
			}
		});
	});
    	
	valuestore = Ext.create('Ext.data.Store', {
		fields: [
		    {name: 'id', type: 'string'},
		    {name: 'attr', type: 'string'},
		    {name: 'value', type: 'string'},
		    {name: 'paper', type: 'string'},
		    {name: 'userid', type: 'string'},
		    {name: 'prefix', type: 'string'},
		    {name: 'score', type: 'string'},
	        {name: 'status', type: 'string'},
	        {name: 'checkType', type: 'string'}
	    ],
	    pageSize: pageSize,
        proxy: { 
            type: 'ajax', 
            url: 'getXmlValues.action',
            reader: {
                type: 'json',
                root: 'values',
                totalProperty: 'totalCount'
            }
        }
    }); 

	var numfield = new Ext.create('Ext.form.NumberField',{
    	maxValue:100,
    	minValue:0,
    	width:60,
    	decimalPrecision:1,
	    allowNegative:false,
	    minText:'请输入有效数字！(最小值为0,小数位最多1位)',
	    nanText:'请输入有效数字！(最小值为0,小数位最多1位)'
	});
	
	valuegrid = Ext.create('Ext.grid.Panel', {
		id: 'valuegrid',
		region: 'center', 
		flex:5,
	    title: '属性列表',
	    frame: true,
	    rowLines: false,
	    store: valuestore,
	    selModel: Ext.create('Ext.selection.CheckboxModel'),
		plugins: [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		    	 clicksToEdit : 2
		    })
		],
	    columns: [
	        { xtype: 'rownumberer', width:40, text:'序号' },
	        { text: '属性名', dataIndex: 'attr', flex: 1 },
	        { text: '属性值', dataIndex: 'value', flex: 1,
	        	renderer : function(value, metadata, record) {
	        		var str = record.get('attr');
	        		if(str == "资源文件"){
	        			return '<img src="data/word/images/'+record.get('value')+'" width="15px" height="15px">';
	        		}else{
	        			return record.get('value');
	        		}
	        	}
	        }, { text: '匹配类型', dataIndex: 'checkType', flex: 1,
	        renderer : function(checkType, metadata, record) {
	        	var a=record.get('checkType');
        		if(a == "null"){
        			return null;
        		}else{
        			return record.get('checkType');
        		}
        	}
	        },
	        {
	            text: '分值',
	            width: 60,
	            dataIndex: 'score',
	            renderer: function(value, metadata, record){
	        	var a=record.get('checkType');
        		if(a =="null"||a=="部分属性"){
        			return record.get('score');
        		}else{
        			return null;
        		}
	            }
	        }
	    ],
	    dockedItems: [{
	        dock: 'top', 
	        xtype: 'toolbar', 
	        items: ['-','设分:',numfield,
	        	{
				    itemId: 'c', 
				    text:'确定', 
				    iconCls:'icon-ok', 
				    handler:function(){
				    	var rec = valuegrid.getSelectionModel().getSelection();
				    	var v = numfield.getValue();
				    	if(v==null){
				    		numfield.setValue(0);
				    	}
				    	if(rec!=0 && v>=0){
				    		v = Ext.util.Format.number(v,'0.0');
				        	for(var i = 0; i < rec.length; i++){
				        		rec[i].set('score',numfield.getValue());
				        	}
				    	}
				    	else if(rec==0){
				    		Ext.example.msg('<font color="#ff9900">警告</font>','请先选择数据！');
				    	}
				    	else {
				    		Ext.example.msg('<font color="#ff0000">错误</font>','设置分值出错！');
				    	}
				    	numfield.reset();
	        		}
		    	},'-',{ 
			        itemId: 'd', 
			        text:'重置', 
			        iconCls:'icon-refresh', 
			        handler:function(){
			        	valuegrid.store.removeAll();
			        	valuegrid.store.load();
		    		}
		    	},'-',{ 
			        itemId: 'e', 
			        text:'保存',  
			        iconCls:'icon-save', 
			        handler:function(){
			        	save();
			        }
	    		},'-',{ 
		        itemId: 'f', 
		        text:'全部属性保存',  
		        iconCls:'icon-save', 
		        handler:function(){
		        	test();
		        }
    		}
		    ]
	    }],
	    bbar: Ext.create('Ext.PagingToolbar', {
	    	inputItemWidth: 45,
	    	beforePageText: '第',
	        afterPageText: '页，共{0}页',
	        pageSize : pageSize,
	        store : valuestore,
	        displayInfo : true,
	        displayMsg : '第  {0} - {1} 条 ， 共  {2} 条记录',
	        emptyMsg : "暂无数据"
	    })
	});
	
	valuegrid.getView().on('render', function(view) {
			view.tip = Ext.create('Ext.tip.ToolTip', {
		        target: view.el,
		        delegate: view.itemSelector,
		        trackMouse: true,
		        listeners: {
		            beforeshow: function updateTipBody(tip) {
		            	var attr = view.getRecord(tip.triggerElement).get('attr');
		            	var value = view.getRecord(tip.triggerElement).get('value');
		            	if(value == ""){
		            		return false;
		            	}
		            	else if(attr.indexOf('资源文件') >= 0){
		            		var imgName = view.getRecord(tip.triggerElement).get('value');
		        			tip.update('<img src="data/word/images/'+imgName+'" width="100px" height="100px"/>');
		            	}else{
		            		tip.update(value);
		            	}
		        	}
		        }
		    });
	});

	valueMask = new Ext.LoadMask(valuegrid, {msg:"请等待..."});
	treeMask = new Ext.LoadMask(treepanel, {msg:"请等待..."});
	
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items:[
	       treepanel,valuegrid
        ]
	});
	
		checktypestore = Ext.create('Ext.data.Store', {
		fields: [
		    {name: 'checkType', type: 'string'},
		    {name: 'score', type: 'string'}
		
	    ],
	    pageSize: pageSize,
        proxy: { 
            type: 'ajax', 
            url: 'getcheckType.action',
            reader: {
                type: 'json',
                root: 'checkTypes'
                //totalProperty: 'totalCount'
            }
        },
        autoLoad: false
       // sorters: ["id"]
    }); 
	
	function save(){
		var ifnull = true;
		valueMask.show();
		treeMask.show();
		var idSet=[];
		var scoreSet=[];
        var tempStore=valuegrid.getStore().getUpdatedRecords();
        for(var i=0;i<tempStore.length;i++){
        	ifnull = false;
        	var record=tempStore[i];
            idSet.push(record.get('id'));
            scoreSet.push(record.get('score'));
        }
        if(ifnull == false){
	        Ext.Ajax.request({
				url:'saveXmlAll.action',
				params:{
					idSet : idSet.join(","),
					scoreSet : scoreSet.join(",")
				},
				method:'POST',
				success:function(response,opts){
					valuegrid.store.removeAll();
					valuegrid.store.load();
					valueMask.hide();
					treeMask.hide();
				},
				failure:function(){
					Ext.example.msg('<font color="#ff0000">错误</font>','无数据保存！');
					valueMask.hide();
					treeMask.hide();
				}
			});
        }else{
        	Ext.example.msg('<font color="#ff9900">警告</font>','数据无变动。');
        	valueMask.hide();
			treeMask.hide();
        }
	}
			function test(){
		var rec = valuegrid.getSelectionModel().getSelection();
		 if(rec!=0)
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
		       
		       new Ext.form.ComboBox({ 
		           fieldLabel : "类型",

		   			 store :checktypestore/* new Ext.data.SimpleStore({  
		             fields : [ 'text'],  
		        	 data : [['全部属性1'], [ '全部属性2'], [ '全部属性3']]  
		    			})*/,  
		    		 id : 'type',
		    		 name:'type',
		    		hiddenName:'type',//提交到后台的input的name 
		    		mode:'remote',//数据加载模式，'local'本地加载，'remote'远程加载
		    		//valueField : 'value',   //值字段  
		    		displayField : 'checkType',  //显示字段  
		    		//value:'1001',       //默认值,要设置为提交给后台的值，不要设置为显示文本  
		    		emptyText : '请选择类型',  //提示信息   
		    		triggerAction : 'all',  // 显示所有下列数据，一定要设置属性triggerAction为a  
		    		readOnly : false,   //只读，为true时不能编辑不能点击  
		   			editable:false,     //是否可编辑，为true时可以手写录入  
		    		pageSize:0   , //当设置大于0时会显示分页按钮
		    		listeners :{
		    			 select : function(type, record, index){
		    				 var index = checktypestore.find('checkType',type.value);  
		    			     fform1.getForm().findField('typescore').setValue(checktypestore.getAt(index).get('score'));		    			
		    			}
		    			 }
					}) ,
					
		            new Ext.form.field.Number({	
						name:'typescore',
						id:'typescore',
						store:checktypestore,
		    	        fieldLabel:"分值",
		    	        allowDecimals:false,
		    	        minValue:0,
		    	        maxValue:100,
		    	        negativeText:"请输入有效的数字！",
		    	        maxText:"请输入有效的数字！"
				   
		       })
					]
		   
				});
			
			var win2=new Ext.Window({
				modal:true,
				draggable:true,
				title:"选择分类",
				items:[fform1],
				buttonAlign:"center",
				buttons:[{
					text : "添加分类",
				handler:function(){
					
				 Ext.Ajax.request({
				url:'addcheckType.action',
				success:function(response,opts){
					checktypestore.load();
					   Ext.example.msg('<font color="#0000ff">温馨提示</font>','新建分类成功！');
					
				},
				failure:function(){
					Ext.example.msg('<font color="#ff0000">错误</font>','新建分类失败！');
					
				}
			});					
				}
				},{
				
					    text : "保存",
					    handler:function(){
					var ifnull = true;					
					var idSet=[];
					var checktype=Ext.getCmp('type').getValue();
					var score=Ext.getCmp('typescore').getValue();
			        var tempStore=valuegrid.getSelectionModel().getSelection();
			        for(var i=0;i<tempStore.length;i++){
			        	var record=tempStore[i];
			            idSet.push(record.get('id'));
			        }
			        if(checktype==null)
			        {			        	
			        	Ext.example.msg('<font color="#ff0000">错误</font>','请选择分类');
			        }
			        
			          else if(score<0||score>100)
			        	Ext.example.msg('<font color="#ff0000">错误</font>','设置分值出错');
			        	
			        	else
				        Ext.Ajax.request({
							url:'All_saveXmlAll.action',
							params:{
								idSet : idSet.join(","),
								checkType : checktype,
							    checkTypescore:score
							},
							method:'POST',
							success:function(response,opts){
								valuegrid.store.removeAll();
								valuegrid.store.load();
								valueMask.hide();
								treeMask.hide();
								win2.close();
							},
							failure:function(){
								Ext.example.msg('<font color="#ff0000">错误</font>','无数据保存！');
								valueMask.hide();
								treeMask.hide();
								win2.close();
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
						else
							Ext.example.msg('<font color="#ff0000">错误</font>','请先选择数据！');
							


		
	}
	
})