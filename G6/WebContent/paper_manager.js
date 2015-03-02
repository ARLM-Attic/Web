Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux.data', 'Ext4.2/examples/ux/data');// '类名前缀','所在路径'
Ext.Loader.setPath('Ext.ux', 'Ext4.2/examples/ux');

Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.form.*', 'Ext.tip.*',
		'Ext.window.MessageBox', 'Ext.selection.CheckboxModel',
		'Ext.ux.data.PagingMemoryProxy']);

Ext.require('Ext.Ajax');

Ext.onReady(function() {

	Ext.QuickTips.init();
	Ext.Msg.msgButtons[0].setText("确定");// OK
	Ext.Msg.msgButtons[1].setText("是");// YES
	Ext.Msg.msgButtons[2].setText("否");// NO
	Ext.Msg.msgButtons[3].setText("取消");// CANCEL

	Ext.define('Ext.ux.form.SearchField', {
				extend : 'Ext.form.field.Trigger',
				alias : 'widget.searchfield',
				trigger1Cls : Ext.baseCSSPrefix + 'form-search-trigger',
				initComponent : function() {
					this.callParent(arguments);
				},
				afterRender : function() {
					this.callParent();
				}
			});

	Ext.define('MyData', {
				extend : 'Ext.data.Model',
				fields : [
					{
							name : 'id',
							type : 'int'
						}, {
							name : 'createPapaerUser',
							type : 'string'
						}, {
							name : 'createPaperTime',
							type : 'string'
						}, {
							name : 'endTime',
							type : 'string'
						}, {
							name : 'examname',
							type : 'string'
						}, {
							name : 'lastChangeTime',
							type : 'string'
						}, {
							name : 'lastChangeUser',
							type : 'string'
						}, {
							name : 'startTime',
							type : 'string'
						}, {
							name : 'exam_date',
							type : 'string'
						}, {
							name : 'score',
							type : 'string'
						}

				]
			});

	// -----------授权頁面
	function CreatExcelWin() {
		var newwin = new Ext.Window({
			title : '<center><font size="3" color="#0000cc">考试资格授予</font></center>',
			modal : true,
			width : 700,
			height : 500,
			layout : 'fit',
			frame : false,
			draggable : true,
			items : [{
				html : '<iframe frameborder="0" width="100%" height="100%" src="qualification.jsp" </iframe>'
			}]
		});
		newwin.show();
		newwin.center();// 居中
	}

	pageSize = 17;// 每页多少数据

	paperstore = Ext.create('Ext.data.Store', {
				pageSize : pageSize,
				model : 'MyData',
				proxy : {
					type : 'ajax',
					url : 'get_paper.action',
					reader : {
						type : 'json',
						root : 'paperManagerList',
						totalProperty : 'length'
					}
				},
				autoLoad : {
					params : {
						start : 0,
						limit : pageSize
					}
				},// 自动加载
				sorters : [{
							property : 'id',
							direction : 'desc'
						}]
			});
	paperstore.on('beforeload', function(store, options) {

				var paperSearch = Ext.getCmp('paperSearch').getValue();
				var paperTerm = Ext.getCmp('paperTerm').getValue();
				if (paperSearch.indexOf("'") != -1) {
					paperSearch = paperSearch.replace('\'', "");
				}
				var new_params = {
					term : encodeURIComponent(paperTerm),
					search : encodeURIComponent(paperSearch)
				};
				Ext.apply(store.proxy.extraParams, new_params);

			});

	var qBar_paper = new Ext.PagingToolbar({ // 设置分页的工具栏
		store : paperstore,
		displayInfo : true, // 是否显示总体信息
		displayMsg : "第 {0} -  共 {2}条",
		emptyMsg : "没有符合条件的记录"
	});
	var ss = Ext.create('Ext.selection.CheckboxModel');

	paperlist = Ext.create('Ext.grid.Panel', {
		store : paperstore,
		selModel : ss,
		bbar : qBar_paper,
		columns : [
			new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
			{
					header : "考试名称",
					dataIndex : 'examname',
					width : 75,
					sortable : true,
					menuDisabled : true
				}, {
					header : "考试日期",
					dataIndex : 'exam_date',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : "开始时间",
					dataIndex : 'startTime',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '结束时间',
					dataIndex : 'endTime',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '创建人',
					dataIndex : 'createPapaerUser',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '创建时间',
					dataIndex : 'createPaperTime',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '最后修改人',
					dataIndex : 'lastChangeUser',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '最后修改时间',
					dataIndex : 'lastChangeTime',
					flex : 1,
					sortable : true,
					menuDisabled : true
				},
				// { header: '总分' , dataIndex: 'score', flex:1 , sortable: true,
				// menuDisabled:true },
				{
					header : '相关操作',
					xtype : 'actioncolumn',
					flex : 1,
					sortable : true,
					menuDisabled : true,
					items : [{
						icon : 'images/search_form.png',
						tooltip : '查看题目',
						handler : function(grid, rowIndex, colIndex) {
							var rec = paperstore.getAt(rowIndex);
							var fuckid = rec.get('id');
							var exam = rec.get("examname");
							var startTime = rec.get("startTime");
							var endTime = rec.get("endTime");
							var startDate = rec.get("exam_date");
							//seePaperReadOnly(exam, fuckid, paperstore, startTime, endTime, startDate) ;
							var now = Ext.Date.format(new Date(),'Y-m-d');

							var nowtime = Ext.Date.format(new Date(), 'H:i:s');
							if(startDate>now ||((startDate==now) &&　(startTime> nowtime)))
							{
								
								see(exam, fuckid, paperstore, startTime, endTime,startDate);
							}
							else
							{
								seePaperReadOnly(exam, fuckid, paperstore, startTime, endTime, startDate) ;
							}
							// Editquestion(rec.get('id'),rec.get('title'),rec.get('type'),rec.get('question'),rec.get('filename'));
						}
					}, {
						icon : 'images/add.png',

						tooltip : '考试资格授予',
						handler : function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							var testid = [];
							testid.push(rec.get('id'));
							Ext.Ajax.request({

										url : 'setTestid.action',// 获取老师题目的action
										params : {
											testid : testid.join(",")
										},// 把ids传到后台
										method : 'POST',
										timeout : 2000,
										success : function(form, action) {
											CreatExcelWin();
										}
									});
						}
					}]
				}],
		viewConfig : {
			stripeRows : true,
			disableSelection : false,
			frame : true
		},
		dockedItems : [{
			dock : 'top',
			xtype : 'toolbar',
			items : ['-', {
						itemId : 'ButtonAdd',
						text : '新建试卷',
						tooltip : '新建一次试卷',
						iconCls : 'icon-add',
						handler : function() {
							CreatePaper(paperstore, paperstore);
						}
					}, {
						itemId : 'ButtonDel',
						text : '删除试卷',
						tooltip : '取消选中勾选',
						iconCls : 'icon-no',
						handler : function() {
							var n = paperlist.getSelectionModel()
									.getSelection();
							if (n.length > 0) {
								Ext.MessageBox.show({
									title : "提示",
									msg : "是否删除" + n.length + "份试卷?<br>"
											+ "（且考试中和考试后的试卷不能删除）",
									buttons : Ext.Msg.OKCANCEL,
									icon : Ext.MessageBox.QUESTION,
									fn : function(buttonId) {
										if (buttonId == "ok") {
											for (var i = 0; i < n.length; i++) {

												var now = Ext.Date.format(
														new Date(), 'Y-m-d');

												var nowtime = Ext.Date.format(
														new Date(), 'H:i:s');
												// 如果在考试之前就可以删除
												if (now < n[i].get("exam_date")
														|| (now == n[i]
																.get("exam_date") && nowtime < n[i]
																.get("startTime"))) {
													Ext.Ajax.request({
														url : "delpaper.action",
														params : {
															ID : n[i].get("id")
														},
														success : function() {
															paperstore.load();
														},
														failure : function() {
															Ext.Msg.show({
																title : '温馨提示',
																msg : '出错了!',
																icon : Ext.Msg.ERROR
															});

														}
													});
												} else {
													continue;
												}

											}

										};
									}

								});
							} else {
								Ext.Msg.show({
											title : '温馨提示',
											msg : '请选择删除试卷！',
											icon : Ext.Msg.WARNING
										});
							}
						}
					}, '-', {
						itemId : 'ButtonReset',
						text : '刷新',
						tooltip : '刷新页面',
						iconCls : 'icon-refresh',
						handler : function() {
							paperstore.load();
						}
					}, '-', {
						xtype : "combo",
						store : new Ext.data.SimpleStore({
									fields : ['text'],
									data : [['考试名称'], ['考试日期'], ['创建人'],
											['开始时间'], ['结束时间'], ['最后修改人'],
											['最后修改时间'], ['创建时间']]
								}),
						hiddenName : 'paperTerm',// 提交到后台的input的name
						id : 'paperTerm',
						name : 'paperTerm',
						mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
						displayField : 'text', // 显示字段
						emptyText : '请选择查询条件', // 提示信息
						mode : 'local', // 数据加载模式，local代表本地数据
						triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
						readOnly : false, // 只读，为true时不能编辑不能点击
						editable : false
					}, {
						labelAlign : 'right',
						labelWidth : 35,
						xtype : "textfield",
						emptyText : '请输入查询值',
						name : "paperSearch",
						id : "paperSearch"

					}, {
						xtype : "button",
						text : "搜索",
						icon : "images/search.png",
						handler : function() {
							paperstore.load();
						}

					}, '-']
		}]
	});
});

