Ext.onReady(function(){ 
	
	Ext.QuickTips.init();

	Ext.Msg.msgButtons[0].setText("确定");//OK  
    Ext.Msg.msgButtons[1].setText("是");//YES  
    Ext.Msg.msgButtons[2].setText("否");//NO  
    Ext.Msg.msgButtons[3].setText("取消");//CANCEL 
    
	var regisId=false;     //注册校验参数
    var regisName=false;
    var regisPsd=false;
	
    var index=0;     //查询参数
    var found=false;
    
    Ext.define('MyData',{ 
        extend: 'Ext.data.Model', 
        fields: [ 
                 {name : 'ID',type : 'Integer'}, 
                 {name : 'NAME',type : 'String'},
                 {name : 'PASSWORD',type : 'String'},
                 {name : 'IDENT',type : 'String'},
                ]
    }); 
    
    var store = Ext.create('Ext.data.Store', {
    	//pageSize: 20, //
        model: 'MyData',
        proxy: { 
            type: 'ajax', 
            url: 'List.action',
            reader: {
                type: 'json', 
                root: 'students' 
                //totalProperty: 'length'
            }
        },
        autoLoad: true,
        sorters: ["ID"]
    }); 
		
    Ext.apply(Ext.form.VTypes, {
        password : function(val, field) {
            if (field.initialPassField) {
                var pwd = Ext.getCmp(field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },
        passwordText : '两次输入的密码不一致!'
    });
    
    Ext.form.Field.prototype.msgTarget = "qtip";

    var sm = Ext.create('Ext.selection.CheckboxModel');

	var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
	        clicksToEdit: 2
	    });

	var sm = Ext.create('Ext.selection.CheckboxModel');
	
   grid = Ext.create('Ext.grid.Panel',{ 
        store: store,
        selModel: sm,
        columns : [ {
			header : '账号',
			dataIndex : 'ID',
			menuDisabled:true,
			flex:1
		   // editor: { xtype: 'numberfield', allowBlank: false, minValue: 1} 
		}, {
			header : '姓名',
			dataIndex : 'NAME',
			flex:1,
			menuDisabled:true,
			editor: {allowBlank: false}
		}, {
			header : '密码',
			dataIndex : 'PASSWORD',
			flex:1,
			menuDisabled:true,
			renderer : function(value) {return "******";},
			editor: {regex: /^[A-Za-z0-9]+$/,regexText : "密码只能为字母和数字",allowBlank: false}
		}, {
			header : '身份',
			dataIndex : 'IDENT',
			flex:1,
			menuDisabled:true,
			editor : {
				xtype : 'combobox',
				editable : false,
				allowBlank : false,
				typeAhead : true,
				triggerAction : 'all',
				emptyText : '请选择',
				blankText : '请选择2',
				selectOnTab : true,
				store : [ [ '学生', '学生' ], [ '教师', '教师' ], [ '管理员', '管理员' ], ],
				lazyRender : true,
				listClass : 'x-combo-list-small'
			}
		},],
	    disableSelection: false,
	    frame: false, 
	    loadMask: true, 
	    dockedItems: [{
            dock: 'top', 
            xtype: 'toolbar', 
            items: [
            '-',{ 
		        itemId: 'ButtonAdd',
		        text:'增加用户', 
		        tooltip:'增加用户',  
		        iconCls: 'icon-add', 
		        handler:function(){ 
		        	CreatRePanel(store,regisId,regisName,regisPsd);
		            }
		    	},'-',{ 
			        itemId: 'ButtonDelete', 
			        text:'删除用户', 
			        tooltip:'删除用户',  
			        iconCls:'icon-del',
			        handler:function(){ 
			        	var sels = grid.getSelectionModel().getSelection();
			        	if(sels.length>0)
			           {
			        	Ext.MessageBox.show({
		                    title:"提示",
		                    msg:"是否删除"+sels.length+"位用户?",
		                	buttons:Ext.Msg.OKCANCEL,
		                	fn:function(buttonId){
		                		if(buttonId=="ok") {
		                	       for (var i = 0; i < sels.length; i++) {
							       Ext.Ajax.request({
								   url : "Delete.action",
								   params : {id: sels[i].get("ID")}
								  });
							       store.remove(sels[i]);}
						Ext.example.msg('<font color="#0000ff">温馨提示</font>','删除成功！');
			           };}});}   
			        	else {Ext.example.msg('<font color="#ff9900">警告</font>','请选择删除人员！');}
			        }
			    	},'-',{ 
		        itemId: 'ButtonRefresh', 
		        text:'刷新', 
		        tooltip:'刷新页面',  
		        iconCls:'icon-refresh', 
		        handler:function(){ 
            		store.load();
		            }
		    	},'-',{
					xtype : 'combobox',
					id:"SearchType",
					fieldLabel : "查询",
					labelAlign: 'right',
		            labelWidth: 30,
					width : 90,
					editable : false,
					typeAhead : true,
					triggerAction : 'all',
					selectOnTab : true,
					store : [ [ 'ID', '账号' ], [ 'NAME', '姓名' ], [ 'IDENT', '身份' ], ],
					lazyRender : true,
					listClass : 'x-combo-list-small',
					value: 'ID',
					 listeners: {
						 //load: function(){this.getSelectionModel().select(0);},
			            change: function() {
			                	index=0;
			                	found=false;
			                	Ext.getCmp('SearchValue').setValue("");
			                }}
				},{xtype : "textfield",
	    		   id:"SearchValue",
	               height : 20,
	               width : 100,
	               emptyText: '请输入查询信息',
	               listeners : {
	            	   change:function(){
	            		      index=0;
	            		      grid.getSelectionModel().select(-1);
	            		      found=false;}
				  }
		    },{ 
		        itemId: 'ButtonSearch', 
		        text:'确定', 
		        tooltip:'查询',  
		        iconCls:'icon-search', 
		        handler:function(){ 
		        	var SearchValue=Ext.getCmp('SearchValue').getValue();
		        	var SearchType=Ext.getCmp('SearchType').getValue();
		        	if(Ext.getCmp('SearchValue').getValue().length>0){
        		    for (;index<store.getCount();index++) 
        				{ 
        				 if(SearchValue==store.getAt(index).get(SearchType))
        					 {
        					   grid.getSelectionModel().select(index);
        					   found=true;
        					   index++;
        					   break;}
        				}
        			if(index==store.getCount()) {
        				if(found==true) {index=0;}
        				else {grid.getSelectionModel().select(-1);index=0;}
        			}}
		        	else Ext.example.msg('<font color="#ff9900">提示</font>','请先输入查询信息!');
            		}
		    		//Ext.getCmp('SearchValue').setValue("");
		    	},{ 
		        itemId: 'ButtonReset', 
		        text:'清空', 
		        tooltip:'清空查询',  
		        iconCls:'icon-reset', 
		        handler:function(){ 
		        	Ext.getCmp('SearchValue').setValue("");
		        	Ext.getCmp('SearchType').setValue('ID');
		        	index=0;
		        	found=false;
		            }
		    	},/*{
		    		xtype:"button",
		    		text:"个人信息",
		    		handler:function(response,options){
		    			Ext.Ajax.request({url:"getSession.action"});
		    			 obj = Ext.decode(response.responseText);
		    			Ext.Msg.alert('提示',obj.id);
		    		}
		    			},*/
		    	'->','温馨提示：修改完数据后会自动保存。'
		]}],
	   plugins: [cellEditing],
	   listeners: {
	   'edit':function(editor, e){
       	Ext.Ajax.request({
				url:"upddate.action",
				params:{
       		    'id':e.record.data.ID,
				'username':e.record.data.NAME,
	        	'password':e.record.data.PASSWORD,
	        	'ident':e.record.data.IDENT
   			},failure:function(action){
   				Ext.Msg.alert('提示','出错了,请重试...');
   			}
			});
   	}}
    });
});

