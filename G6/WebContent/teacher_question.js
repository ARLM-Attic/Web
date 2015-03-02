Ext.Loader.setConfig({
			enabled : true
		});
Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.form.*', 'Ext.tip.*',
		'Ext.window.MessageBox', 'Ext.selection.CheckboxModel']);
Ext.require('Ext.Ajax');
Ext.onReady(function() {

	Ext.QuickTips.init();
	Ext.Msg.msgButtons[0].setText("确定");// OK
	Ext.Msg.msgButtons[1].setText("是");// YES
	Ext.Msg.msgButtons[2].setText("否");// NO
	Ext.Msg.msgButtons[3].setText("取消");// CANCEL

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

	var pageSize = 17;// 每页的数据

	questionstore = Ext.create('Ext.data.Store', {
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
				actionMethods : {
					read : 'POST'
				},
				pageSize : pageSize,
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
	questionstore.on('beforeload', function(store, options) {

				var search = Ext.getCmp('search').getValue();
				if (search.indexOf("'") != -1) {
					search = search.replace('\'', "");
				}
				var term = Ext.getCmp('term').getValue();
				var new_params = {
					term : encodeURIComponent(term),
					search : encodeURIComponent(search)
				};
				Ext.apply(store.proxy.extraParams, new_params);

			});
	// ----

	var qBar_paper = new Ext.PagingToolbar({ // 设置分页的工具栏
		store : questionstore,
		displayInfo : true, // 是否显示总体信息
		displayMsg : "第 {0}页 -  共 {2}条",
		emptyMsg : "没有符合条件的记录"
	});

	function CreatWin() {
		var newwin = new Ext.Window({
			title : '<center><font size="3" color="#0000cc">勾选、设分页面</font></center>',
			modal : true,
			layout : 'fit',
			frame : false,
			maximized : true,
			draggable : true,
			items : [{
				html : '<iframe frameborder="0" width="100%" height="100%" src="Word_Page.jsp" </iframe>'
			}]
		})
		newwin.show();
		newwin.fitContainer(); // 满屏
		newwin.center();// 居中
	}
	// ----------------

	// -----------------------

	function CreatExcelWin() {
		var newwin = new Ext.Window({
			title : '<center><font size="3" color="#0000cc">勾选、设分页面</font></center>',
			modal : true,
			layout : 'fit',
			frame : false,
			maximized : true,
			draggable : true,
			items : [{
				html : '<iframe frameborder="0" width="100%" height="100%" src="Excel_Page.jsp" </iframe>'
			}]
		})
		newwin.show();
		newwin.fitContainer(); // 满屏
		newwin.center();// 居中
	}
	// PPT页面------------------------------

	function CreatPPtWin() {
		var newwin = new Ext.Window({
			modal : true,
			layout : 'fit',
			title : '<center><font size="3" color="#0000cc">勾选、设分页面</font></center>',
			frame : false,
			closeAction : 'close',
			draggable : true,
			items : [{
				html : '<iframe frameborder="0" width="100%" height="100%" src="Word_Page.jsp"</iframe>'
			}],
			buttonAlign : "center"
		})
		newwin.show();
		newwin.fitContainer(); // 满屏
		newwin.center();// 居中
	}

	var qBar_question2 = new Ext.PagingToolbar({
				// 设置分页的工具栏
				beforePageText : "第",// update
				store : questionstore,
				pageSize : pageSize, // 一页显示25行
				displayInfo : true, // 是否显示总体信息
				displayMsg : "第 {0} -  共 {2}条",
				emptyMsg : "没有符合条件的记录"
			});

	var sm = Ext.create('Ext.selection.CheckboxModel');

	question = Ext.create('Ext.grid.Panel', {
		store : questionstore,
		bbar : qBar_paper,
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
					header : '文件名',
					dataIndex : 'filename',
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
					header : '创建时间',
					dataIndex : 'createTime',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '最后修改人',
					dataIndex : 'lastEditUser',
					flex : 1,
					sortable : true,
					menuDisabled : true
				}, {
					header : '最后修改时间',
					dataIndex : 'lastEditTime',
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
							var rec = questionstore.getAt(rowIndex);
							Editquestion(rec.get('id'), rec.get('title'), rec
											.get('type'), rec.get('question'),
									rec.get('filename'));
						}
					}, {
						icon : 'images/view.gif',
						tooltip : '查看、勾选标准答案',

						handler : function(grid, rowIndex, colIndex) {
							var rec = questionstore.getAt(rowIndex);
							var arr = rec.get('filename').split('.');
							if (!rec.get('filename')) {
								Ext.Msg.show({
											title : '警告',
											msg : "没有数据，请先上传答案！",
											icon : Ext.Msg.WARNING
										})
								return;
							}
							if (arr[arr.length - 1] == 'docx') {
								Ext.Ajax.request({
											url : 'setPREFIX.action',
											params : {
												PAPER : rec.get('id'),
												USERID : 0,
												PREFIX : '-1'
											},
											method : 'POST',
											success : function(response, opts) {
												CreatWin(rec.get('id'), 0);// PAPER
												// USERID
											}
										});
							}
							if (arr[arr.length - 1] == 'pptx') {
								Ext.Ajax.request({
											url : 'setPREFIX.action',
											params : {
												PAPER : rec.get('id'),
												USERID : 0,
												PREFIX : '-1'
											},
											method : 'POST',
											success : function(response, opts) {
												CreatPPtWin(rec.get('id'), 0);// PAPER
												// USERID
											}
										});
							}
							if (arr[arr.length - 1] == 'xlsx') {
								Ext.Ajax.request({
											url : 'setPREFIX.action',// 获取点击的序号
											params : {
												PAPER : rec.get('id'),
												USERID : 0,
												PREFIX : '-1'

											},
											method : 'POST',
											timeout : 2000,
											success : function(response, opts) {
												CreatExcelWin(rec.get('id'), 0);

											}
										})
							}
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
						text : '新建题目',
						// tooltip : '新建一道题目',
						iconCls : 'icon-add',
						handler : function() {
							CreateQuestion(questionstore);
						}
					}, {
						itemId : 'ButtonDel',
						text : '删除题目',
						// tooltip : '取消选中勾选',
						iconCls : 'icon-no',
						handler : function() {
							var n = question.getSelectionModel().getSelection();
							if (n.length > 0) {

								Ext.MessageBox.show({
									title : "提示",
									msg : "是否删除" + n.length + "份试题?"
											+ "<br/>（被试卷占用的试题不能被删除）",
									buttons : Ext.Msg.OKCANCEL,
									icon : Ext.MessageBox.QUESTION,
									fn : function(buttonId) {
										if (buttonId == "ok") {
											for (var i = 0; i < n.length; i++) {
												Ext.Ajax.request({
													url : "delquestion.action",
													params : {
														ID : n[i].get("id")
													},
													callback : function(
															options, success,
															response, deleted) {
														if (success == true) {
															var responseJson = Ext.JSON
																	.decode(response.responseText);
															var judge = responseJson.judge;
															if (judge != "0") {
																var fk = 1;
																/*
																 * Ext.example.msg( '<font
																 * color="#ff9900">不能删除</font>',
																 * "原因是试卷:<br><font
																 * color='red'>" +
																 * responseJson.judge + "</font>
																 * <br>需要编号为<font
																 * color='red'>" +
																 * responseJson.ID + "</font>的题目");
																 */

															}
														} else {
															Ext.Msg.show({
																title : '温馨提示',
																msg : "删除失败",
																icon : Ext.Msg.ERROR
															})
														}
														questionstore.load();

													}
												});
											}

										};
									}
								});
							} else {
								Ext.Msg.show({
											title : '温馨提示',
											msg : "请选择删除的试卷",
											icon : Ext.Msg.WARNING
										})
							}
							questionstore.load();
						}
					}, '-', {
						itemId : 'ButtonReset',
						text : '刷新',
						// tooltip : '刷新页面',
						iconCls : 'icon-refresh',
						handler : function() {
							questionstore.load();
						}
					}, '-', {
						xtype : "combo",
						store : new Ext.data.SimpleStore({
									fields : ['text'],
									data : [['题目标题'], ['文件名'], ['创建人'],
											['创建时间'], ['最后修改人'], ['最后修改时间'],
											['Word题目'], ['PowerPoint题目'],
											['Excel题目']]
								}),
						hiddenName : 'term',// 提交到后台的input的name
						id : 'term',
						name : 'term',
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
									Ext.getCmp('search').setValue('');

									var termTemp = Ext.getCmp('term')
											.getValue();
									if (termTemp == 'Word题目'
											|| termTemp == 'PowerPoint题目'
											|| termTemp == 'Excel题目') {
										Ext.getCmp('search')
												.setFieldLabel('题目标题');
									} else {
										Ext.getCmp('search').setFieldLabel('');
									}
									questionstore.load();
								}

							}
						}

					}, {
						labelAlign : 'right',
						labelWidth : 60,
						xtype : "textfield",
						emptyText : '请输入查询值',
						name : "search",
						id : "search",
						listeners : {
							change : {
								fn : function() {
									var termTemp = Ext.getCmp('term')
											.getValue();
									if (termTemp == "题目编号") {

										var searchtemp = Ext.getCmp('search')
												.getValue();
										if (searchtemp != null
												&& searchtemp != "") {
											if (!isNaN(searchtemp) == false) {
												Ext.Msg.show({
															title : '温馨提示',
															msg : "请输入数字",
															icon : Ext.Msg.WARNING
														})
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
							questionstore.load();
						}

					}, '-']
		}]
	});
});

