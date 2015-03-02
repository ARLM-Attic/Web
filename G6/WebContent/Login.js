Ext.require([
    'Ext.form.*',
    'Ext.data.*'
]);

	//定义验证码控件
    Ext.define('CheckCode',{
	    extend: 'Ext.form.field.Text', 
	    alias: 'widget.checkcode',
	    inputTyle:'codefield',
	    codeUrl:Ext.BLANK_IMAGE_URL,
	    isLoader:true,
	    onRender:function(ct,position){
	        this.callParent(arguments);
	        this.codeEl = ct.createChild({ tag: 'img', src: Ext.BLANK_IMAGE_URL});
	        this.codeEl.addCls('x-form-code');
	        this.codeEl.on('click', this.loadCodeImg, this);
	        
	        if (this.isLoader) this.loadCodeImg();
	    },
	    alignErrorIcon: function() {
	        this.errorIcon.alignTo(this.codeEl, 'tl-tr', [2, 0]);
	    },
	    //如果浏览器发现url不变，就认为图片没有改变，就会使用缓存中的图片，而不是重新向服务器请求，所以需要加一个参数，改变url
	    loadCodeImg: function() {
	        this.codeEl.set({ src: this.codeUrl + '?id=' + Math.random() });
	    }
	});

Ext.onReady(function(){
	
	var checkcode = Ext.create('CheckCode',{
				 	cls : 'key',
		            fieldLabel : '验证码',
		            name : 'CheckCode',
		            id : 'CheckCode',
		            allowBlank : false,
		            isLoader:true,
		            blankText : '验证码不能为空',
		            emptyText: '输入验证码',
		            codeUrl: 'getCode',
		            width : 178,
		            listeners : {
	                  change: function(){
	                  		if(this.isValid()) loginCheckCode=true;
	                  		 else  loginCheckCode=false;
	                  		if(loginId&&loginPsd&&loginCheckCode)
	                  		 Ext.getCmp('login').setDisabled(false);
	                  	     else Ext.getCmp('login').setDisabled(true); }
	                 }
		        });

	var regisId=false;    //校验注册信息
    var regisName=false;
    var regisPsd=false;
    
    var  loginId=false;    //校验登录信息
    var  loginPsd=false;
    var  loginCheckCode=false;
    
    Ext.Msg.msgButtons[0].setText("确定");//OK  
    Ext.Msg.msgButtons[1].setText("是");//YES  
    Ext.Msg.msgButtons[2].setText("否");//NO  
    Ext.Msg.msgButtons[3].setText("取消");//CANCEL 
    
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

    var formPanel = Ext.create('Ext.form.Panel', {
    	//bodyStyle:"background-image:url('images/body.jpg')",
    	//x:390,
    	//y:300,
    	renderTo: 'form',
        frame: true,
    	plain: true,
        title:'注册登录',
        //baseCls : 'ex-panel',//设置透明FORM 嵌入页面
        width: 300,
        height: 220,
        bodyPadding: '40 0 0 0',
        waitMsgTarget: true,
        buttonAlign:"center",

        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 65,
            labelSeparator:'<font color="blue">  </font>'
        },

       defaultType: 'textfield',
items: [{
    xtype: "textfield",
    fieldLabel: '帐&nbsp;&nbsp;&nbsp;号:',
    height : 25,
    width : 250,
    //margins:'30 30 30 30',
   // bodyStyle:'padding:30 30 30 30',
    emptyText: '请输入帐号',
    allowBlank : false,
	    blankText:"账号不能为空！",
    name: 'id',
    id:'id',
    regex:/^\d*$/,
	    regexText:'账号为纯数字',
    enableKeyEvents:true,
    listeners : {
    	blur:   function(){if(this.isValid()&& Ext.getCmp('password').isValid()) Ext.getCmp('login').setDisabled(false);
    	                      else Ext.getCmp('login').setDisabled(true); }}
}, {
	inputType : "password",
    fieldLabel: '密&nbsp;&nbsp;&nbsp;码:',
    height : 25,
    margins: 50,
    width : 250,
    emptyText: '请输入密码',
    name: 'password',
    id:'password',
    allowBlank : false,
	    blankText:"密码不能为空！",
	    regex: /^[A-Za-z0-9]+$/,
	    regexText : "密码只能为字母和数字",
	    listeners : {
  	   change:   function(){if(this.isValid()&& Ext.getCmp('id').isValid()) Ext.getCmp('login').setDisabled(false);
  	                      else Ext.getCmp('login').setDisabled(true); }}
	}],

        buttons: [{
            text: '注册',
            handler: function(){
            		formPanel.close();
            	    CreatRePanel(regisId,regisName,regisPsd,formPanel);
            }
        }, {
            text: '登录',
            handler: function(){
            	formPanel.getForm().submit({
                    url: 'Login.action',
                    submitEmptyText: false,
                    waitMsg: '正在登录...',
                success : function(formPanel,action) {
                	        if(action.result.message=="教师")
                	        	    document.location = "Menu_teacher.jsp";
                	        else if(action.result.message=="学生")
            	        	    document.location = "Menu_student.jsp";
                	        else document.location = "Menu_manager.html";
                		    },
                failure : function(formPanel,action) {
                	Ext.MessageBox.show({
                        title:"提示",
                        closable:false,
                        msg:action.result.message,
                    	buttons:Ext.Msg.OK,
                    	closable:false,
                    	icon: Ext.MessageBox.WARNING,
                    	fn:function(buttonId){
                    		if(buttonId=="ok")
                    			document.location ="Login.html";
                    	}
    				 	});
                	}
                });
            },
            id:'login',
            disabled: true
        }]
    });
});

