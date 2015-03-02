Ext.Loader.setConfig({enabled: true}); 
Ext.Loader.setPath('Ext.ux', 'Ext4.2/examples/ux');
Ext.require([ 
    'Ext.grid.*', 
    'Ext.data.*', 
    'Ext.form.*', 
    'Ext.tip.*',
    'Ext.window.MessageBox',
    'Ext.selection.CheckboxModel'
]);

Ext.onReady(function(){ 
	
	Ext.QuickTips.init();
	
	Ext.Msg.msgButtons[0].setText("确定");//OK  
    Ext.Msg.msgButtons[1].setText("是");//YES  
    Ext.Msg.msgButtons[2].setText("否");//NO  
    Ext.Msg.msgButtons[3].setText("取消");//CANCEL 

    Ext.define('MyData',{ 
        extend: 'Ext.data.Model', 
        fields: [ 
            { name: 'ID', type: 'int' },
            { name: 'TITLE', type: 'string' },
            { name: 'CONTENT', type: 'string' },
            { name: 'STU_ID', type: 'int' },
            { name: 'STU_NAME', type: 'string' },
            { name: 'TIME', type: 'string', mapping:'TIME' },
            { name: 'ANS_FILE', type:'string' },
            { name: 'STU_TIME', type: 'string' },
            { name: 'STU_ANS_FILE', type: 'string' },
            { name: 'SCORE', type: 'string' },
            { name: 'STU_SCORE', type: 'string' }
        ]
    }); 
    
    var store = Ext.create('Ext.data.Store', {
        model: 'MyData',
        proxy: { 
            type: 'ajax', 
            url: 'getAnswers.action',
            reader: {
                type: 'json', 
                root: 'papers', 
                totalProperty: 'length'
            }
        },
        autoLoad: true,
        sorters: [{
            property : 'TIME',
            direction: 'DESC'
        }]
    }); 

    var sm = Ext.create('Ext.selection.CheckboxModel');

    viewScore = Ext.create('Ext.grid.Panel',{
        store: store,
        columns: [
            { header: "考试编号" , dataIndex: 'ID' , width:65 , sortable: true, menuDisabled:true },
            { header: "考试标题" , dataIndex: 'TITLE' , flex:1 , sortable: true, menuDisabled:true },
            { header: '建立时间' , dataIndex: 'TIME',  width:120 , sortable: true, menuDisabled:true },
            { header: '学生编号' , dataIndex: 'STU_ID',  flex:1 , sortable: true, menuDisabled:true },
            { header: '学生名字' , dataIndex: 'STU_NAME',  flex:1 , sortable: true, menuDisabled:true },
            { header: '学生得分' , dataIndex: 'STU_SCORE',  flex:1 , sortable: true, menuDisabled:true },
            { header: "作答时间" , dataIndex: 'STU_TIME' , width:120 , sortable: true, menuDisabled:true }
        ],
        viewConfig: { 
            stripeRows: true,
            disableSelection: false,
            frame: true 
        },
	    dockedItems: [{
            dock: 'top', 
            xtype: 'toolbar', 
            items: ['-',{ 
			        itemId: 'ButtonReset', 
			        text:'刷新', 
			        tooltip:'刷新页面',  
			        iconCls:'icon-refresh', 
			        handler:function(){
						store.load();
		    		}
		    	}
		    ]
		}]
    });
});