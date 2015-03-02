Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        width:500,
        items: [
           
         {
            region: 'center',
            
            xtype: 'tabpanel', 
            items: [
            
            Qgrid
            ]
        
        }]
    });

   
});

   var pageSize = 4;//每页多少数据

   var gridstore = Ext.create('Ext.data.Store', {
	   storeId:'QsimpsonsStore',
       pageSize: pageSize,//分页。。。
       fields: [
            { name: 'ID', type: 'int' },
            { name: 'NAME', type: 'string' },
            { name: 'IDENT', type: 'string' },
            { name: 'qualify', type: 'bool' },
            { name: 'exam_date', type: 'string' },
            { name: 'nowtime', type: 'string' }
            
           ],//定义字段

        proxy:{  
                type: 'ajax',  
                url:'studentgridAction.action', //请求的数据的url  
                 reader:{  
                          type:'json',  
                          root:'students', //对应action中需要被现实的字段，一般为list  
                          totalProperty: 'total'  
                         }  
               },
        sorters:[{property:"ID",direction:"ASC"}],//按qq倒序
        autoLoad:{params:{start:0,limit:pageSize}}//自动加载
	   
   })
   
   //------------------
   function renderSex(value, cellmeta, record, rowIndex, columnIndex, store)//value当前单元格的值，record是这行的所有数据，store表格里所有的数据
   {
        if(value==false)
        {
            return "<span style='color:red;font-weight:bold;'>无</span>";
        }   
        else
        {
            //return record.get('qualify');
            return "<span style='color:green;font-weight:bold;'>有</span>";
        }         
   }
   

  //----------------
	var Qgrid=Ext.create("Ext.grid.Panel",{
		    title:'学生列表',
	        frame: true,
            rowLines: false,
			columns: [//配置表格列
			     //序号
			    Ext.create("Ext.grid.RowNumberer",{
			    	width: 40,
			    	text:'序号'
			    	
			    }),
			    {header: "学生账号", width: 200, dataIndex: 'ID', sortable: false},//renderer:renderSex可自定义显示
                {header: "学生姓名", width: 200, dataIndex: 'NAME', sortable: false},
                /*{header: "考试资格", width: 200, dataIndex: 'qualify', xtype: 'booleancolumn', sortable: false,
                	trueText: "<span style='color:green;font-weight:bold;'>有</span>",  
                    falseText: "<span style='color:red;font-weight:bold;'>无</span>" //一样效果
                }*/
                {header: "考试资格", width: 200, dataIndex: 'qualify', sortable: false,renderer:renderSex}
            ],
			
			store:gridstore,
			//多选框
			 
			selType:'checkboxmodel',
			multiSelect:true,
			//分页控件
             dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    pageSize : pageSize,//分页....
                    store:gridstore, 
                    dock: 'bottom', //分页 位置
                    emptyMsg: '没有数据',
                    displayInfo: true,
                    displayMsg: '当前显示{0}-{1}条记录 / 共{2}条记录 ',
                    beforePageText: '第',
                    afterPageText: '页/共{0}页'
                }],
		    tbar:[
		      
		 		'-',{
			 	    icon: 'images/add.png',
				    text:"添加资格",
				    type:"submit",
				    handler:function(buttonObj){
				
				    var grid1=buttonObj.ownerCt.ownerCt;
			    	var data=grid1.getSelectionModel().getSelection();
			    	if(data.length==0){
			    		//Ext.example.msg('<font color="#ff9900">警告</font>',"请先选择学生！");
			    		Ext.Msg.show({
								title:'系統提示',
								msg: '请先选择学生！',
								icon: Ext.Msg.WARNING
						});

			    	}
			    	else{
			    		//得到ID的数据
			    		var st=grid1.getStore();
			    		var ids=[];
			    		var name=[];
			    		var exam_data=[];
			    		var nowtime=[];
			    		var k=1;
			    		Ext.Array.each(data,function(record){
			    			if(k==1)
			    			{
			    				exam_data.push(record.get('exam_date'));
			    				nowtime.push(record.get('nowtime'));
			    			}
			    			k++;
			    		});
			    		if(exam_data>nowtime)
			    		{
			    			Ext.Array.each(data,function(record){
				    			if(record.get('qualify')==true)
				    			{
				    				//Ext.example.msg('<font color="#0000ff">温馨提示</font>',""+record.get('NAME')+"重新被授予资格");
				    			    name.push(record.get('NAME'));
				    			}
				    			else
				    			{
				    		        ids.push(record.get('ID'));	
				    			}
				    		});
				    		/*if(name.length>0)
				    		{
				    			Ext.MessageBox.alert("提示框","<br>"+name+"<br><br>已经具有考试资格,无需再授予资格<br>"); 
				    		
				    		}*/
				    		
				    		if(ids.length>0)
				    		{
					    		Ext.Ajax.request({
					    		
					    			url:'qualificationMan.action',
					    			params:{ids:ids.join(",")},//传值到后台,单传2个值到后台时以,分开
					    			method:'POST',
					    			timeout:2000,
					    			success:function(response,opts){
					    				
					    				//Ext.example.msg('<font color="#0000ff">温馨提示</font>','资格授予成功！');
			
					    				Qgrid.store.reload();//重新加载数据
					    			}
					    		})
				    		}
			    		}
			    		else
			    		{
			    			//Ext.example.msg('<font color="#ff9900">警告</font>','考试已经开始或已经结束,不能再授权!');
			    			Ext.Msg.show({
											title:'系統提示',
											msg: '考试已经开始或已经结束,不能再授权!',
											icon: Ext.Msg.ERROR
									});
			    		}
			    		
			    		
			    		}
			        }
		 		},'-',
		 		{
			 	    icon: 'images/delete.png',
				    text:"取消资格",
				    type:"submit",
				    handler:function(buttonObj){
				
				    var grid1=buttonObj.ownerCt.ownerCt;
			    	var data=grid1.getSelectionModel().getSelection();
			    	if(data.length==0){
			    		//Ext.example.msg('<font color="#ff9900">警告</font>','请先选择学生！');
			    		Ext.Msg.show({
								title:'系統提示',
								msg: '请先选择学生！',
								icon: Ext.Msg.WARNING
						});
			    	}
			    	else
			    	{
			    		//得到ID的数据
			    		var st=grid1.getStore();
			    		var ids=[];
			    		var name=[];
			    		var exam_data=[];
			    		var nowtime=[];
			    		var k=1;
			    		Ext.Array.each(data,function(record){
			    			if(k==1)
			    			{
			    				exam_data.push(record.get('exam_date'));
			    				nowtime.push(record.get('nowtime'));
			    			}
			    			k++;
			    		});
			    		if(exam_data>nowtime)
			    		{
			    			Ext.Array.each(data,function(record){
				    		    
							if(record.get('qualify')==false)
							{
								name.push(record.get('NAME'));
							}
							else
							{
							    ids.push(record.get('ID'));	
							}
							
							});
							/*if(name.length>0)
							{
							   Ext.MessageBox.alert("提示框","<br>"+name+"<br><br>不具有考试资格,无需取消资格<br>"); 
							
							}*/
							
							if(ids.length>0)
							{
								Ext.Ajax.request({
								
									url:'Cancelqualification.action',
									params:{ids:ids.join(",")},//传值到后台,单传2个值到后台时以,分开
									method:'POST',
									timeout:2000,
									success:function(response,opts){
										
										//Ext.example.msg('<font color="#0000ff">温馨提示</font>','资格取消成功！');

										Qgrid.store.reload();//重新加载数据
									}
								})
							}
			    		}
			    		else
			    		{
			    			//Ext.example.msg('<font color="#ff9900">警告</font>','考试已经开始或已经结束,不能取消授权!');
			    			Ext.Msg.show({
											title:'系統提示',
											msg: '考试已经开始或已经结束,不能取消授权!',
											icon: Ext.Msg.ERROR
									});
			    		}
			    		
			    		
			    		}
			        }
		 		}
			   
		 ]
		 
		});
		