function CreatePaper(store, paperstore) {
	var fform2 = Ext.create('Ext.form.Panel', {
				baseCls : "x-plain",
				bodyPadding : '30 40 40 20',
				waitMsgTarget : true,
				fieldDefaults : {
					labelAlign : 'right',
					labelWidth : 60,
					msgTarget : 'qtip'
				},
				items : [{
							xtype : "textfield",
							fieldLabel : "考试名称",
							emptyText : '请输入考试题目',
							name : "examname",
							id : "examname",
							allowBlank : true,
							blankText : "考试题目不能为空！"
						}, {
							xtype : 'datefield',
							id : 'examdate',
							anchor : '100%',
							fieldLabel : '考试日期',
							name : 'examdate',
							format : 'Y-m-d',
							emptyText : '请选择日期'
							// value:Ext.Date.add(new Date(), Ext.Date.DAY, -1)
					}	, new Ext.form.TimeField({
									id : 'startTime',
									name : 'startTime',
									fieldLabel : '开始时间',
									emptyText : '请选择时间',
									format : 'H:i:s',
									increment : 5,
									minValue : '00:00:00',
									maxValue : '23:59:59',
									invalidText : '日期格式无效，请选择时间或输入有效格式的时间',
									minText : "请选择在{0}后的时间",
									maxText : "请选择{0}前的时间"
								}), new Ext.form.TimeField({
									id : 'endTime',
									name : 'endTime',
									fieldLabel : '结束时间',
									emptyText : '请选择时间',
									format : 'H:i:s',
									increment : 5,
									minValue : '00:00:00',
									maxValue : '23:59:59',
									invalidText : '日期格式无效，请选择时间或输入有效格式的时间',
									minText : "请选择在{0}后的时间",
									maxText : "请选择{0}前的时间"
								})]

			});

	var win2 = new Ext.Window({
		modal : true,
		draggable : true,
		title : "新建考卷向导",
		items : [fform2],
		buttonAlign : "center",
		buttons : [{
			text : "下一步",
			handler : function() {
				var exam = Ext.getCmp('examname').getValue();
				var examdate = Ext.util.Format.date(Ext.getCmp('examdate')
								.getValue(), 'Y-m-d');
				var start = Ext.util.Format.date(Ext.getCmp('startTime')
								.getValue(), 'H:i:s');
				var end = Ext.util.Format.date(
						Ext.getCmp('endTime').getValue(), 'H:i:s');
				var now = Ext.Date.format(new Date(), 'Y-m-d');
				var nowtime = Ext.Date.format(new Date(), 'H:i:s');
				if (judgePaper(exam, start, end, examdate, now, nowtime) == false)
					return;
				else {
					fform2.getForm().submit({
								waitMsg : '正在处理......',
								url : "add_paper.action",
								success : function(fform2, action, exam) {
									var ID = action.result.ID;
									// paperstore.load();
									win2.close();

									add_paper_from_question(exam, ID,
											paperstore);

								},
								failure : function(fform2, action) {
									Ext.Msg.show({
												title : '错误',
												msg : '请按要求输入相关信息!',
												icon : Ext.Msg.ERROR
											});
								}
							})
				}
			}
		}

		, {
			text : "取消",
			handler : function() {
				win2.close();
			}
		}]
	});
	win2.show();
}