function CreateQuestion(store) {
	var fform1 = Ext.create('Ext.form.Panel', {
				baseCls : "x-plain",
				bodyPadding : '20 30 20 20',
				waitMsgTarget : true,
				fieldDefaults : {
					labelAlign : 'right',
					labelWidth : 35,
					msgTarget : 'qtip'
				},
				items : [{
							xtype : "textfield",
							fieldLabel : "标题",
							emptyText : '请输入问卷的名字',
							name : "title",
							id : "title",
							allowBlank : true,
							blankText : "问卷名字不能为空！"
						}, new Ext.form.ComboBox({
							fieldLabel : "类型",
							store : new Ext.data.SimpleStore({
										fields : ['text'],
										data : [['Word题目'], ['PowerPoint题目'],
												['Excel题目']]
									}),
							id : 'type',
							name : 'type',
							hiddenName : 'type',// 提交到后台的input的name
							mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
							// valueField : 'value', //值字段
							displayField : 'text', // 显示字段
							// value:'1001', //默认值,要设置为提交给后台的值，不要设置为显示文本
							emptyText : '请选择类型', // 提示信息
							mode : 'local', // 数据加载模式，local代表本地数据
							triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
							readOnly : false, // 只读，为true时不能编辑不能点击
							editable : false, // 是否可编辑，为true时可以手写录入
							pageSize : 0
								// 当设置大于0时会显示分页按钮
							}), {
							value : '<br>',
							labelStyle : "text-align:right;",// 向右对齐
							fieldLabel : '题干',
							id : 'question',
							name : 'question',
							height : 180,
							width : 550,
							preventScrollbar : true,
							frame : true,
							layout : 'fit',
							xtype : 'htmleditor',
							enableColors : true,
							enableAlignments : true
						}, {
							width : 550,
							xtype : 'fileuploadfield',
							fieldLabel : '答案',
							name : 'answer',
							id : 'answer',
							emptyText : '请上传文件',
							allowBlank : true,
							buttonText : '选择文件'
						}]

			});

	var win2 = new Ext.Window({
				modal : true,
				draggable : true,
				title : "新建题目",
				items : [fform1],
				resizable : false,
				buttonAlign : "center",
				buttons : [{
					text : "提交",
					handler : function() {
						var a = Ext.getCmp('answer').getValue().replace(
								/(^\s*)|(\s*$)/g, ""); // 获得编写题干编辑框的内容
						var t = Ext.getCmp('type').getRawValue().replace(
								/(^\s*)|(\s*$)/g, "");
						var qq = Ext.getCmp('question').getValue().replace(
								/(^\s*)|(\s*$)|(&nbsp;)|( &nbsp;)/ig, "");
						var title = Ext.getCmp('title').getValue().replace(
								/(^\s*)|(\s*$)/g, "");
						if (judge(a, t, qq, title) == false)
							return;
						else {
							fform1.getForm().submit({
										waitMsg : '正在提交......',
										url : "addquestion.action",
										success : function(fform1, action) {
											store.load();
											win2.close();
										},
										failure : function(fform1, action) {
											Ext.Msg.show({
														title : '解析数据出错',
														msg : "请联系管理员",
														icon : Ext.Msg.ERROR
													})
										}
									});
						}
					}
				}, {
					text : "取消",
					handler : function() {
						win2.close();
					}
				}]
			});
	win2.show();
}


