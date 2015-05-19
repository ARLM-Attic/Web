package com.longpo.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.longpo.model.Forum;
import com.longpo.service.ForumService;
import com.longpo.service.UserService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

//记得添加这两个注解
@Controller
@Scope("prototype")
public class ForumAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public Long id;
	
	public String name;
	
	public String description;
	
	@Resource	
	private ForumService forumService;
	
	//显示版块列表
	public String showList()
	{
		List<Forum>lists=forumService.getAll();
		//发到Context的map里
		ActionContext.getContext().put("lists", lists);
		System.out.println("kkkkkkk");
		return "showList";
	}
	
	//版块 增加页面
	public String addUI()
	{
		return "addUI";
	}
	
	public String add()
	{
		System.out.println(name+"    "+description+"");
		//存入数据
		forumService.save(name,description);
		return "add";
	}
	//修改页面
	public String updateUI()
	{
		Forum ok=new Forum();
		ok=forumService.getById(id);
		//放入值栈
		ActionContext.getContext().getValueStack().push(ok);
		return "updateUI";
	}
	
	
	public String update()
	{
		forumService.update(id,name,description);
		return "update";
	}
	//删除
	public String delete()
	{
		forumService.delete(id);
		return "delete";
	}
	
	
	//上移
	public String up()
	{
		forumService.up(id);
		return "up";
	}
	
	//下移
	public String down()
	{
		forumService.down(id);
		return "down";
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