function add_paper_from_question(exam, ID, paperstore) {

	var iscommit = '0'; // 判断是否提交了

	var k = new Array();

	var rightStore = new Ext.data.Store({
				pageSize : 16,
				proxy : {
					type : 'pagingmemory',
					data : k,
					reader : {
						type : 'array'
					}
					
				},
				sorters : [{
							property : 'id',
							direction : 'desc'
						}],
				fields : ['id', 'question', 'type', 'createUsers',
						'createTime', 'lastEditUser', 'lastEditTime',
						'condition', 'title', 'filename', 'score']
			});

	rightStore.load({
				params : {
					start : 0,
					limit : 16
				}
			});

	var rightStore_question2 = new Ext.PagingToolbar({
				// 设置分页的工具栏
				pageSize : 16,
				beforePageText : "第",// update
				store : rightStore,
				displayInfo : true, // 是否显示总体信息
				displayMsg : "第 {0} -  共 {2}条",
				emptyMsg : "没有符合条件的记录"
			});
	Ext.define('MyData', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'question',
							type : 'string'
						}, {
							name : 'type',
							type : 'string'
						}, {
							name : 'createUsers',
							type : 'string'
						}, {
							name : 'createTime',
							type : 'string'
						}, {
							name : 'lastEditUser',
							type : 'string'
						}, {
							name : 'lastEditTime',
							type : 'string'
						}, {
							name : 'condition',
							type : 'string'
						}, {
							name : 'title',
							type : 'string'
						}, {
							name : 'filename',
							type : 'string'
						}, {
							name : 'score',
							type : 'string'
						}

				]
			});
	var pageSize = 16;
	var questionstore2 = Ext.create('Ext.data.Store', {
				pageSize : pageSize,
				model : 'MyData',
				proxy : {
					type : 'ajax',
					url : 'getQuestion.action',
					reader : {
						type : 'json',
						root : 'question_manager',
						totalProperty : 'length'
					}
				},
				autoLoad : {
					params : {
						start : 0,
						limit : pageSize
					}
				},// 自动加载
				sorters : [{
							property : 'id',
							direction : 'desc'
						}]
			});
	questionstore2.on('beforeload', function(store, options) {

				var questionstore2Search = Ext.getCmp('questionstore2Search')
						.getValue();
				if (questionstore2Search.indexOf("'") != -1) {
					questionstore2Search = questionstore2Search.replace('\'',
							"");
				}
				var questionstore2Term = Ext.getCmp('questionstore2Term')
						.getValue();
				var new_params = {
					term : encodeURIComponent(questionstore2Term),
					search : encodeURIComponent(questionstore2Search)
				};
				Ext.apply(store.proxy.extraParams, new_params);

			});
	var qBar_question2 = new Ext.PagingToolbar({
				// 设置分页的工具栏
				beforePageText : "第",// update
				store : questionstore2,
				displayInfo : true, // 是否显示总体信息
				displayMsg : "第 {0} -  共 {2}条",
				emptyMsg : "没有符合条件的记录"
			});

	var sm = Ext.create('Ext.selection.CheckboxModel');

	var leftquestion = Ext.create('Ext.grid.Panel', {
				title : '题库',
				region : 'west',
				split : true,
				collapsible : true,
				store : questionstore2,
				bbar : qBar_question2,
				selModel : sm,
				columns : [
					new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
					{
							header : "题目标题",
							dataIndex : 'title',
							flex : 1,
							sortable : true,
							menuDisabled : true
						}, {
							header : "题目类型",
							dataIndex : 'type',
							flex : 1,
							sortable : true,
							menuDisabled : true
						}, {
							header : '创建人',
							dataIndex : 'createUsers',
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
								tooltip : '查看、编辑题目',
								handler : function(grid, rowIndex, colIndex) {
									var rec = questionstore2.getAt(rowIndex);
									Editquestion(rec.get('id'), rec
													.get('title'), rec
													.get('type'), rec
													.get('question'), rec
													.get('filename'));
								}
							}]
						}],
				viewConfig : {
					stripeRows : true,
					disableSelection : false,
					frame : true
				},
				dockedItems : [{
					dock : 'top',
					xtype : 'toolbar',
					items : ['-', {
						itemId : 'ButtonAdd',
						text : '添加',
						tooltip : '添加',
						iconCls : 'icon-add',
						handler : function() {
							var n = leftquestion.getSelectionModel()
									.getSelection();
							if (n <= 0) {
								Ext.Msg.show({
											title : '温馨提示',
											msg : '没有选中',
											icon : Ext.Msg.WARNING
										});

							}

							for (var i = 0; i < n.length; i++) {

								var nid = n[i].get("id");
								// addpapers(k,n[i],rightStore);
								var flag = issame(k, nid);

								if (flag == true) {
									Ext.Msg.show({
												title : '温馨提示',
												msg : '不能选择相同的题目',
												icon : Ext.Msg.WARNING
											});
								} else {
									addpapers(k, n[i], rightStore);
								}

							}

							// Ext.MessageBox.confirm("fuck",ff);
							// CreateQuestion(questionstore);
						}
					}, '-', {
						xtype : "combo",
						store : new Ext.data.SimpleStore({
									fields : ['text'],
									data : [['题目标题'], ['创建人'], ['Word题目'],
											['PowerPoint题目'], ['Excel题目']]
								}),
						hiddenName : 'questionstore2Term',// 提交到后台的input的name
						id : 'questionstore2Term',
						name : 'questionstore2Term',
						mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
						displayField : 'text', // 显示字段
						emptyText : '请选择查询条件', // 提示信息
						mode : 'local', // 数据加载模式，local代表本地数据
						triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
						readOnly : false, // 只读，为true时不能编辑不能点击
						editable : false, // 是否可编辑，为true时可以手写录入

						listeners : {
							change : {
								fn : function() {
									Ext.getCmp('questionstore2Search')
											.setValue('');

									var termTemp = Ext
											.getCmp('questionstore2Term')
											.getValue();
									if (termTemp == 'Word题目'
											|| termTemp == 'PowerPoint题目'
											|| termTemp == 'Excel题目') {
										Ext.getCmp('questionstore2Search')
												.setFieldLabel('题目标题');
										questionstore2.load();
									} else {
										Ext.getCmp('questionstore2Search')
												.setFieldLabel('');
									}

								}

							}
						}
					}, {
						labelAlign : 'right',
						labelWidth : 60,
						xtype : "textfield",
						emptyText : '请输入查询值',
						name : "questionstore2Search",
						id : "questionstore2Search"
					}, {
						xtype : "button",
						text : "搜索",
						icon : "images/search.png",
						handler : function() {
							questionstore2.load();
						}

					}, '-']
				}]
			})
	leftquestion.setWidth(520);

	var sm2 = Ext.create('Ext.selection.CheckboxModel');

	var qBar_question3 = new Ext.PagingToolbar({
				// 设置分页的工具栏
				beforePageText : "第",// update
				store : rightStore,
				// pageSize : 20, // 一页显示25行
				displayInfo : true, // 是否显示总体信息
				displayMsg : "第 {0} -  共 {2}条",
				emptyMsg : "没有符合条件的记录"
			});

	var rightquestion = Ext.create('Ext.grid.Panel', {
		// bbar : rightStore_question2,
		bbar : new Ext.PagingToolbar({
					pageSize : 16,
					store : rightStore,
					displayInfo : true,
					displayMsg : '第 {0} -  共 {2}条',
					emptyMsg : "没有记录"
				}),
		title : '试卷题目',
		store : rightStore,
		region : 'center',
		bbar : qBar_question3,
		selModel : sm2,
		columns : [
			new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
			{
					header : "题目标题",
					dataIndex : 'title',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : "题目类型",
					dataIndex : 'type',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '创建人',
					dataIndex : 'createUsers',
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
						icon : 'images/search.png',
						tooltip : '查看、编辑题目',
						handler : function(grid, rowIndex, colIndex) {
							var rec = rightStore.getAt(rowIndex);
							Editquestion(rec.get('id'), rec.get('title'), rec
											.get('type'), rec.get('question'),
									rec.get('filename'));
						}
					}]
				}],
		viewConfig : {
			stripeRows : true,
			disableSelection : false,
			frame : true
		},
		dockedItems : [{
			dock : 'top',
			xtype : 'toolbar',
			items : ['-', {
				itemId : 'ButtonAdd',
				text : '移除',
				tooltip : '移除题目',
				iconCls : 'icon-del',
				handler : function() {
					var n = rightquestion.getSelectionModel().getSelection();
					if (n.length > 0) {
						Ext.MessageBox.show({
							title : "提示",
							msg : "<font size='2'>是否删除" + n.length
									+ "份试题?</font><br>",

							buttons : Ext.Msg.OKCANCEL,
							icon : Ext.MessageBox.QUESTION,
							fn : function(buttonId) {
								if (buttonId == "ok") {
									for (var i = 0; i < n.length; i++) {
										for (var num2 = 0; num2 < k.length; num2++) {
											if (k[num2][0] == n[i].get("id")) {
												k.splice(num2, 1);
											}
										}

									}

									rightStore.remove(n);
									rightStore.load();
								};
							}
						});
					} else {
						Ext.Msg.show({
									title : '温馨提示',
									msg : '请选需要移除的试题',
									icon : Ext.Msg.WARNING
								});
					}
					// CreateQuestion(questionstore);
				}

			}, '-', {
				itemId : 'ButtonFinish',
				text : '完成',
				tooltip : '完成出题',
				iconCls : 'icon-yes',
				handler : function() {
					for (var i = 0; i < k.length; i++) {
						Ext.Ajax.request({
									url : "add_Paper_and_question.action",
									params : {
										qid : ID,
										pid : k[i][0]
									},
									success : function() {
										iscommit = '1';
									},
									failure : function() {
										Ext.Msg.show({
													title : '温馨提示',
													msg : '提交失败!',
													icon : Ext.Msg.ERROR
												});

									}
								})
					}
					paperstore.load();
					fw.close();
				}
			}]
		}]
	})

	rightquestion.setWidth(500);
	var fw = Ext.create('Ext.Window', {
				closable : true,
				layout : 'border',
				title : '试卷',
				width : 1050,
				height : document.body.clientHeight - 50,
				modal : true, // 模态对话框 ， 打开这个对话框后，后面的东西不能处理
				plain : true,
				items : [leftquestion, rightquestion]
			});
	fw.on('close', function() {
				// 如果没有提交了
				paperstore.load();

			});

	fw.show();

}

