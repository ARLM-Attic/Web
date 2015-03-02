Ext.Loader.setConfig({enabled: true}); 
Ext.Loader.setPath('Ext.ux', 'ExtJs/examples/ux'); 
Ext.require([ 
    'Ext.*'
]); 

Ext.onReady(function () {
	
	Ext.QuickTips.init();

	Ext.Msg.msgButtons[0].setText("确定");//OK  
    Ext.Msg.msgButtons[1].setText("是");//YES  
    Ext.Msg.msgButtons[2].setText("否");//NO  
    Ext.Msg.msgButtons[3].setText("取消");//CANCEL 

	var n = 0 ;
	
	function add(n){
		if(n==0){
			var temptab = tab.child("#list");
			if(!temptab){
				var temptab = tab.add({
					id : 'list',
					title : "人员列表", 
					closable : true,
					closeText : '隐藏',
					closeAction : 'hide',
					layout : "fit",
					items:[grid]
				});
				tab.doLayout();
				tab.setActiveTab(temptab);
			}else{
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		}
		if(n==1){
			var temptab = tab.child("#analysis");
			if(!temptab){
				var temptab = tab.add({
					id : 'analysis',
					title : "解析数据", 
					closable : true,
					closeText : '隐藏',
					closeAction : 'hide',
					layout : "fit",
					items:[gridPanel]
				});
				tab.doLayout();
				tab.setActiveTab(temptab);
			}else{
				temptab.tab.show();
				tab.setActiveTab(temptab);
			}
		}
	}

	var theme = Ext.create("Ext.menu.Menu", {
                items:[  
                    {text:'极致酷黑',handler:function(){ Ext.util.CSS.swapStyleSheet("theme", "ExtJs/resources/css/ext-all-access.css"); }},  
                    {text:'灰色地带',handler:function(){ Ext.util.CSS.swapStyleSheet("theme", "ExtJs/resources/css/ext-all-gray.css"); }},    
                    {text:'蓝色淡雅',handler:function(){ Ext.util.CSS.swapStyleSheet("theme", "ExtJs/resources/css/ext-all-scoped.css"); }},
                ]  
             });  
	
	
	var title = Ext.create('Ext.toolbar.Toolbar', {	
		region : 'north',
		items : [
		 '<center><b><b><b><font size="4" color="#0000cc">考试系统</font></b></center>',
		 '<font size="2" color="#0099ff">登录身份：管理员</font>',
		  /*{
			iconCls : 'icon-user',
			text : '登录者'
		},*/'-',{
			text : Ext.Date.format(new Date(),'Y年m月d日') //  H时i分s秒
		},'->'/*,{
			text : '主题',
			tooltip:'更换主题',  
			iconCls : 'icon-grant',
			menu : theme ,
		}*/,{
			text : '退出',
			tooltip:'退出管理系统',  
			iconCls : 'icon-logout',
			handler:function(){
				Ext.MessageBox.show({
                    title:"提示",
                    msg:"是否退出考试系统?",
                	buttons:Ext.Msg.OKCANCEL,
                	icon: Ext.MessageBox.QUESTION,
                	fn:function(buttonId){
                		if(buttonId=="ok") {
                			window.location = "Login.html"; 
						}else{
							return false;
						}
                	}
				});
			}
		}],
		frame : true 
	});

	var under = Ext.create("Ext.panel.Panel", {
		region: 'south',
	    collapsible: false,
	    bbar : ['->','欢迎使用']
	});
	
	var tab = Ext.create("Ext.tab.Panel", {
						id: "mainTab",
						activeTab : 0,
						autoDestroy: false,
						enableTabScroll : true,
						animScroll : false,
						border : true,
						autoScroll : false,
						region : 'center',
						layout : 'fit',
						split : true,
						deferredRender: false,
						items : [{
							layout:'fit',
						    title:'首页',
						    html : '<iframe frameborder="0" width="100%" height="100%" src="BG.html"</iframe>',
						    autoScroll:true,
						    closable:false
						}],
						plugins: [Ext.create('Ext.ux.TabReorderer'),
		        		    Ext.create('Ext.ux.TabCloseMenu',{
		        		  	closeTabText: '隐藏面板',
		        		  	closeOthersTabsText: '隐藏其他',
		        		  	closeAllTabsText: '隐藏所有'
		        		})],
						listeners:{ beforeremove : function(tp,c) {
								//Ext.example.msg('温馨提示','关闭了！');
							}
						}
					});

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [
        	title,under,tab,
        	{
	            region: 'west',
	            collapsible: true,
	            split: true,
	            id: 'MainMenu',
	            title: '功能导航',
	            width: 150,
	            layout: 'accordion',
	            items: [
	                {
	                	iconCls : 'icon-user-set',
		                title: '用户管理',
		                xtype: 'panel',
		                layout: {
	                    	type:'vbox',
	                    	padding:'3',
	                    	align:'stretch'
	                	},defaults:{margins:'0 0 3 0'},
	                    items:[{
	                    	tbar: [{
	                    	     text : '用户列表',
	                    	     flex: 1,
	                    	     handler:function(){ add(0); }
	                    	}]
	                    },]
	                },
	            ]
	        }
        ]
    });
});
