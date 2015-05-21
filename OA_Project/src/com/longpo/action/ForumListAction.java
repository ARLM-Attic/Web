package com.longpo.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.longpo.model.Forum;
import com.longpo.service.ForumService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;


//记得添加这两个注解
@Controller
@Scope("prototype")
public class ForumListAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Resource
	public ForumService forumService;
	
	public String showList()
	{
		//按position递增顺序
		List<Forum>lists=forumService.getAll();		
		ActionContext.getContext().put("lists", lists);
		
        return "showList";
	}
	
	

}