function judgePaper(exam, startTime, endTime, examdate, now, nowtime) {
	if (exam == null || exam == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请填写考试题目',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (examdate == null || examdate == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请填写考试日期',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (startTime == null || startTime == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请填写考试的开始时间',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (startTime == endTime) {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '开始时间不能与结束时间相同',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (endTime == null || endTime == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请填写考试的结束时间',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (endTime == null || endTime == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请填写考试的结束时间',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (endTime < startTime) {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '开始时间不能大于结束时间',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (now > examdate) {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '不能选择以前的日期',
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	if (now == examdate) {
		if (endTime < nowtime) {
			Ext.Msg.show({
						title : '温馨提示',
						msg : '不能选择之前的时间',
						icon : Ext.Msg.WARNING
					});
			return false;
		}
	}
	return true;
}

function issame(k, nid) {
	for (var num = 0; num < k.length; num++) {
		// 寻找是否已存在对象
		if (k[num][0] == nid) {
			return true;
		}
	}
	return false;
}

function see(exam, fuckid, paperstore, startTime, endTime, startDate) {
	var pageSize = 16;
	Ext.Ajax.request({
		url : 'get_Paper_question.action',
		params : {
			id : fuckid
		},
		callback : function(options, success, response, questionArray) {
			if (success == true) {
				var responseJson = Ext.JSON.decode(response.responseText);
				var json = responseJson.paper_question_list;
				var questionArray = new Array();
				for (var i = 0; i < json.length; i++) {
					questionArray.push([json[i].id, json[i].question,
							json[i].type, json[i].createUsers,
							json[i].createTime, json[i].lastEditUser,
							json[i].lastEditTime, json[i].condition,
							json[i].title, json[i].filename, json[i].score]);
				}

				/*
				 * Ext.define('Data', { extend : 'Ext.data.Model', fields : [{
				 * name : 'id', type : 'int' }, { name : 'question', type :
				 * 'string' }, { name : 'type', type : 'string' }, { name :
				 * 'createUsers', type : 'string' }, { name : 'createTime', type :
				 * 'string' }, { name : 'lastEditUser', type : 'string' }, {
				 * name : 'lastEditTime', type : 'string' }, { name :
				 * 'condition', type : 'string' }, { name : 'title', type :
				 * 'string' }, { name : 'filename', type : 'string' }, { name :
				 * 'score', type : 'string' }] });
				 */

				/*
				 * var question_store = new Ext.data.ArrayStore({ pageSize :
				 * pageSize, model : Data, data : questionArray });
				 */
				var question_store = new Ext.data.Store({
							pageSize : 16,
							proxy : {
								type : 'pagingmemory',
								data : questionArray,
								reader : {
									type : 'array'
								}
							},
							sorters : [{
							property : 'id',
							direction : 'desc'
						}],
							fields : ['id', 'question', 'type', 'createUsers',
									'createTime', 'lastEditUser',
									'lastEditTime', 'condition', 'title',
									'filename', 'score']
						});
				question_store.load();
				var smf = Ext.create('Ext.selection.CheckboxModel');
				var showquestion = Ext.create('Ext.grid.Panel', {

					title : '试卷题目',
					region : 'center',
					bbar : new Ext.PagingToolbar({
								pageSize : 16,
								store : question_store,
								displayInfo : true,
								displayMsg : '第 {0} -  共 {2}条',
								emptyMsg : "没有记录"
							}),
					split : true,
					store : question_store,
					selModel : smf,
					columns : [
					new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
							{
								header : "题目标题",
								dataIndex : 'title',
								flex : 1,
								sortable : true,
								menuDisabled : true
							}, {
								header : "题目类型",
								dataIndex : 'type',
								flex : 1,
								sortable : true,
								menuDisabled : true
							}, {
								header : '创建人',
								dataIndex : 'createUsers',
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
									tooltip : '查看、编辑题目',
									handler : function(grid, rowIndex, colIndex) {
										var rec = question_store
												.getAt(rowIndex);
										Editquestion(rec.get('id'), rec
														.get('title'), rec
														.get('type'), rec
														.get('question'), rec
														.get('filename'));
									}
								}]
							}],
					viewConfig : {
						stripeRows : true,
						disableSelection : false,
						frame : true
					},
					dockedItems : [{
						dock : 'top',
						xtype : 'toolbar',
						items : ['-', {
							itemId : 'ButtonAdd',
							text : '移除',
							tooltip : '移除题目',
							iconCls : 'icon-del',
							handler : function() {
								var n = showquestion.getSelectionModel()
										.getSelection();
								if (n.length > 0) {
									Ext.MessageBox.show({
										title : "提示",
										msg : "是否移除" + n.length + "份试题 ",
										buttons : Ext.Msg.OKCANCEL,
										icon : Ext.MessageBox.QUESTION,
										fn : function(buttonId) {
											if (buttonId == "ok") {
												for (var i = 0; i < n.length; i++) {
													for (var num2 = 0; num2 < questionArray.length; num2++) {
														if (questionArray[num2][0] == n[i]
																.get("id")) {
															questionArray
																	.splice(
																			num2,
																			1);
														}
													}

												}
												question_store.remove(n);
												question_store.load();
											};
										}
									});
								} else {
									Ext.Msg.show({
												title : '温馨提示',
												msg : '请选需要移除的试题!',
												icon : Ext.Msg.WARNING
											});
								}
							}

						}, '-', {
							itemId : 'ButtonFinish',
							text : '修改',
							tooltip : '完成出题',
							iconCls : 'icon-yes',
							handler : function() {

								var now = Ext.Date.format(new Date(), 'Y-m-d');

								var nowtime = Ext.Date.format(new Date(),
										'H:i:s');

								if (now == startDate && now > startTime
										&& now < endTime) {
									Ext.Msg.show({
												title : '不能修改',
												msg : '考试过程中不能修改',
												icon : Ext.Msg.WARNING
											});

								} else if (questionArray.length == 0) {
									Ext.Ajax.request({
												url : "change_teacher_paper.action",
												params : {
													qid : fuckid,
													isdelete : -1
												},
												success : function() {

												},
												failure : function() {
													Ext.Msg.show({
																title : '温馨提示',
																msg : '提交失败！',
																icon : Ext.Msg.ERROR
															});

												}
											})
								} else {
									for (var i = 0; i < questionArray.length; i++) {
										Ext.Ajax.request({
											url : "change_teacher_paper.action",
											params : {
												qid : fuckid,
												pid : questionArray[i][0],
												isdelete : i
											},
											success : function() {

											},
											failure : function() {
												Ext.Msg.show({
															title : '温馨提示',
															msg : '提交失败！',
															icon : Ext.Msg.ERROR
														});

											}
										})
									}
								}
								question_store.load();

								window.close();
							}
						}, '-', {
							itemId : 'refresh',
							text : '刷新',
							tooltip : '完成出题',
							iconCls : 'icon-refresh',
							handler : function() {
								question_store.load();
							}
						}]
					}]
				})
				showquestion.setWidth(500);

				Ext.define('MyData', {
							extend : 'Ext.data.Model',
							fields : [{
										name : 'id',
										type : 'int'
									}, {
										name : 'question',
										type : 'string'
									}, {
										name : 'type',
										type : 'string'
									}, {
										name : 'createUsers',
										type : 'string'
									}, {
										name : 'createTime',
										type : 'string'
									}, {
										name : 'lastEditUser',
										type : 'string'
									}, {
										name : 'lastEditTime',
										type : 'string'
									}, {
										name : 'condition',
										type : 'string'
									}, {
										name : 'title',
										type : 'string'
									}, {
										name : 'filename',
										type : 'string'
									}, {
										name : 'score',
										type : 'string'
									}

							]
						});

				var seeQuestionStore = Ext.create('Ext.data.Store', {
							pageSize : pageSize,
							model : 'MyData',
							proxy : {
								type : 'ajax',
								url : 'getQuestion.action',
								reader : {
									type : 'json',
									root : 'question_manager',
									totalProperty : 'length'
								}
							},
							autoLoad : {
								params : {
									start : 0,
									limit : pageSize
								}
							},// 自动加载
							sorters : [{
										property : 'id',
										direction : 'desc'
									}]
						});
				seeQuestionStore.on('beforeload', function(store, options) {

							var seeQuestionStoreSearch = Ext
									.getCmp('seeQuestionStoreSearch')
									.getValue();
							var seeQuestionStoreTerm = Ext
									.getCmp('seeQuestionStoreTerm').getValue();
							if (seeQuestionStoreSearch.indexOf("'") != -1) {
								seeQuestionStoreSearch = seeQuestionStoreSearch
										.replace('\'', "");
							}
							var new_params = {
								term : encodeURIComponent(seeQuestionStoreTerm),
								search : encodeURIComponent(seeQuestionStoreSearch)
							};
							Ext.apply(store.proxy.extraParams, new_params);

						});

				var qBar_question = new Ext.PagingToolbar({ // 设置分页的工具栏
					store : seeQuestionStore,
					displayInfo : true, // 是否显示总体信息
					displayMsg : "第 {0} -  共 {2}条",
					emptyMsg : "没有符合条件的记录"
				});

				var sm = Ext.create('Ext.selection.CheckboxModel');
				var leftquestion = Ext.create('Ext.grid.Panel', {
					title : '题库',
					bbar : qBar_question,
					region : 'west',
					split : true,
					collapsible : true,
					store : seeQuestionStore,

					selModel : sm,
					columns : [
						new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
						{
								header : "题目标题",
								dataIndex : 'title',
								flex : 1,
								sortable : true,
								menuDisabled : true
							}, {
								header : "题目类型",
								dataIndex : 'type',
								flex : 1,
								sortable : true,
								menuDisabled : true
							}, {
								header : '创建人',
								dataIndex : 'createUsers',
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
									tooltip : '查看、编辑题目',
									handler : function(grid, rowIndex, colIndex) {
										var rec = seeQuestionStore
												.getAt(rowIndex);
										Editquestion(rec.get('id'), rec
														.get('title'), rec
														.get('type'), rec
														.get('question'), rec
														.get('filename'));
									}
								}]
							}],
					viewConfig : {
						stripeRows : true,
						disableSelection : false,
						frame : true
					},
					dockedItems : [{
						dock : 'top',
						xtype : 'toolbar',
						items : ['-', {
							itemId : 'ButtonAdd',
							text : '添加',
							tooltip : '添加',
							iconCls : 'icon-add',
							handler : function() {
								var n = leftquestion.getSelectionModel()
										.getSelection();
								if (n <= 0) {
									Ext.Msg.show({
												title : '温馨提示',
												msg : '没有选中',
												icon : Ext.Msg.WARNING
											});
								}

								for (var i = 0; i < n.length; i++) {

									var nid = n[i].get("id");
									var flag = issame(questionArray, nid);
									if (flag == true) {
										Ext.Msg.show({
													title : '温馨提示',
													msg : '不能选择相同的题目',
													icon : Ext.Msg.WARNING
												});

									} else {
										addpapers(questionArray, n[i],
												question_store);
									}

								}

							}
						}, '-', {
							xtype : "combo",
							store : new Ext.data.SimpleStore({
										fields : ['text'],
										data : [['题目编号'], ['题目标题'], ['创建人'],
												['Word题目'], ['PowerPoint题目'],
												['Excel题目']]
									}),
							hiddenName : 'seeQuestionStoreTerm',// 提交到后台的input的name
							id : 'seeQuestionStoreTerm',
							name : 'seeQuestionStoreTerm',
							mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
							displayField : 'text', // 显示字段
							emptyText : '请选择查询条件', // 提示信息
							mode : 'local', // 数据加载模式，local代表本地数据
							triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
							readOnly : false, // 只读，为true时不能编辑不能点击
							editable : false, // 是否可编辑，为true时可以手写录入

							listeners : {
								change : {
									fn : function() {
										Ext.getCmp('seeQuestionStoreSearch')
												.setValue('');
										var termTemp = Ext
												.getCmp('seeQuestionStoreTerm')
												.getValue();
										if (termTemp == 'Word题目'
												|| termTemp == 'PowerPoint题目'
												|| termTemp == 'Excel题目') {
											Ext
													.getCmp('seeQuestionStoreSearch')
													.setFieldLabel('题目标题');
											seeQuestionStore.load();
										} else {
											Ext
													.getCmp('seeQuestionStoreSearch')
													.setFieldLabel('');
										}
									}

								}
							}

						}, {
							labelAlign : 'right',
							labelWidth : 60,
							xtype : "textfield",
							emptyText : '请输入查询值',
							name : "seeQuestionStoreSearch",
							id : "seeQuestionStoreSearch"
						}, {
							xtype : "button",
							text : "搜索",
							icon : "images/search.png",
							handler : function() {
								questionstore.load();
							}

						}, '-']
					}]
				})
				leftquestion.setWidth(520);

				var window = Ext.create('Ext.Window', {
							closable : true,
							layout : 'border',
							title : '查看试卷',
							width : 1050,
							height : document.body.clientHeight - 50,
							modal : true, // 模态对话框 ， 打开这个对话框后，后面的东西不能处理
							plain : true,
							items : [showquestion, leftquestion]
						});

				window.show();

			}
		}
	});

}

