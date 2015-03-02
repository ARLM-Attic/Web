Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux', 'Ext4.2/examples/ux');
Ext.require(['Ext.*']);

Ext.onReady(function() {

	Ext.QuickTips.init();

	Ext.Msg.msgButtons[0].setText("确定");// OK
	Ext.Msg.msgButtons[1].setText("是");// YES
	Ext.Msg.msgButtons[2].setText("否");// NO
	Ext.Msg.msgButtons[3].setText("取消");// CANCEL

	var n = 0;

	function add(n) {
		if (n == 2) {
			var temptab = tab.child("#quest");
			if (!temptab) {
				var temptab = tab.add({
							id : 'quest',
							title : "题库管理",
							closable : false,
							autoDestroy : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [question]
						});
				tab.doLayout();
				tab.setActiveTab(temptab);
			} else {
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		} else if (n == 3) {
			var temptab = tab.child("#paper_manager");
			if (!temptab) {
				var temptab = tab.add({
							id : 'paper_manager',
							title : "试卷管理",
							autoDestroy : false,
							closable : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [paperlist]
						});
				tab.doLayout();
				tab.setActiveTab(temptab);
			} else {
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		} else if (n == 4) {
			student_store.load();
			var temptab = tab.child("#stuScore");
			if (!temptab) {

				var temptab = tab.add({
							id : 'stuScore',
							title : "查看学生分数",
							autoDestroy : false,
							closable : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [student_Score]
						});
				tab.doLayout();
				tab.setActiveTab(temptab);
			} else {
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		}
	}

	var title = Ext.create('Ext.toolbar.Toolbar', {
		region : 'north',
		items : [
				'<center><b><b><b><font size="4" color="#0000cc">考试系统</font></b></center>',
				'-',
				'<font size="2" color="#0099ff">当前老师：' + name + '</font>',
				'-',
				// '<font color="#0000ff">当前日期: '+ Ext.Date.format(new
				// Date(),'Y年m月d日 ') +'</font>',
				/*
				 * , { xtype : 'component', autoEl : { tag : 'img', src :
				 * 'images/clock-icon.png' } },
				 */{
					id : 'systemTime',
					xtype : 'label',
					style : {
						color : "#0000ff"
					},

					text : 'My Label'
				}, '->', {
					text : '退出',
					tooltip : '退出管理系统',
					iconCls : 'icon-logout',
					handler : function() {
						Ext.MessageBox.show({
									title : "提示",
									msg : "是否退出考试系统?",
									buttons : Ext.Msg.OKCANCEL,
									icon : Ext.MessageBox.QUESTION,
									fn : function(buttonId) {
										if (buttonId == "ok") {
											var tmp = Math.ceil(Math.random()*35);
											window.location.href = "logOut.action?tmp="+tmp;//tmp没用，只是为了防止浏览器缓存导致不调用sessionClear()
										} else {
											return false;
										}
									}
								});
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
						})]
	});

	Ext.create('Ext.container.Viewport', {
				renderTo : Ext.getBody(),
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
										text : '题库管理',
										frame : false,
										border : false,
										handler : function() {
											add(2);
										}
									}, {
										xtype : 'button',
										text : '试卷管理',
										frame : false,
										border : false,
										handler : function() {
											add(3);
										}
									}, {
										xtype : 'button',
										text : '查看学生分数',
										frame : false,
										border : false,
										handler : function() {
											add(4);
										}
									}
							/*
							 * { iconCls : 'icon-collapse-all', title: '管理',
							 * xtype: 'panel', layout: { type:'vbox',
							 * padding:'3', align:'stretch'
							 * },defaults:{margins:'0 0 3 0'}, items:[ { tbar: [{
							 * text : '题库管理', flex: 1, handler:function(){
							 * add(2); } }], border:false }, { tbar: [{
							 * 
							 * text : '试卷管理', flex: 1, handler:function(){
							 * add(3); } }], border:false }, { tbar: [{
							 * 
							 * text : '查看学生分数', flex: 1, handler:function(){
							 * add(4); } }], border:false }] }
							 */]
						}]
			});
});