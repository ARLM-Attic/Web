package com.longpo.util;

import com.longpo.model.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class LoginInterceptor  extends AbstractInterceptor{
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		//获取session的user
		User user=(User) ActionContext.getContext().getSession().get("user");		
		//获取请求的url
		String namespace = invocation.getProxy().getNamespace();
		String actionName = invocation.getProxy().getActionName();
		String privUrl = namespace + actionName; // 获取到请求的action地址		
		System.out.println("请求的地址为: "+privUrl);
		//没有登入
		if(user==null)
		{
			//对登入请求放行，不然无法登入，登入请求都会被拦截
			if(privUrl.equals("/login"))
			{
				//允许通过
				return invocation.invoke();
			}			
			return "login_UI";//转到login_UI。action
		}
		//已经登入，放行
		else {
			//允许通过
			return invocation.invoke();
		}
		
	}

}
