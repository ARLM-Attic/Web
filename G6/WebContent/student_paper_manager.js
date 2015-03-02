Ext.Loader.setConfig({
			enabled : true
		});
Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.form.*', 'Ext.tip.*',
		'Ext.window.MessageBox', 'Ext.selection.CheckboxModel']);

Ext.onReady(function() {

			Ext.QuickTips.init();
			Ext.Msg.msgButtons[0].setText("确定");// OK
			Ext.Msg.msgButtons[1].setText("是");// YES
			Ext.Msg.msgButtons[2].setText("否");// NO
			Ext.Msg.msgButtons[3].setText("取消");// CANCEL

			Ext.define('MyData', {
						extend : 'Ext.data.Model',
						fields : [

						{
									name : 'ID',
									type : 'string'
								}, {
									name : 'CREATE_PAPAER_USER',
									type : 'string'
								}, {
									name : 'EXAMNAME',
									type : 'string'
								}, {
									name : 'EXAM_DATE',
									type : 'string'
								}, {
									name : 'START_TIME',
									type : 'string'
								}, {
									name : 'END_TIME',
									type : 'string'
								}, {
									name : 'SCORE',
									type : 'string'
								}, {
									name : 'STUDENTID',
									type : 'string'
								}, {
									name : 'STUDENTNAME',
									type : 'string'
								}, {
									name : 'STU_SCORE',
									type : 'string'
								}

						]
					});

			var pageSize = 17;// 每页的数据

			// 考生试卷的数据源
			student_store = Ext.create('Ext.data.Store', {
						pageSize : pageSize,
						model : 'MyData',
						proxy : {
							type : 'ajax',
							url : 'get_student_paper.action',
							reader : {
								type : 'json',
								root : 'get_studentPaper',
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
			student_store.on('beforeload', function(store, options) {

						var studentStoreSearch = Ext
								.getCmp('studentStoreSearch').getValue();
						var studentStoreTerm = Ext.getCmp('studentStoreTerm')
								.getValue();
						if (studentStoreSearch.indexOf("'") != -1) {
							studentStoreSearch = studentStoreSearch.replace(
									'\'', "");
						}
						var new_params = {
							term : encodeURIComponent(studentStoreTerm),
							search : encodeURIComponent(studentStoreSearch)
						};
						Ext.apply(store.proxy.extraParams, new_params);

					});

			var qBar_paper = new Ext.PagingToolbar({ // 设置分页的工具栏
				store : student_store,
				displayInfo : true, // 是否显示总体信息
				displayMsg : "第 {0}页 -  共 {2}条",
				emptyMsg : "没有符合条件的记录"
			});

			// 考生试卷的页面
			student_paper = Ext.create('Ext.grid.Panel', {
						bbar : qBar_paper,
						store : student_store,
						columns : [
							new Ext.grid.RowNumberer({
										header : "序号",
										width : 38
									}), 
								/*
								 * private Integer ID ; private String
								 * CREATE_PAPAER_USER; private String EXAMNAME;
								 * private String EXAM_DATE; private String
								 * START_TIME; private String END_TIME; private
								 * String SCORE; private Integer STUDENTID;
								 * private String STUDENTNAME; private String
								 * STU_SCORE;
								 */
								{
							header : "考试名称",
							dataIndex : 'EXAMNAME',
							width : 75,
							sortable : true,
							menuDisabled : true
						}, {
							header : "考试日期",
							dataIndex : 'EXAM_DATE',
							flex : 1,
							sortable : true,
							menuDisabled : true
						}, {
							header : "开始时间",
							dataIndex : 'START_TIME',
							flex : 1,
							sortable : true,
							menuDisabled : true
						}, {
							header : '结束时间',
							dataIndex : 'END_TIME',
							flex : 1,
							sortable : true,
							menuDisabled : true
						}, {
							header : '出卷人',
							dataIndex : 'CREATE_PAPAER_USER',
							flex : 1,
							sortable : true,
							menuDisabled : true
						}, {
							header : '学生得分',
							dataIndex : 'STU_SCORE',
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
								tooltip : '查看试卷',
								handler : function(grid, rowIndex, colIndex) {
									var rec = student_store.getAt(rowIndex);
									var paperid = rec.get('ID') // 试卷的id
									var studentid = rec.get('STUDENTID'); // 考生的id
									var isanswer = rec.get('STU_SCORE');
									var exam_date = rec.get('EXAM_DATE');
									var startTime = rec.get('START_TIME');
									var EndTime = rec.get('END_TIME');
									if (isanswer == '未作答') {
										var now = Ext.Date.format(new Date(),
												'Y-m-d');

										var nowtime = Ext.Date.format(
												new Date(), 'H:i:s');
										if (now > exam_date) {
											Ext.Msg.show({
														title : '温馨提示',
														msg : '你已经错过考试时间',
														icon : Ext.Msg.WARNING
													});
											return;
										} else if (now < exam_date) {
											Ext.Msg.show({
														title : '温馨提示',
														msg : '还没有到考试时间',
														icon : Ext.Msg.WARNING
													});
											return;
										}
										// 查看考生的考试题、
										// 调用考生考试题目的函数
										// 日期相同
										else {
											if (nowtime < startTime) {
												Ext.Msg.show({
															title : '温馨提示',
															msg : '还没有到考试时间',
															icon : Ext.Msg.WARNING
														});
												return;
											}
											if (nowtime > EndTime) {
												Ext.Msg.show({
															title : '温馨提示',
															msg : '你已经错过考试时间',
															icon : Ext.Msg.WARNING
														});
												return;
											} else {
												see_student(paperid, studentid,
														isanswer,
														student_store, EndTime);
											}
										}
									}
									// 已经作答了
									else {
										see_student_without_Submit(paperid,
												studentid, isanswer,
												student_store);
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
								xtype : "combo",
								store : new Ext.data.SimpleStore({
											fields : ['text'],
											data : [['考试名称'], ['考试日期'],
													['出卷人'], ['开始时间'], ['结束时间']]
										}),
								hiddenName : 'studentStoreTerm',// 提交到后台的input的name
								id : 'studentStoreTerm',
								name : 'studentStoreTerm',
								mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
								displayField : 'text', // 显示字段
								emptyText : '请选择查询条件', // 提示信息
								mode : 'local', // 数据加载模式，local代表本地数据
								triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
								readOnly : false, // 只读，为true时不能编辑不能点击
								editable : false
									// 是否可编辑，为true时可以手写录入
							}, {
								labelAlign : 'right',
								labelWidth : 35,
								xtype : "textfield",
								emptyText : '请输入查询值',
								name : "studentStoreSearch",
								id : "studentStoreSearch"
							}, {
								xtype : "button",
								text : "搜索",
								icon : "images/search.png",
								handler : function() {
									student_store.load();
								}
							}, '-']
						}]
					});
		});

// 考生考试 题目的 函数
// 没有提交按钮
function see_student_without_Submit(paperid, studentid, isanswer, student_store) {
	Ext.define('MyData', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'id',
							type : 'string'
						}, {
							name : 'paper',
							type : 'string'
						},// 试卷的id
						{
							name : 'questionid',
							type : 'string'
						}, {
							name : 'stuAnswer',
							type : 'string'
						},// 学生答案的文件路径
						{
							name : 'stuId',
							type : 'string'
						},// 学生的id
						{
							name : 'stuScore',
							type : 'string'
						},// 学生的得分
						{
							name : 'stuAnswerName',
							type : 'string'
						},// 学生上传的文件名
						{
							name : 'title',
							type : 'string'
						},// 题目
						{
							name : 'question',
							type : 'string'
						},// 问题
						{
							name : 'type',
							type : 'string'
						},// 考试类型
						{
							name : 'condition',
							type : 'string'
						},// 学生作答的状态
						{
							name : 'question_score',
							type : 'string'
						}

				]
			});

	var pageSize = 16;
	// 考生考试题目的数据源
	var question_store = Ext.create('Ext.data.Store', {
				pageSize : pageSize,
				model : 'MyData',
				proxy : {
					type : 'ajax',
					url : 'get_Paper_student.action',
					reader : {
						type : 'json',
						root : 'student_answer_list',
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

	question_store.on('beforeload', function(store, options) {
				var question_storeSearch = Ext.getCmp('question_storeSearch')
						.getValue();
				var question_storeTerm = Ext.getCmp('question_storeTerm')
						.getValue();
				if (question_storeSearch.indexOf("'") != -1) {
					question_storeSearch = question_storeSearch.replace('\'',
							"");
				}
				var new_params = {
					term : encodeURIComponent(question_storeTerm),
					search : encodeURIComponent(question_storeSearch),
					paperid : paperid
				}; // 先提交一个试卷的id
				Ext.apply(store.proxy.extraParams, new_params);

			});

	var qBar_question = new Ext.PagingToolbar({ // 设置分页的工具栏
		store : question_store,
		displayInfo : true, // 是否显示总体信息
		displayMsg : "第 {0}页 -  共 {2}条",
		emptyMsg : "没有符合条件的记录"
	});

	var showquestion = Ext.create('Ext.grid.Panel', {
		// title : '选择题目',
		region : 'center',
		split : true,

		store : question_store,
		bbar : qBar_question,
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
					header : '得分',
					dataIndex : 'stuScore',
					flex : 3,
					sortable : true,
					menuDisabled : true
				}, {
					header : '作答情况',
					dataIndex : 'condition',
					flex : 1,
					sortable : true,
					menuDisabled : true
				},

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
							var rec = grid.getStore().getAt(rowIndex);

							if (isanswer == "未作答") {
								var f = rec.get('stuAnswerName');
								if (f == null || f == "") {
									f = "请上传答案"
								}
								Editquestion(rec.get('id'), rec.get('title'),
										rec.get('type'), rec.get('question'),
										question_store, rec.get('questionid'),
										f);
							} else {

								Editquestion2(rec.get('title'),
										rec.get('type'), rec.get('question'));

							}
						}
					}, {
						icon : 'images/search.png',
						tooltip : '查看错误',
						handler : function(grid, rowIndex, colIndex) {

							var rec = grid.getStore().getAt(rowIndex);
							if (rec.get('condition') != "已上传") {
								Ext.Msg.show({
											title : '温馨提示',
											msg : '你没有上传答案',
											icon : Ext.Msg.WARNING
										});
							} else {
								if (isanswer == "未作答") {
									Ext.Msg.show({
												title : '温馨提示',
												msg : '请先完成试卷的作答',
												icon : Ext.Msg.WARNING
											});
								} else {

									var arr = rec.get('stuAnswerName')
											.split('.');
									if (!rec.get('stuAnswerName')) {
										Ext.Msg.show({
													title : '温馨提示',
													msg : '没有作答，无法查看结果',
													icon : Ext.Msg.WARNING
												});
										return;
									}
									if (arr[arr.length - 1] == 'docx'
											|| arr[arr.length - 1] == 'xlsx'
											|| arr[arr.length - 1] == 'pptx') {
										Ext.Ajax.request({
											url : 'setPREFIX.action',
											params : {
												PAPER : rec.get('questionid'),
												USERID : rec.get('stuId'),
												PREFIX : '-1'
											},
											method : 'POST',
											success : function(response, opts) {

												var win = new Ext.Window({
													modal : true,
													frame : false,
													maximized : true,
													draggable : true,
													layout : 'fit',
													title : '<center><font size="3" color="#0000cc">'
															+ rec
																	.get('stuScore')
															+ '</font></center>',
													items : [{
														html : '<iframe frameborder="0" width="100%" height="100%" src="Word_Compare.jsp" </iframe>'
													}]
												});
												win.show();

											}
										});
									} else if (arr[arr.length - 1] === 'pptx') {
										Ext.Ajax.request({
											url : 'setPrefix.action',
											params : {
												PAPER : rec.get('questionid'),
												USERID : rec.get('stuId'),
												PREFIX : '-1'
											},
											method : 'POST',
											success : function(response, opts) {

												var win = new Ext.Window({
													modal : true,
													frame : false,
													maximized : true,
													draggable : true,
													layout : 'fit',
													title : '<center><font size="3" color="#0000cc">'
															+ rec
																	.get('stuScore')
															+ '</font></center>',
													items : [{
														html : '<iframe frameborder="0" width="100%" height="100%" src="Stu_Check.jsp" </iframe>'
													}]
												});
												win.show();

											}
										});
									} else {
										Ext.Msg.show({
													title : '温馨提示',
													msg : '请上传正确文件！',
													icon : Ext.Msg.WARNING
												});
									}

								}
							}

						}
					}]
				}],
		dockedItems : [{
			dock : 'top',
			xtype : 'toolbar',
			items : ['-', {
				xtype : "combo",
				store : new Ext.data.SimpleStore({
							fields : ['text'],
							data : [['题目标题'], ['作答情况'], ['Word题目'],
									['PowerPoint题目'], ['Excel题目']]
						}),
				hiddenName : 'question_storeTerm',// 提交到后台的input的name
				id : 'question_storeTerm',
				name : 'question_storeTerm',
				mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
				displayField : 'text', // 显示字段
				emptyText : '请选择查询条件', // 提示信息
				mode : 'local', // 数据加载模式，local代表本地数据
				triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
				readOnly : false, // 只读，为true时不能编辑不能点击
				editable : false,

				listeners : {
					change : {
						fn : function() {
							Ext.getCmp('question_storeSearch').setValue('');

							var termTemp = Ext.getCmp('question_storeTerm')
									.getValue();
							if (termTemp == 'Word题目'
									|| termTemp == 'PowerPoint题目'
									|| termTemp == 'Excel题目') {
								Ext.getCmp('question_storeSearch')
										.setFieldLabel('题目标题');
							} else {
								Ext.getCmp('question_storeSearch')
										.setFieldLabel('');
							}
							question_store.load();
						}

					}
				}
			}, {
				labelAlign : 'right',
				labelWidth : 60,
				xtype : "textfield",
				emptyText : '请输入查询值',
				name : "question_storeSearch",
				id : "question_storeSearch"
			}, {
				xtype : "button",
				text : "搜索",
				icon : "images/search.png",
				handler : function() {
					question_store.load();
				}
			}, '-']
		}],
		viewConfig : {
			stripeRows : true,
			disableSelection : false,
			frame : true
		}
	})
	showquestion.setWidth(520);

	var window = Ext.create('Ext.Window', {
				closable : true,
				layout : 'border',
				title : '选择试卷',
				width : 800,
				maximizable : true,
				height : document.body.clientHeight - 50,
				modal : true, // 模态对话框 ， 打开这个对话框后，后面的东西不能处理
				plain : true,
				items : [showquestion]
			});
	window.show();
}

