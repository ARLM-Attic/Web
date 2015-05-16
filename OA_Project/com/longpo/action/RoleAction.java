package com.longpo.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.longpo.dao.RoleDao;
import com.longpo.model.Role;
import com.longpo.service.RoleService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@Controller
@Scope("prototype")
public class RoleAction  extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public Long id;

	public String name;
	
	public String description;
	
	@Resource
	private RoleService roleService;

	
	/**
	 * 岗位列表显示
	 */
	
	public String showList()
	{
		List<Role>roles=roleService.getAll();
		//把roles数据放入，可在页面获取
		ActionContext.getContext().put("roles", roles);
		//System.out.println(roles);
		return "showList";
	}
	
	//岗位增加页面
	public String addPage()
	{
		return "addPage";
	}
	
	public String add()
	{
		roleService.add(name,description);
		return "add";
	}
	
	//数据删除--需要重定向到列表role_showList.action
	public String delete()
	{
		System.out.println("id+++++++++++++++++: "+id);
		roleService.delete(id);
		return "delete";
	}
	
	//修改页面显示
	public String updatePage()
	{
		//根据id获取对象
		Role role=roleService.getById(id);
		//回显数据到页面--页面利用struts2标签可以回显数据---记得页面用隐藏的id来接收回显的id，此id用来传给删除操作
		//structs的set方法和标签会帮我们回显数据
		this.id=role.id;
		this.name=role.name;
		this.description=role.description;
		//还可以使用
		//ActionContext.getContext().getValueStack().push(role);把role放到对象栈顶
				
		return "updatePage";
	}
	//修改操作
	public String update()
	{
		//通过get方法获取页面传来的参数,页面参数时updatePage回显的数据
		roleService.update(id, name, description);
		return "update";
	}
	
	public String Privilege()
	{
		return "Privilege";
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
}
