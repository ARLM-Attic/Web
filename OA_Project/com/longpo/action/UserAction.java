package com.longpo.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.longpo.model.User;
import com.longpo.service.UserService;
import com.opensymphony.xwork2.ActionSupport;


@Controller
@Scope("prototype")
public class UserAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Resource	
	private UserService userService;
	
	//用户登入账号密码获取,通过struts的get,set反复
	public String loginName;
	
	public String password;
	
	//用户登入
	public String login() throws Exception {
		
		System.out.println("usernanme: "+loginName+"  password:"+password);
		
	    User user=userService.validate(loginName,password);
	    //登入成功
	    if(user!=null){
		    System.out.println("success+++++++++++++++++++++++++");
		    HttpServletRequest request = ServletActionContext.getRequest();		
			request.getSession().setAttribute("user",user );//用户存入session
		    return SUCCESS;
	    }
	     //登入失败
	    else {	
	    	HttpServletRequest request = ServletActionContext.getRequest();		
			request.getSession().setAttribute("state","false" );//用户存入session
			return ERROR;
	    }
	}
	
	//重定向显示主页
	public String showIndex()
	{
		return "showIndex";
	}
		
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	

}