// 没有上传按钮的
function Editquestion2(title, type, question) {
	var fform1 = Ext.create('Ext.form.Panel', {
		baseCls : "x-plain",
		bodyPadding : '20 30 20 20',
		waitMsgTarget : true,
		fieldDefaults : {
			labelAlign : 'right',
			labelWidth : 35,
			msgTarget : 'qtip'
		},
		items : [{
					xtype : 'hiddenfield',
					id : 'type1',
					name : 'type',
					value : type
				}, {
					xtype : 'hiddenfield',
					id : 'title1',
					name : 'title',
					value : title
				}, {
					xtype : 'hiddenfield',
					id : 'question1',
					name : 'question',
					value : question
				}, {
					html : type,
					autoScroll : true,
					border : false,
					width : 600,
					bodyStyle : 'text-align:center; font-family:黑体; font-weight:bold; font-size:150%;'
				}, {
					html : title,
					border : false,
					width : 600,
					bodyStyle : 'font-family:黑体; font-size:120%; padding:5px;',
					html : question,
					autoScroll : true,
					border : false,
					height : 375,
					width : 600,
					bodyStyle : 'padding:10px;'
				}]
	});

	var win = new Ext.Window({
				modal : true,
				draggable : true,
				title : "查看题目",
				resizable : false,
				items : [fform1],
				buttonAlign : "center",
				buttons : [{
							text : "确定",
							handler : function() {
								win.close();
							}
						}]
			});
	win.show();
}
function Editquestion(id, title, type, question, filename) {
	var fform1 = Ext.create('Ext.form.Panel', {
				baseCls : "x-plain",
				bodyPadding : '20 30 20 20',
				waitMsgTarget : true,
				fieldDefaults : {
					labelAlign : 'right',
					labelWidth : 35,
					msgTarget : 'qtip'
				},
				items : [{
							xtype : 'hiddenfield',// 隐藏提交
							name : 'ID',
							value : id
						}, {
							xtype : "textfield",
							fieldLabel : "标题",
							emptyText : '请输入问卷的名字',
							name : "title",
							id : "title1",
							allowBlank : true,
							blankText : "问卷名字不能为空！",
							value : title
						}, new Ext.form.ComboBox({
							fieldLabel : "类型",
							store : new Ext.data.SimpleStore({
										fields : ['text'],
										data : [['Word题目'], ['PowerPoint题目'],
												['Excel题目']]
									}),
							id : 'type1',
							name : 'type',
							hiddenName : 'type',// 提交到后台的input的name
							mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
							// valueField : 'value', //值字段
							displayField : 'text', // 显示字段
							value : type,
							emptyText : '请选择类型', // 提示信息
							mode : 'local', // 数据加载模式，local代表本地数据
							triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
							readOnly : false, // 只读，为true时不能编辑不能点击
							editable : false, // 是否可编辑，为true时可以手写录入
							pageSize : 0
								// 当设置大于0时会显示分页按钮
							}), {
							value : question,
							labelStyle : "text-align:right;",// 向右对齐
							fieldLabel : '题干',
							id : 'question1',
							name : 'question',
							height : 180,
							width : 550,
							preventScrollbar : true,
							frame : true,
							layout : 'fit',
							xtype : 'htmleditor',
							enableColors : true,
							enableAlignments : true
						}, {
							width : 550,
							xtype : 'fileuploadfield',
							fieldLabel : '答案',
							name : 'answer',
							id : 'answer1',
							value : filename,
							emptyText : filename,
							allowBlank : true,
							buttonText : '选择文件'
						}]
			});

	var win = new Ext.Window({
				modal : true,
				draggable : true,
				title : "修改考试信息",
				resizable : false,
				items : [fform1],
				buttonAlign : "center",
				buttons : [{
					text : "保存",
					handler : function() {
						var answer1 = Ext.getCmp('answer1').getValue();
						var title1 = Ext.getCmp('title1').getValue();
						var type1 = Ext.getCmp('type1').getValue();
						var question1 = Ext.getCmp('question1').getValue();
						// 如果没有修改过
						if ((answer1 == null || answer1 == "")
								&& title1 == title && type1 == type
								&& question1 == question) {
							win.close();
						}
						// 如果文件更改过
						else if (!(answer1 == null || answer1 == "")) {
							if (judge(answer1, type1, question1, title1) == false)
								return;
							else {
								fform1.getForm().submit({
											waitMsg : '正在提交......',
											url : "change_question_file.action",
											success : function(fform, action) {
												questionstore.load();
												win.close();
											},
											failure : function(fform, action) {
												Ext.Msg.show({
															title : '错误',
															msg : "请按要求输入相关信息",
															icon : Ext.Msg.ERROR
														})
											}
										})
							}
						}
						// 如果问题更改过
						else {
							if (judge2(type1, question1, title1) == false)
								return;
							else {
								fform1.getForm().submit({
											waitMsg : '正在提交......',
											url : "change_question.action",
											success : function(fform, action) {
												questionstore.load();
												win.close();
											},
											failure : function(fform, action) {
												Ext.Msg.show({
															title : '错误',
															msg : "请按要求输入相关信息",
															icon : Ext.Msg.ERROR
														})
											}
										})
							}
						};
					}
				}, {
					text : "取消",
					handler : function() {
						win.close();
					}
				}]
			});
	win.show();
}

