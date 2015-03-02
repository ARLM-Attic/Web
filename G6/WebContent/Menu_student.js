Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux', 'ExtJs/examples/ux');
Ext.require(['Ext.*']);

Ext.onReady(function() {

	Ext.QuickTips.init();

	Ext.Msg.msgButtons[0].setText("确定");// OK
	Ext.Msg.msgButtons[1].setText("是");// YES
	Ext.Msg.msgButtons[2].setText("否");// NO
	Ext.Msg.msgButtons[3].setText("取消");// CANCEL

	var n = 0;

	function add(n) {
		if (n == 0) {
			var temptab = tab.child("#student_paper");
			if (!temptab) {
				var temptab = tab.add({
							id : 'student_paper',
							title : "试卷列表",
							closable : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [student_paper]
						});
				tab.doLayout();
				tab.setActiveTab(temptab);
			} else {
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		} else {
			var temptab = tab.child("#paper");
			if (!temptab) {
				var temptab = tab.add({
							id : 'paper',
							title : "试卷列表",
							closable : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [uploadStudent]
						});
				tab.doLayout();
				tab.setActiveTab(temptab);
			} else {
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		}
	}

	var theme = Ext.create("Ext.menu.Menu", {
				items : [{
					text : '极致酷黑',
					handler : function() {
						Ext.util.CSS.swapStyleSheet("theme",
								"ExtJs/resources/css/ext-all-access.css");
					}
				}, {
					text : '灰色地带',
					handler : function() {
						Ext.util.CSS.swapStyleSheet("theme",
								"ExtJs/resources/css/ext-all-gray.css");
					}
				}, {
					text : '蓝色淡雅',
					handler : function() {
						Ext.util.CSS.swapStyleSheet("theme",
								"ExtJs/resources/css/ext-all-scoped.css");
					}
				}]
			});

	var title = Ext.create('Ext.toolbar.Toolbar', {
		region : 'north',
		items : [
				'<center><b><b><b><font size="4" color="#0000cc">考试系统</font></b></center>',
				'-',
				'<font size="2" color="#0099ff">当前学生：' + name + '</font>',
				'-',
				/*
				 * { iconCls : 'icon-user', text : '登录者' },
				 */ {
					id : 'systemTime',
					xtype : 'label',
					style : {
						color : "#0000ff"
					},

					text : 'My Label'
				}, '->'/*
						 * ,{ text : '主题', tooltip:'更换主题', iconCls :
						 * 'icon-grant', menu : theme , }
						 */, {
					text : '退出',
					//tooltip : '退出管理系统',
					iconCls : 'icon-logout',
					handler : function() {
						Ext.MessageBox.confirm('提示', '是否确定退出系统？', onQuery);
						function onQuery(btn) {
							if (btn == 'yes') {
								var tmp = Math.ceil(Math.random()*35);
								window.location.href = "logOut.action?tmp="+tmp;//tmp没用，只是为了防止浏览器缓存导致不调用sessionClear()
							} else {
								return false;
							}
						}
						/*
						 * Ext.MessageBox.show({ title:"提示", msg:"是否退出考试系统?",
						 * buttons:Ext.Msg.OKCANCEL, icon:
						 * Ext.MessageBox.QUESTION, fn:function(buttonId){
						 * if(buttonId=="ok") { window.location = "Login.html";
						 * }else{ return false; } } });
						 */
					}
				}],
		frame : true
	});

	var t = {

		run : function() {
			Ext.getCmp('systemTime').setText('当前时间 : '
					+ Ext.util.Format.date(new Date(), 'Y-m-d G:i:s D'));

		},
		interval : 1000
	};
	Ext.TaskManager.start(t);

	var under = Ext.create("Ext.panel.Panel", {
				region : 'south',
				collapsible : false,
				bbar : ['->', '欢迎使用']
			});

	var tab = Ext.create("Ext.tab.Panel", {
		id : "mainTab",
		activeTab : 0,
		autoDestroy : false,
		enableTabScroll : true,
		animScroll : false,
		border : true,
		autoScroll : false,
		region : 'center',
		layout : 'fit',
		split : true,
		deferredRender : false,
		items : [{
					layout : 'fit',
					title : '首页',
					html : '<img width="100%" height="100%" src="images/bg1.jpg"/>',
					autoScroll : true,
					closable : false
				}],
		plugins : [Ext.create('Ext.ux.TabReorderer'),
				Ext.create('Ext.ux.TabCloseMenu', {
							closeTabText : '隐藏面板',
							closeOthersTabsText : '隐藏其他',
							closeAllTabsText : '隐藏所有'
						})],
		listeners : {
			beforeremove : function(tp, c) {
				// Ext.example.msg('温馨提示','关闭了！');
			}
		}
	});

	Ext.create('Ext.container.Viewport', {
				layout : 'border',
				items : [title, under, tab, {
							region : 'west',
							collapsible : true,
							split : true,
							id : 'MainMenu',
							title : '功能导航',
							width : 150,
							layout : {
								type : 'vbox',
								padding : '3',
								align : 'stretch'
							},
							defaults : {
								margins : '5 0 10 0'
							},
							items : [{
										xtype : 'button',
										text : '试卷列表',
										frame : false,
										border : false,
										handler : function() {
											add(0);
										}
									}
							/*
							 * { iconCls : 'icon-collapse-all', title: '试卷管理',
							 * xtype: 'panel', layout: { type:'vbox',
							 * padding:'3', align:'stretch'
							 * },defaults:{margins:'0 0 3 0'}, items:[ { tbar: [{
							 * text : '试卷列表', flex: 1, handler:function(){
							 * add(0); } }], border:false }] }
							 */]
						}]
			});
});
