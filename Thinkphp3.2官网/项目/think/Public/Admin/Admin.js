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

	function add(n) 
	{
		if (n == 2)
		 {
			var temptab =Ext.getCmp('questk');
			if (!temptab) {
				var temptab = tab.add({
							id : 'questk',
							title : "首页推荐图",
							closable : false,
							autoDestroy : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [mangrid]
						});
				tab.doLayout();
				tab.setActiveTab(temptab);
			} else {
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		}
		if (n ==3)
		 {
			//var temptab1 = tab.child("#content123k");
			var temptab1 = Ext.getCmp("content123k");
			if (!temptab1) {
				var temptab1 = tab.add({
							id : 'content123k',
							title : "内容管理",
							closable : false,
							autoDestroy : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [contentgrid]
						});
				tab.doLayout();
				tab.setActiveTab(temptab1);
			} else {
				temptab1.tab.show();
				tab.setActiveTab(temptab1);
			}
		}
		if (n ==4)
		 {
			//var temptab1 = tab.child("#content123k");
			var temptab1 = Ext.getCmp("news");
			if (!temptab1) {
				var temptab1 = tab.add({
							id : 'news',
							title : "首页新闻",
							closable : false,
							autoDestroy : false,
							closeText : '隐藏',
							closeAction : 'hide',
							layout : "fit",
							items : [newsgrid]
						});
				tab.doLayout();
				tab.setActiveTab(temptab1);
			} else {
				temptab1.tab.show();
				tab.setActiveTab(temptab1);
			}
		}
            
	}
//-------------------------------
/*function  Editpsd()
{
    var fformnew = Ext.create('Ext.form.Panel',{
    baseCls:"x-plain",
    bodyPadding: '20 30 20 20',
    waitMsgTarget: true,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 50,
        msgTarget: 'qtip'
    },
    items : [
	    {
                    xtype : "textfield",
	    	fieldLabel : "新密码",
	    	emptyText: '请输入新密码',
	    	id:'psd',
	    	width : 350,

	    	allowBlank : false,
	    	blankText:"密码不能为空！"
	    },
	    
	    {
                        xtype : "textfield",
	    	fieldLabel : "新密码",
	    	emptyText: '请输入新密码',
	    	width :350,
	    	id:'psd1',
	    	allowBlank : false,
	    	blankText:"密码不能为空！"
	    }
    
    
               ],
            	buttons :
		[{
			
			text:"确定",
			handler:function(){
				var psd=Ext.getCmp('psd').getValue();
				var psd1=Ext.getCmp('psd1').getValue();
				if(!psd||!psd1)
				{
					Ext.Msg.alert('系统提示',"请填写完整新密码");
					return false;
				}
			
				if(psd!=psd1)
				{
					Ext.Msg.alert('系统提示',"输入的密码不一致");
					return false;
				}
				Ext.Ajax.request({

							url:'/think/index.php/Admin/Content/edit',//获取点击的序号
							params:{
							
								psd:psd
									    			
							 },
							method : 'POST',
							timeout : 2000,
							success : function(form, action) {
									Ext.example.msg('<font color="#0000ff">温馨提示</font>','修改成功！');

									
							}
						});
				
			}

		
		},{
				text : "取消",
				handler:function(){
					win.close();
				}
			}
		]
    });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"修改首页新闻",
		items:[fformnew],
		buttonAlign:"center",
		
		});
	win.show();
}*/
	//-------------------------------
	



	var title = Ext.create('Ext.toolbar.Toolbar', {
		region : 'north',
		items : [
				'<center><b><b><b><font size="4" color="#0000cc">飞磨官网后台管理</font></b></center>',
				'-',
				'<font size="2" color="#0099ff">当前身份：管理员</font>',
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
				}, '->'/*,{
					text : '修改密码',
					tooltip : '修改登入密码',
					iconCls : 'icon-logout',
					handler : function() {
						Editpsd();
					}
				}*/,{
					text : '退出',
					tooltip : '退出管理系统',
					iconCls : 'icon-logout',
					handler : function() {
						Ext.MessageBox.show({
									title : "提示",
									msg : "是否退出后台?",
									buttons : Ext.Msg.OKCANCEL,
									icon : Ext.MessageBox.QUESTION,
									fn : function(buttonId) {
										if (buttonId == "ok") {
											var tmp = Math.ceil(Math.random()*35);
											window.location.href = "/think/index.php/Admin/Index/index.html";
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
					html : '<img width="100%" height="100%" src="'+name+'"/>',
					autoScroll : true,
					closable : false
				}],

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
										text : '首页推荐图',
										frame : false,
										border : false,
										handler : function() {
											add(2);
										}
									}, {
										xtype : 'button',
										text : '内容管理',
										frame : false,
										border : false,
										handler : function() {
											add(3);
										}
									},
									{
										xtype : 'button',
										text : '首页新闻',
										frame : false,
										border : false,
										handler : function() {
											add(4);
										}
									}
							]
						}]
			});
});