// 考生考试 题目的 函数
function see_student(paperid, studentid, isanswer, student_store, EndTime) {
	var nowtime2 = Ext.Date.format(new Date(), 'H:i:s') ;
	var time =  timeDiffer(nowtime2,EndTime) * 1000;

	var runner = new Ext.util.TaskRunner();

	var task = runner.newTask({ // Ext的定时器，每隔2秒刷新store。
		run : function() {
			 task.stop();
			Ext.Ajax.request({
						url : "finish.action",
						params : {
							paperid : paperid
						},
						success : function() {
							Ext.Msg.show({
										title : '恭喜你',
										msg : '提交试卷成功'
									});
							student_store.load();
							window.close();

						},
						failure : function() {
							Ext.Msg.show({
										title : '错误',
										msg : '出错了！请联系管理员',
										icon : Ext.Msg.ERROR
									});
						}
					});
		},
		interval : time
		// 2 second
	})
	 task.start();
	Ext.define('MyData', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'id',
							type : 'string'
						}, {
							name : 'paper',
							type : 'string'
						},// 试卷的id
						{
							name : 'questionid',
							type : 'string'
						}, {
							name : 'stuAnswer',
							type : 'string'
						},// 学生答案的文件路径
						{
							name : 'stuId',
							type : 'string'
						},// 学生的id
						{
							name : 'stuScore',
							type : 'string'
						},// 学生的得分
						{
							name : 'stuAnswerName',
							type : 'string'
						},// 学生上传的文件名
						{
							name : 'title',
							type : 'string'
						},// 题目
						{
							name : 'question',
							type : 'string'
						},// 问题
						{
							name : 'type',
							type : 'string'
						},// 考试类型
						{
							name : 'condition',
							type : 'string'
						},// 学生作答的状态
						{
							name : 'question_score',
							type : 'string'
						}

				]
			});

	var pageSize = 16;
	// 考生考试题目的数据源
	var question_store = Ext.create('Ext.data.Store', {
				pageSize : pageSize,
				model : 'MyData',
				proxy : {
					type : 'ajax',
					url : 'get_Paper_student.action',
					reader : {
						type : 'json',
						root : 'student_answer_list',
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

	question_store.on('beforeload', function(store, options) {
				var question_storeSearch = Ext.getCmp('question_storeSearch')
						.getValue();
				var question_storeTerm = Ext.getCmp('question_storeTerm')
						.getValue();
				if (question_storeSearch.indexOf("'") != -1) {
					question_storeSearch = question_storeSearch.replace('\'',
							"");
				}
				var new_params = {
					term : encodeURIComponent(question_storeTerm),
					search : encodeURIComponent(question_storeSearch),
					paperid : paperid
				}; // 先提交一个试卷的id
				Ext.apply(store.proxy.extraParams, new_params);

			});

	var qBar_question = new Ext.PagingToolbar({ // 设置分页的工具栏
		store : question_store,
		displayInfo : true, // 是否显示总体信息
		displayMsg : "第 {0}页 -  共 {2}条",
		emptyMsg : "没有符合条件的记录"
	});

	var showquestion = Ext.create('Ext.grid.Panel', {
		// title : '选择题目',
		region : 'center',
		split : true,
		width : 750,
		higth : 600,
		store : question_store,
		bbar : qBar_question,
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
				},
				// { header: '得分' , dataIndex: 'stuScore', flex:3 , sortable:
				// true, menuDisabled:true },
				{
					header : '作答情况',
					dataIndex : 'condition',
					flex : 1,
					sortable : true,
					menuDisabled : true
				},

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
							var rec = grid.getStore().getAt(rowIndex);

							if (isanswer == "未作答") {
								var f = rec.get('stuAnswerName');
								if (f == null || f == "") {
									f = "请上传答案"
								}
								Editquestion(rec.get('id'), rec.get('title'),
										rec.get('type'), rec.get('question'),
										question_store, rec.get('questionid'),
										f);
							} else {

								Editquestion2(rec.get('title'),
										rec.get('type'), rec.get('question'));

							}
						}
					}]
				}],
		dockedItems : [{
			dock : 'top',
			xtype : 'toolbar',
			items : ['-', {
				itemId : 'ButtonAdd',
				text : '提交试卷',
				tooltip : '提交试卷',
				iconCls : 'icon-ok',
				handler : function(grid, rowIndex, colIndex) {
					if (isanswer == "未作答") {
						Ext.MessageBox.show({
							title : "提示",
							msg : "是否提交试卷?",
							buttons : Ext.Msg.OKCANCEL,
							icon : Ext.MessageBox.QUESTION,
							fn : function(buttonId) {
								if (buttonId == "ok") {
									Ext.Ajax.request({
												url : "finish.action",
												params : {
													paperid : paperid
												},
												success : function() {
													student_store.load();
													window.close();

												},
												failure : function() {
													Ext.Msg.show({
																title : '错误',
																msg : '出错了！请联系管理员',
																icon : Ext.Msg.ERROR
															});
												}
											});
								}
							}
						});
					} else {
						Ext.Msg.show({
									title : '温馨提示',
									msg : '你已经提交了试卷，不能重复提交',
									icon : Ext.Msg.WARNING
								});
					}
				}
			}, '-', {
				xtype : "combo",
				store : new Ext.data.SimpleStore({
							fields : ['text'],
							data : [['题目标题'], ['作答情况'], ['Word题目'],
									['PowerPoint题目'], ['Excel题目']]
						}),
				hiddenName : 'question_storeTerm',// 提交到后台的input的name
				id : 'question_storeTerm',
				name : 'question_storeTerm',
				mode : 'local',// 数据加载模式，'local'本地加载，'remote'远程加载
				displayField : 'text', // 显示字段
				emptyText : '请选择查询条件', // 提示信息
				mode : 'local', // 数据加载模式，local代表本地数据
				triggerAction : 'all', // 显示所有下列数据，一定要设置属性triggerAction为a
				readOnly : false, // 只读，为true时不能编辑不能点击
				editable : false,

				listeners : {
					change : {
						fn : function() {
							Ext.getCmp('question_storeSearch').setValue('');

							var termTemp = Ext.getCmp('question_storeTerm')
									.getValue();
							if (termTemp == 'Word题目'
									|| termTemp == 'PowerPoint题目'
									|| termTemp == 'Excel题目') {
								Ext.getCmp('question_storeSearch')
										.setFieldLabel('题目标题');
							} else {
								Ext.getCmp('question_storeSearch')
										.setFieldLabel('');
							}
							question_store.load();
						}

					}
				}
			}, {
				labelAlign : 'right',
				labelWidth : 60,
				xtype : "textfield",
				emptyText : '请输入查询值',
				name : "question_storeSearch",
				id : "question_storeSearch"
			}, {
				xtype : "button",
				text : "搜索",
				icon : "images/search.png",
				handler : function() {
					question_store.load();
				}
			}, '-']
		}],
		viewConfig : {
			stripeRows : true,
			disableSelection : false,
			frame : true
		}
	})
	// showquestion.setWidth(520);

	/*
	 * var showtime = Ext.create('Ext.grid.Panel', { // title : '选择题目', region :
	 * 'north', width : 750, higth : 5, title : 'north', collapsible : true });
	 */
	var window = Ext.create('Ext.Window', {
				closable : true,
				layout : 'border',
				title : '查看试卷',
				width : 800,
				maximizable : true,
				height : document.body.clientHeight - 50,
				modal : true, // 模态对话框 ， 打开这个对话框后，后面的东西不能处理
				plain : true,
				items : [showquestion]
			});
	window.show();
	window.on('close', function() {
				// 如果没有提交了
			 task.stop();

			});

	/*
	 * var viewport2 = new Ext.Viewport({ id : 'viewport', layout : "border",
	 * items : [window, showtime] });
	 */
}