function judge(answer, type, question, title) {
	if (type == 'Word题目')
		type = 'docx';
	else if (type == 'Excel题目')
		type = 'xlsx';
	else if (type == 'PowerPoint题目')
		type = "pptx";
	var arr = answer.split('.');

	if (question == null || question == '<br>' || question == ""
			|| question == '&nbsp;') {
		Ext.Msg.show({
					title : '温馨提示',
					msg : "请编写题干",
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	} else if (title == null || title == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : "请填写标题",
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	} else if (type == null || type == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : "请选择考试类型",
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	} else if (answer == null || answer == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : "请上传文件",
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	// 如果上传类型符合要求
	else if (arr[arr.length - 1] != type) {
		Ext.Msg.show({
					title : '温馨提示',
					msg : "请上传扩展名为" + type + "文件",
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	return true;
}

function judge2(type, question, title) {

	if (question == null || question == '<br>' || question == ""
			|| question == '&nbsp;') {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请编写题干',
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	} else if (title == null || title == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请填写标题',
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	} else if (type == null || type == "") {
		Ext.Msg.show({
					title : '温馨提示',
					msg : '请选择考试类型',
					// buttons: Ext.Msg.OK,
					icon : Ext.Msg.WARNING
				});
		return false;
	}
	return true;
}