function addpapers(k, n, rightStore) {
	var ni = n;
	k.push([ni.get("id"), ni.get("question"), ni.get("type"),
			ni.get("createUsers"), ni.get("createTime"),
			ni.get("lastEditUser"), ni.get("lastEditTime"),
			ni.get("condition"), ni.get("title"), ni.get("filename"),
			ni.get("score")]);
	rightStore.loadData(k);
	rightStore.load();
}

function seePaperReadOnly(exam, fuckid, paperstore, startTime, endTime, startDate) {
	var pageSize = 16;
	Ext.Ajax.request({
		url : 'get_Paper_question.action',
		params : {
			id : fuckid
		},
		callback : function(options, success, response, questionArray) {
			if (success == true) {
				var responseJson = Ext.JSON.decode(response.responseText);
				var json = responseJson.paper_question_list;
				var questionArray = new Array();
				for (var i = 0; i < json.length; i++) {
					questionArray.push([json[i].id, json[i].question,
							json[i].type, json[i].createUsers,
							json[i].createTime, json[i].lastEditUser,
							json[i].lastEditTime, json[i].condition,
							json[i].title, json[i].filename, json[i].score]);
				}

				var question_store = new Ext.data.Store({
							pageSize : 16,
							proxy : {
								type : 'pagingmemory',
								data : questionArray,
								reader : {
									type : 'array'
								}
							},
							sorters : [{
							property : 'id',
							direction : 'desc'
						}],
							fields : ['id', 'question', 'type', 'createUsers',
									'createTime', 'lastEditUser',
									'lastEditTime', 'condition', 'title',
									'filename', 'score']
						});
				question_store.load();
				var showquestion = Ext.create('Ext.grid.Panel', {
					region : 'center',
					bbar : new Ext.PagingToolbar({
								pageSize : 16,
								store : question_store,
								displayInfo : true,
								displayMsg : '第 {0} -  共 {2}条',
								emptyMsg : "没有记录"
							}),
					split : true,
					store : question_store,
					columns : [
					new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
							{
								header : "题目标题",
								dataIndex : 'title',
								flex : 1,
								sortable : true,
								menuDisabled : true
							}, {
								header : "题目类型",
								dataIndex : 'type',
								flex : 1,
								sortable : true,
								menuDisabled : true
							}, {
								header : '创建人',
								dataIndex : 'createUsers',
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
									tooltip : '查看、编辑题目',
									handler : function(grid, rowIndex, colIndex) {
										var rec = question_store
												.getAt(rowIndex);
										Editquestion2(rec.get('title'), rec
														.get('type'), rec
														.get('question'));
									}
								}]
							}],
					viewConfig : {
						stripeRows : true,
						disableSelection : false,
						frame : true
					},
					dockedItems : [{
						dock : 'top',
						xtype : 'toolbar',
						items : ['-',
						{
							itemId : 'refresh',
							text : '刷新',
							tooltip : '完成出题',
							iconCls : 'icon-refresh',
							handler : function() {
								question_store.load();
							}
						}]
					}]
				})
				showquestion.setWidth(500);


			
				var window = Ext.create('Ext.Window', {
							closable : true,
							layout : 'border',
							title : '查看试卷',
							width : 750,
							height : document.body.clientHeight - 50,
							modal : true, // 模态对话框 ， 打开这个对话框后，后面的东西不能处理
							plain : true,
							items : [showquestion]
						});

				window.show();

			}
		}
	});

}