function CreatRePanel(regisId,regisName,regisPsd,formPanel)
{  
	Ext.form.Field.prototype.msgTarget = "qtip";

	var Re = Ext.create('Ext.form.Panel',{
	//x:390,
    //y:300,
    renderTo : "fform",
	title : "用户注册",
	buttonAlign:"center",
	frame: true,
	id:"Re",
    width: 330,
    height: 255,
    bodyPadding: '10 20 30 30',
    waitMsgTarget: true,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 60
        //labelSeparator:' ',
    },
    items : [
              {  xtype : "textfield",
               height : 30,
               width : 235,
               fieldLabel : "用户帐号 ",
               emptyText: '请输入帐号',
               name : "id",
			   enableKeyEvents:true,
			   allowBlank : false,
			   blankText:"账号不能为空!",
			   regex:/^\d*$/,
			   regexText:'账号为纯数字',
			   /*minLength:6,     
               minLengthText:'密码的长度为[6-20]',     
               maxLength:20,     
               maxLengthText:'密码的长度为[6-20]', */
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
				fieldLabel : "用户姓名 ",
			    emptyText: '请输入用户名',
				name : "username",
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
				 fieldLabel : "登录密码 ",
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
                  fieldLabel : "重复密码 ",
                  emptyText: '再次输入密码',
                  name : 'confirmPwd',
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
                  
                {
              		id:'fType',
              		xtype: 'radiogroup',
              		fieldLabel: '登陆权限 ',
              		items: [
              			{boxLabel:'学生', name:'ident', inputValue: "学生", checked: true},
              			{boxLabel:'教师', name:'ident', inputValue: "教师"},
                        {boxLabel:'管理员', name:'ident', inputValue: "管理员"}
              		]
              	}
			],
					
			buttons:[{text : "提交",
				id:'regis',
				disabled: true,
				handler:function(){
			    	Re.getForm().submit({
					waitMsg:'正在提交......',
					url : "registered.action",            
					success : function(Re,action) { 
						Ext.MessageBox.show({
	                		title:"提示",
	                		msg:action.result.message,
	                		buttons:Ext.Msg.OK,
	                		closable:false,
	                		icon: Ext.MessageBox.INFO,
	                		fn:function(buttonId)
	                		    {if(buttonId=="ok")
	                		    	{document.location = "Login.html";}
	                		    }
	                		});
                    },failure : function(Re,action) {
                    	Ext.MessageBox.show({
	                		title:"提示",
	                		msg:action.result.message,
	                		buttons:Ext.Msg.OK,
	                		icon: Ext.MessageBox.ERROR,
	                		closable:false
	                		/*fn:function(buttonId)
                		    {if(buttonId=="ok")
                		    	{document.location = "Login.html";}
                		    }*/
	                		});
                        }
			    	});
				}
           },{
        	   text : "取消",
        	   handler:function(){
        	       Re.close();
        	       document.location = "Login.html";
        	   }
           }]
       });
	} 
