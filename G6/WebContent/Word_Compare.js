Ext.onReady(function() {

	var resulStore = Ext.create('Ext.data.TreeStore', {
				fields : [{
							name : 'prefix',
							type : 'string'
						}, {
							name : 'score',
							type : 'string'
						}, {
							name : 'attr',
							type : 'string'
						}, {
							name : 'teaValue',
							type : 'string'
						}, {
							name : 'stuValue',
							type : 'string'
						}, {
							name : 'checkType',
							type : 'string'
						}, {
							name : 'leaf',
							type : 'bool'
						}, {
							name : 'status',
							type : 'bool'
						}],
				proxy : {
					type : 'ajax',
					url : 'getXmlResult.action',
					reader : {
						type : 'json',
						root : 'results'
					}
				},
				root : {
					expanded : false,
					leaf : false
				}
			});

	resultPanel = Ext.create('Ext.tree.Panel', {
				id : 'resultPanel',
				region : 'center',
				title : '详细情况',
				rootVisible : false,
				singleExpand : false,
				forceFit : true,
				frame : true,
				store : resulStore,
				columns : [{
							text : '对比方式',
							dataIndex : 'checkType',
							width : 150,
							xtype : 'treecolumn'
						},
						// { text: '位置', dataIndex: 'prefix', flex: 1 },
						{
							text : '属性名',
							dataIndex : 'attr',
							flex : 1
						}, {
							text : '标准答案值',
							dataIndex : 'teaValue',
							flex : 1,
							renderer : function(value, metadata, record) {
								if (record.get('attr') == '资源文件')
									return '<img src="data/word/images/'
											+ value
											+ '" width="15px" height="15px" >';
								else
									return value;
							}
						}, {
							text : '学生答案值',
							dataIndex : 'stuValue',
							flex : 1,
							renderer : function(value, metadata, record) {
								if (record.get('attr') == '资源文件')
									return '<img src="data/word/images/'
											+ value
											+ '" width="15px" height="15px" >';
								else
									return value;
							}
						}, {
							text : '状态',
							width : 60,
							dataIndex : 'status',
							renderer : function(value, metadata, record) {
								if (record.get('status') == true)
									return '<img src="images/yes.png">';
								else
									return '<img src="images/no.png">';
							}
						}, {
							text : '分值',
							width : 60,
							dataIndex : 'score',
							renderer : function(value, metadata, record) {
								var scoreVal = Ext.util.Format.number(value,
										'0.0');
								if (record.get('status') == false)
									return '<center><font size="4" color="FF000">'
											+ scoreVal + '</font></center>';
								else
									return '<center><font size="4" color="0066cc">'
											+ scoreVal + '</font></center>';
							}
						}]
			});

	resultPanel.getView().on('render', function(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
					target : view.el,
					delegate : view.itemSelector,
					trackMouse : true,
					listeners : {
						beforeshow : function updateTipBody(tip) {
							var attr = view.getRecord(tip.triggerElement)
									.get('attr');
							var teaValue = view.getRecord(tip.triggerElement)
									.get('teaValue');
							var stuValue = view.getRecord(tip.triggerElement)
									.get('stuValue');
							if (attr == '资源文件')
								tip.update('<font color="0066cc">属性名：</font>'
										+ attr + '<br>'
										+ '<font color="0066cc">标准答案值：</font>'
										+ '<br>'
										+ '<img src="data/word/images/'
										+ teaValue
										+ '" width="100px" height="100px" >'
										+ '<br>'
										+ '<font color="0066cc">学生答案值：</font>'
										+ '<br>'
										+ '<img src="data/word/images/'
										+ stuValue
										+ '" width="100px" height="100px" >'
										+ '<br>');
							else if (attr != '')
								tip.update('<font color="0066cc">属性名：</font>'
										+ attr + '<br>'
										+ '<font color="0066cc">标准答案值：</font>'
										+ teaValue + '<br>'
										+ '<font color="0066cc">学生答案值：</font>'
										+ stuValue);
							else
								return false;
						}
					}
				});
	});

	Ext.create('Ext.container.Viewport', {
				layout : 'border',
				items : [resultPanel]
			});

})