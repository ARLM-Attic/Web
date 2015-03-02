//Ext.Loader.setConfig({enabled: true}); 
//Ext.Loader.setPath('Ext.ux', 'ExtJs/examples/ux');

Ext.onReady(function(){
	
	var store = Ext.create('Ext.data.Store', {
		fields: [
		    {name: 'ID', type: 'int'},
			{name: 'TITLE', type: 'string'},
		    {name: 'QUESTION', type: 'string'}
	    ],
        proxy: { 
            type: 'ajax', 
            url: 'getExam.action',
            reader: {
                type: 'json', 
                root: 'exam' 
            }
        },
        autoLoad: true,
        sorters: ["ID"]
    }); 
//	store.load();
	
	var grid = Ext.create('Ext.grid.Panel', {
		id: 'grid',
		region: 'center',
		flex: 1,
	    title: '试卷预览',
	    frame: true,
	    //border: false,
	    //forceFit: true,
	    scroll:'both',
	    store: store,
	    columns: [
	        { xtype: 'rownumberer' },
	        { text: '题型', flex: 20, dataIndex: 'TITLE'},
	        { text: '题目', flex: 80, dataIndex: 'QUESTION'}
	    ]
	});
	
	valueMask = new Ext.LoadMask(grid, {msg:"请等待..."});
	
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items:[
	       grid
        ]
	});
})