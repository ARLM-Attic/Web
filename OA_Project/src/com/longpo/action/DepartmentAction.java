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
	 * ++++++++++++
	 */
	private static final long serialVersionUID = 1L;
	
	public Long id;
	
	public Long parentId;
	
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String name;
	
	public String description;
	@Resource
	public DepartmentService departmentService;
	
	public String showList()
	{
		
		List<Department>lists=departmentService.getAll();
		System.out.println(lists);
		//数据放到值栈-用于页面显示
		ActionContext.getContext().put("lists", lists);
		return "showList";
	}
	
	//新建页面显示
	public String addUI()
	{
		List<Department>departments=departmentService.getAll();
		//放到值栈,页面用#获取--显示上级部门
		ActionContext.getContext().put("departments", departments);
		return "addUI";
	}
	
	public String add()
	{
		//此时id获取为上级部门id
		//增加部门
		departmentService.save(name,description,parentId);
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
		List<Department>departments=departmentService.getAll();
		//放到值栈,页面用#获取--显示上级部门
		ActionContext.getContext().put("departments", departments);
		
		Department ok=departmentService.getById(id);
		//-----放到值栈,前台使用el表达式或struts标签显示该数据
		ActionContext.getContext().getValueStack().push(ok);
		if(ok.getParent()!=null)
		{
			parentId=ok.getParent().getId();
		}
		return "updateUI";
	}
	
	public String update()
	{
		departmentService.update(id,name,description,parentId);
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
