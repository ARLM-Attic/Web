package common;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.omg.CORBA.Object;

public class tools {
	
	public String moduleName(){
		//ejb:/projectName
		return "ejb:/"+"G6"+"/";
	}
	
	public InitialContext getContext() throws NamingException{
		
		Hashtable<String, String> p = new Hashtable<String, String>();
    	p.put(Context.URL_PKG_PREFIXES, "org.jboss.ejb.client.naming");
        InitialContext ctx;
		ctx = new InitialContext(p);
		return ctx;
		
	}
	//分页
	public List<?> page(Integer start,Integer limit,List<?> list)
	{
		List<Serializable> temp  = new ArrayList<Serializable>();
		int num = start + limit;
		if(num>list.size())
		{
			num = list.size();
		}
		for(int i = start ; i<num;i++)
		{
			temp.add( (Serializable) list.get(i));
		}
		return temp;
	}
	
}
