package com.longpo.action;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.longpo.model.Department;
import com.longpo.model.Role;
import com.longpo.model.User;
import com.longpo.service.DepartmentService;
import com.longpo.service.RoleService;
import com.longpo.service.UserService;
import com.opensymphony.xwork2.ActionContext;
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
	
	@Resource	
	private DepartmentService departmentService;
	
	@Resource	
	private RoleService roleService;
	
	//用户登入账号密码获取,通过struts的get,set反复
	
	public Long id;
	
	public String loginName;
	
	public String password;
	
	public Long parentId;
	
	public String name;
	
	public String sex;
	
	public String phoneNumber;
	
	public String email;
	
	public String description;
	
	public List<Long> roleIdList;
	//用户登入
	public String login() throws Exception {
		
		System.out.println("usernanme: "+loginName+"  password:"+password);
		
		if(loginName==null||password==null)
		{
			addFieldError("loginMsg", "填写完整的账号密码");
			return ERROR;
		}
		//密码MD5加密....需要导入包commons-codec.jar
		String md5_password=DigestUtils.shaHex(password);
	    User user=userService.validate(loginName,md5_password);
	    //登入成功
	    if(user!=null){
		    System.out.println("success+++++++++++++++++++++++++");
		    //struts2进行了封装
		    //ActionContext.getContext().getSession().put("user",user);
		    HttpServletRequest request = ServletActionContext.getRequest();		
			request.getSession().setAttribute("user",user );//用户存入session
		    return SUCCESS;
	    }
	     //登入失败
	    else {	
	    	//方法1
	    	//错误信息，前台显示--未使用structs2标签
	    	/*HttpServletRequest request = ServletActionContext.getRequest();		
			request.getSession().setAttribute("state","false" );//错误信息
*/			
	    	//方法2：
	    	//错误信息，前台显示，使用struct标签
			addFieldError("loginMsg", "用户名或密码错误！");
			return ERROR;
	    }
	}
	
	//重定向显示主页
	public String showIndex()
	{
		return "showIndex";
	}
	
	
	//显示用户管理页面
	public String showList()
	{
		
		List<User>lists=userService.getAll();
		//放到值栈		
		ActionContext.getContext().put("lists", lists);
		//懒加载问题
		for(int i=0;i<lists.size();i++)
		{
			System.out.println(lists.get(i).getDepartment().getName());
		}
		
		//放到值栈的对象栈
		/*Test okTest=new Test();
		okTest.setMydata("ValueStack");
		okTest.setId(10);
		ActionContext.getContext().getValueStack().push(okTest);
		//放到Context的Map
	    ActionContext.getContext().put("mydata", "context");
		//放到Application里的Map
		ActionContext.getContext().getApplication().put("mydata", "Application");
		//放到Session里的Map
		ActionContext.getContext().getSession().put("mydata", "session");
		//放到request里的Map
		Map request=(Map)ActionContext.getContext().get("request");
		request.put("mydata", "request");*/	
		return "showList";
	}
		
	//新建用户页面
	public String addUI()
	{
		//获取全部部门并翻入值 栈
		List<Department>departments=departmentService.getAll();
		ActionContext.getContext().put("departments", departments);
		
		//获取全部岗位并放入值栈
		List<Role>roles=roleService.getAll();
		ActionContext.getContext().put("roles", roles);
		
		return "addUI";
	}
	
	
	public String add()
	{
		System.out.println("roleIdList: "+roleIdList);
		System.out.println("parentid: "+parentId);
		
		User ok=new User();
		ok.setDescription(description);
		ok.setEmail(email);
		ok.setGender(sex);
		ok.setLoginName(loginName);//登入账号
		ok.setName(name);
		//密码MD5加密....需要导入包commons-codec.jar
		String md5_password=DigestUtils.shaHex("1234");//初始密码1234
		ok.setPassword(md5_password);
		
		ok.setPhoneNumber(phoneNumber);
		//设置部门
		Department department=departmentService.getById(parentId);
		ok.setDepartment(department);
		//设置岗位---当对象存储
		System.out.println(roleIdList);
		Set<Role>sets=new HashSet<Role>();
		for(int i=0;i<roleIdList.size();i++)
		{
			Role temp=roleService.getById(roleIdList.get(i));
			sets.add(temp);
			
		}
		ok.setRoles(sets);
		
		userService.save(ok);
		return "add";
	}
	
	//初始化密码为1234
	public String initPassword()
	{
		userService.initPassword(id);
		return "init";
	}
	
	
	//删除
	public String delete()
	{
		userService.delete(id);
		return "delete";
	}
	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Long> getRoleIdList() {
		return roleIdList;
	}

	public void setRoleIdList(List<Long> roleIdList) {
		this.roleIdList = roleIdList;
	}


	

}