// id 学生试卷唯一的id
function Editquestion(id, title, type, question, question_store, questionid, f) {
	var fform1 = Ext.create('Ext.form.Panel', {
		baseCls : "x-plain",
		bodyPadding : '20 25 20 25',
		waitMsgTarget : true,
		fieldDefaults : {
			labelAlign : 'right',
			labelWidth : 35,
			msgTarget : 'qtip'
		},
		items : [{
					xtype : 'hiddenfield',// 隐藏提交
					name : 'questionid',
					value : questionid
				}, {
					xtype : 'hiddenfield',// 隐藏提交
					name : 'id',
					value : id
				},
				/*
				 * { xtype: 'hiddenfield',//隐藏提交 name: 'paperid', value: paperid }, {
				 * xtype: 'hiddenfield',//隐藏提交 name: 'studentid', value: paperid }, {
				 * xtype: 'hiddenfield',//隐藏提交 name: 'questionid', value:
				 * questionid },
				 */{/*
					 * readOnly:true, xtype : "textfield", fieldLabel : "题目",
					 * emptyText: '试卷标题', name : "title", id:"title1",
					 * allowBlank : true, blankText:"问卷名字不能为空！", value:title }, {
					 * readOnly:true, xtype : "textfield", fieldLabel : "类型",
					 * emptyText: '题目类型', id : 'type1', name:'type', allowBlank :
					 * true, blankText:"问卷名字不能为空！", value:type }, {
					 *//*
					 * readOnly:true, value:question, labelStyle :
					 * "text-align:right;",//向右对齐 id:'question1',
					 * name:'question', height:180, width:550, preventScrollbar:
					 * true , frame: false, layout: 'fit', fieldLabel: ' 题干',
					 * xtype: 'textfield', enableColors: true, enableAlignments:
					 * true }, {
					 */
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
					layout : 'column',
					width : 600,
					border : false,
					items : [{
								html : '题目：',
								border : false,
								columnWidth : .12,
								// bodyPadding: '6 0 0 5',//'top right bottom left'
								bodyStyle : 'font-weight:bold; font-size:120%'
							}, {
								html : title,
								border : false,
								columnWidth : .88,
								bodyStyle : 'font-size:120%;'
							}],
					bodyStyle : 'padding:7px;'
				}, {
					html : question,
					autoScroll : true,
					border : false,
					height : 375,
					width : 600,
					bodyStyle : 'padding:10px;'
				}, {
					layout : 'column',
					width : 600,
					border : false,
					items : [{
								html : '上传答案',
								border : false,
								columnWidth : .12,
								// bodyPadding: '6 0 0 5',//'top right bottom left'
								bodyStyle : 'padding:4px;'
							}, {
								xtype : 'fileuploadfield',
								// fieldLabel : '答案',
								name : 'answer',
								id : 'answer1',
								emptyText : f,
								allowBlank : true,
								buttonText : '选择文件',
								columnWidth : .88
							}],
					bodyPadding : '10 0 0 0'
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
							text : "上传",
							handler : function() {
								var answer1 = Ext.getCmp('answer1').getValue();
								var type = Ext.getCmp('type1').getValue();
								if (type == 'Word题目')
									type = 'docx';
								else if (type == 'Excel题目')
									type = 'xlsx';
								else if (type == 'PowerPoint题目')
									type = "pptx";
								var arr = answer1.split('.');
								if (answer1 == null || answer1 == "") {
									Ext.Msg.show({
												title : '温馨提示',
												msg : '请上传答案',
												icon : Ext.Msg.WARNING
											});
								} else if (arr[arr.length - 1] != type) {
									Ext.Msg.show({
												title : '温馨提示',
												msg : '请上传扩展名为'+type+'文件',
												icon : Ext.Msg.WARNING
											});
								}

								else {
									fform1.getForm().submit({
												waitMsg : '正在上传......',
												url : "add_student_question.action",
												success : function(fform,
														action) {
													win.close();
													question_store.load();
												},
												failure : function(fform,
														action) {
													Ext.Msg.show({
																title : '错误',
																msg : '请按要求输入相关信息',
																icon : Ext.Msg.ERROR
															});
												}
											})
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
					layout : 'column',
					width : 600,
					border : false,
					items : [{
								html : '题目：',
								border : false,
								columnWidth : .12,
								// bodyPadding: '6 0 0 5',//'top right bottom left'
								bodyStyle : 'font-weight:bold; font-size:120%;'
							}, {
								html : title,
								border : false,
								columnWidth : .88,
								bodyStyle : 'font-size:120%;'
							}],
					bodyStyle : 'padding:7px;'
				}, {
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

//时间差
function timeDiffer(nowtime2,EndTime)
{
	startSplit = nowtime2.split(":"); //分割開始時間
	endSplit = EndTime.split(":"); 
	var timeStart =  startSplit[0]*3600+startSplit[1]*60+startSplit[2]*1;
	var timeEnd =  endSplit[0]*3600+endSplit[1]*60+endSplit[2]*1;
	return timeEnd  - timeStart;
}