function CreatRePanel(store,regisId,regisName,regisPsd)
{
	var fform = Ext.create('Ext.form.Panel',{
	baseCls:"x-plain",
	width: 300,
    height: 255,
    bodyPadding: '35 20 30 30',
    waitMsgTarget: true,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60,
        msgTarget: 'qtip'
    },
    items : [
              {  xtype : "textfield",
               height : 30,
               width : 235,
               fieldLabel : "用户帐号",
               emptyText: '请输入帐号',
               name : "id",
               id:"id",
               enableKeyEvents:true,
			   allowBlank : false,
			   blankText:"账号不能为空！",
			   regex:/^\d*$/,
			   regexText:'账号为纯数字',
			   listeners : {
			   change : function(){
					   if(this.isValid()) regisId=true;
					   else regisId=false;
					   if(regisId&&regisName&&regisPsd)
					   Ext.getCmp('regis').setDisabled(false);
					    else Ext.getCmp('regis').setDisabled(true); }
				   }
              },
					   
			   {xtype : "textfield",
				height : 30,
				width : 235,
				fieldLabel : "用户姓名",
			    emptyText: '请输入用户名',
				name : "username",
				id:"username",
				blankText : "用户名不能为空",
			    enableKeyEvents:true,
			    allowBlank : false,
			    regex: /^[A-Za-z0-9\u4e00-\u9fa5]+$/i,
			    regexText : "用户名不能包含特殊字符",
			    listeners : {
			    change : function(){
						   if(this.isValid()) regisName=true;
						   else regisName=false;
						   if(regisId&&regisName&&regisPsd)
						   Ext.getCmp('regis').setDisabled(false);
						    else Ext.getCmp('regis').setDisabled(true); }
			           }
              },

			    {xtype : "textfield",
				 height : 30,
				 width : 235,
				 fieldLabel : "登录密码",
			     emptyText: '请输入密码',
				 name : "password",
				 id:'p1',
			     inputType : "password",
				 allowBlank : false,
				 blankText : "密码不能为空",
				 enableKeyEvents:true,
				 regex: /^[A-Za-z0-9]+$/,
				 regexText : "密码只能为字母和数字",
				 listeners : {
				blur : function(){
						   if(this.isValid()&&Ext.getCmp('p2').isValid()) regisPsd=true;
						   else regisPsd=false;
						   if(regisId&&regisName&&regisPsd)
						   Ext.getCmp('regis').setDisabled(false);
						    else Ext.getCmp('regis').setDisabled(true); }
			           }
			     },
				 
				 {xtype : "textfield",
                  height : 30,
                  width : 235,
                  fieldLabel : "重复密码",
                  emptyText: '再次输入密码',
                  name : "password2",
                  id:'p2',
                  inputType : "password",
                  blankText : "密码不能为空",
                  allowBlank : false,
                  enableKeyEvents:true,
			      listeners : {
			          change : function(){
						         if(this.isValid()&&Ext.getCmp('p1').isValid()) regisPsd=true;
						         else regisPsd=false;
						         if(regisId&&regisName&&regisPsd)
						         Ext.getCmp('regis').setDisabled(false);
						         else Ext.getCmp('regis').setDisabled(true); }  
			      },
				  vtype:'password',
				  vtypeText:'两次密码不一致',
				  initialPassField : 'p1'
				  },
                 
                 {id : 'fType',
			      xtype : 'radiogroup',
			      fieldLabel : '登陆权限',
			      items : [ {
			    	         boxLabel : '学生',
				             name : 'ident',
				             inputValue : "学生",
				             checked : true
			                }, {
				             boxLabel : '教师',
				             name : 'ident',
				             inputValue : "教师"
			                }, {
				             boxLabel : '管理员',
				             name : 'ident',
				             inputValue : "管理员"

			                },]
		         }
			]
       });
	
	var win=new Ext.Window({
		modal:true,
		draggable:true,
		title:"添加用户",
		items:[fform],
		buttonAlign:"center",
		buttons:[{
			    id:'regis',
			    disabled: true,
			    text : "提交",
			    handler:function(){
				fform.getForm().submit({
				waitMsg:'正在提交......',
				url : "registered.action",            
				success : function(fform,action) {
					var r = Ext.create('MyData', {
		                ID: Ext.getCmp('id').getValue(),
		                NAME: Ext.getCmp('username').getValue(),
		                PASSWORD:Ext.getCmp('p1').getValue(),
		                IDENT:  Ext.getCmp("fType").getChecked()[0].inputValue
		             });
					win.close();
					store.insert(0, r);
					//store.load();
					Ext.example.msg('<font color="#0000ff">温馨提示</font>',action.result.message);
                },failure : function(fform,action){
                	Ext.example.msg('<font color="#ff0000">错误</font>',action.result.message);
                    }
		    	});
           }
       },{
    	   text : "取消",
    	   handler:function(){
    		   win.close();
    	   }
       }]
		});
	win.show();
	} 