package com.longpo.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.longpo.model.Department;
import com.longpo.service.DepartmentService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@Controller
@Scope("prototype")
public class DepartmentAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public Long id;
	
	public String name;
	
	public String description;
	@Resource
	public DepartmentService departmentService;
	
	public String showList()
	{
		System.out.println("+++++++++++++++++++++++++++++++++++");
		List<Department>lists=departmentService.getAll();
		System.out.println(lists);
		//数据放到值栈-用于页面显示
		ActionContext.getContext().put("lists", lists);
		return "showList";
	}
	
	//新建页面显示
	public String addUI()
	{
		return "addUI";
	}
	
	public String add()
	{
		//增加部门
		departmentService.save(name,description);
		return "add";
	}
	
	//删除
	public String delete()
	{
		departmentService.delete(id);
		return "delete";
	}
	
	//更新页面
	public String updateUI()
	{
		System.out.println("                      "+id);
		Department ok=departmentService.getById(id);
		//-----放到值栈,前台使用el表达式或struts标签显示该数据
		ActionContext.getContext().getValueStack().push(ok);
		return "updateUI";
	}
	
	public String update()
	{
		departmentService.update(id,name,description);
		return "update";
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
}
