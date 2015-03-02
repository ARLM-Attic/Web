Ext.Loader.setConfig({enabled: true}); 

Ext.onReady(function(){
	
	var pageSize = 20;
	var ifClick = 0;//0未点击，1点击了小题，2点击了其他
	var clickItem = null;
	
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

	var treepanel = Ext.create('Ext.tree.Panel',{
		id: 'treepanel',
		region: 'west', 
		flex:5,
		title: '文档结构',
		split: true,
		forceFit: true,
	    store: treestore,
	    rootVisible: false,
	    singleExpand: false,
		collapsible: true,
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
		            	}else if (enName.indexOf('Drawing') >= 0) {
							return false;//'<img src="data/word/images/'+record.get('content')+'" width="15px" height="15px">';
						}else{
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
    	
	var valuestore = Ext.create('Ext.data.Store', {
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

	var valuegrid = Ext.create('Ext.grid.Panel', {
		id: 'valuegrid',
		region: 'north', 
		flex:5,
	    title: '属性列表',
	    frame: true,
	    rowLines: false,
	    split: true,
		collapsible: true,
	    store: valuestore,
	    selModel: Ext.create('Ext.selection.CheckboxModel'),
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
	        },
	        { text: '状态', width: 60, dataIndex: 'checkType',
	        	renderer : function(value, metadata, record) {
	        		if(value == "null"){
	        			return '';
	        		}else{
	        			return value;
	        		}
	        	}
	        }
	    ],
	    tbar: ['-',
		    {
		        text:'部分匹配', 
		        iconCls:'icon-add',
		        handler:function(){
		        	singleCheck();
	    		}
	    	},'-',{
		        text:'全部匹配', 
		        iconCls:'icon-add',
		        handler:function(){
		        	multiCheck();
	    		}
	    	}
	    ],
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

	var propertyStore = Ext.create('Ext.data.TreeStore', {
		extend: 'Ext.data.TreeStore',
		fields: [
		    {name: 'ID', type: 'int'},
		    {name: 'prefix', type: 'string'},
		    {name: 'score', type: 'float'},
		    {name: 'attr', type: 'string'},
		    {name: 'value', type: 'string'},
		    {name: 'checkType', type: 'string'},
		    {name: 'expanded', type: 'bool'},
		    {name: 'leaf', type: 'bool'}
	    ],
        proxy:{
    	    type:'ajax',
    	    url:'getXmlCheck.action',
    	    reader:{
    	    	type:'json',
    	    	root:'results'
    	    }
    	},
		root:{
    	    text:'根节点',
    	    expanded:false,
    	    leaf: false
		},
		sorters: [{
            property : 'ID',
            direction: 'ASC'//DESC
        }]
    });
    
	var propertyPanel = Ext.create('Ext.tree.Panel',{
		id: 'propertyPanel',
		region: 'center', 
		flex:5,
	    title: '勾选列表',
	    frame: true,
	    rootVisible: false,
	    singleExpand: false,
	    forceFit: true,
	    frame: true,
	    store: propertyStore,
	    columns: [
	        { text: '', dataIndex: 'checkType', width:150 , xtype: 'treecolumn', sortable:false,
	        	renderer: function(value, metadata, record){
	            	if(record.get('checkType') == '小题')
	            		return record.get('prefix');
	            	else if(record.get('checkType') == '')
	            		return '全部匹配';
	            	else
	            		return value;
		        }
	        },
	        { text: '属性名', dataIndex: 'attr', flex: 1, sortable:false },
	        { text: '属性值', dataIndex: 'value', flex: 1, sortable:false,
		        renderer: function(value, metadata, record){
	            	if(record.get('attr') == '资源文件')
	            		return '<img src="data/word/images/'+value+'" width="15px" height="15px" >';
	            	else
	            		return value;
		        }
            },{
	        	text: '分值', width: 80, dataIndex: 'score', sortable:false,
	        	editor : Ext.create('Ext.form.NumberField',{
	        		decimalPrecision: 1,
	        		minValue: 0,
	        		negativeText:'最小值为0,小数位最多1位!'
	        	}),
	            renderer: function(value, metadata, record){
	            	var val = Ext.util.Format.number(value,'0.0');
	            	if(record.get('checkType') == '部分匹配' || record.get('checkType') == '全部匹配'){
	            		return val;
	            	}
	            	else
	            		return '';
	            }
	        }
	    ],
	    tbar: ['-',
	    	{
		        text:'新建小题', 
		        iconCls:'icon-add',
		        handler:function(){
		        	addItem();
			   	}
		 	},'-',{
		        text:'删除', 
		        iconCls:'icon-del',
		        handler:function(){
		        	deleteItem();
	    		}
	    	},'-',{
 				text:'全部展开', 
		        iconCls:'icon-expand-all',
		        handler:function(){
		        	propertyPanel.expandAll();
	    		}
	    	},'-',{
			    text:'全部折叠', 
			    iconCls:'icon-collapse-all',
				    handler:function(){
					propertyPanel.collapseAll();
				}
			},{
				xtype:'tbfill'
			},{
	    		id:'showScore',
	    		xtype:'displayfield',
	    		value:'<font size="4" color="0066cc">总分:0.0</font>'
	    	}
	    ],
	    plugins: [
		    Ext.create('Ext.grid.plugin.CellEditing', {
		    	 clicksToEdit : 2
		    })
		]
	})
	
	propertyPanel.on('beforeedit', function(editor, e){
		var rec = e.record;
		if(rec.get('checkType')=='小题' || rec.get('checkType')=='')
			return false;
	});
   	
	propertyPanel.on('edit', function(editor, e) {
	    var rec = e.record;
	    Ext.Ajax.request({
			url:'updateNode.action',
			params:{
				idSet : rec.get('ID'),
				score : rec.get('score')
			},
			method:'post',
			success:function(response,opts){
				propertyStore.load();
				ifClick = 0;
			},
			failure:function(){
				Ext.Msg.show({
     				title:'提示',
     				msg: "添加小题出错！",
     				icon: Ext.Msg.ERROR
     			})
			}
		});
	});
	
	propertyPanel.on('load', function(store, records, successful, obj) {
		var totalScore = 0;
		var treeRoot = propertyPanel.getRootNode();
		if(treeRoot.hasChildNodes())
		{
			var treeItems = treeRoot.childNodes;
			for(var i=0;i<treeItems.length;i++)
			{
				var treeItem = treeItems[i];
				if(treeItem.hasChildNodes())
				{
					var treeRecords = treeItem.childNodes;
					for(var j=0;j<treeRecords.length;j++)
					{
						var record = treeRecords[j];
						totalScore += parseFloat(record.get("score"));
					}
				}
			}
		}
		totalScore = Ext.util.Format.number(totalScore,'0.0');
		Ext.getCmp('showScore').setValue('<font size="4" color="0066cc">总分:'+totalScore+'</font>');
	});
	
	propertyPanel.on('itemclick', function(view, rec, item){
		view.toggleOnDblClick = false;
		if(rec.get('checkType')=='小题')
			ifClick = 1;
		else
			ifClick = 2;
		clickItem = rec;
	});
    	
	propertyPanel.getView().on('render', function(view) {
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
	            }
	            else{
	            		tip.update(value);
		            }
		       	}
		    }
		});
	});	

	var rightForm = Ext.create('Ext.form.Panel', {
		region: 'center',
		flex: 5,
		layout: 'border',
		frame: false,
	    split: true,
		border: false,
		items:[
			valuegrid,propertyPanel
		]
	})
	
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items:[
	       treepanel,rightForm
        ]
	});
	
	function addItem(){
		Ext.Ajax.request({
			url:'addItem.action',
			method:'get',
			success:function(response,opts){
				propertyStore.load();
				ifClick = 0;
				//valuestore.load();
			},
			failure:function(){
				Ext.Msg.show({
     				title:'提示',
     				msg: "添加小题出错！",
     				icon: Ext.Msg.ERROR
     			})
			}
		});
	}
	
	function deleteItem(){
		if(ifClick == 0){
			Ext.Msg.show({
     			title:'提示',
     			msg: "请先选择数据！",
     			icon: Ext.Msg.WARNING
     		});
			return;
		}
		Ext.Ajax.request({
			url:'deleteNode.action',
			params:{
				idSet : clickItem.get('ID')
			},
			method:'post',
			success:function(response,opts){
				propertyStore.load();
				valuestore.removeAll();
				valuestore.load();
				ifClick = 0;
			},
			failure:function(){
				Ext.Msg.show({
     				title:'提示',
     				msg: "删除数据出错！",
     				icon: Ext.Msg.WARNING
     			})
			}
		});
	}
	
	//部分匹配
	function singleCheck(){
		if(ifClick != 1){
			Ext.Msg.show({
     			title:'提示',
     			msg: "请先选择小题！",
     			icon: Ext.Msg.WARNING
     		});
			return;
		}
		var idSet = clickItem.get('ID');
		var selections = valuegrid.getSelectionModel().getSelection();
		var checks = new Array();
		for (var i = 0; i < selections.length; i++) {
			var record = selections[i];
			if(record.get('checkType') == '已勾选'){
				Ext.Msg.show({
	     			title:'提示',
	     			msg: "不能重复勾选数据！",
	     			icon: Ext.Msg.WARNING
	     		});
				return ;
			}
			checks.push(record.get('id')+'&&'+record.get('prefix')+'&&'+record.get('attr')+'&&'+record.get('value'));
		}
		Ext.Ajax.request({
			url:'singleCheck.action',
			params:{
				idSet : idSet,
				checks : checks
			},
			method:'POST',
			success:function(response,opts){
				propertyStore.load();
				valuestore.removeAll();
				valuestore.load();
				ifClick = 0;
			},
			failure:function(){
				Ext.Msg.show({
     				title:'提示',
     				msg: "勾选出错！",
     				icon: Ext.Msg.ERROR
     			});
			}
		});
	}
	
	//全部匹配
	function multiCheck(){
		if(ifClick != 1){
			Ext.Msg.show({
     			title:'提示',
     			msg: "请先选择小题！",
     			icon: Ext.Msg.WARNING
     		});
			return;
		}
		var idSet = clickItem.get('ID');
		var selections = valuegrid.getSelectionModel().getSelection();
		var checks = new Array();
		for (var i = 0; i < selections.length; i++) {
			var record = selections[i];
			if(record.get('checkType') == '已勾选'){
				Ext.Msg.show({
	     			title:'提示',
	     			msg: "不能重复勾选数据！",
	     			icon: Ext.Msg.WARNING
	     		});
				return ;
			}
			checks.push(record.get('id')+'&&'+record.get('prefix')+'&&'+record.get('attr')+'&&'+record.get('value'));
		}
		Ext.Ajax.request({
			url:'multiCheck.action',
			params:{
				idSet : idSet,
				checks : checks
			},
			method:'POST',
			success:function(response,opts){
				propertyStore.load();
				valuestore.removeAll();
				valuestore.load();
				ifClick = 0;
			},
			failure:function(){
				Ext.Msg.show({
     				title:'提示',
     				msg: "勾选出错！",
     				icon: Ext.Msg.ERROR
     			});
			}
		});
	}

})