package com.longpo.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.longpo.model.Topic;
import com.longpo.service.TopicService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;


//记得添加这两个注解
@Controller
@Scope("prototype")
public class TopicAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public String title;
	
	public String content;
	
	public Long id;//获取版块id
	
	@Resource
	public TopicService topicService;
	//显示主题列表

	public String showTopic()
	{
		//把版块id放入值栈，用于传递给新发帖页面
		ActionContext.getContext().put("id", id);
		//System.out.println("版块id0000: "+id);
		List<Topic>lists=topicService.getAll();
		ActionContext.getContext().put("lists", lists);
		
		return "showTopic";
	}
	
	
	
	//发表新主题页面
	public String addUI()
	{
		System.out.println("版块id11111: "+id);
		ActionContext.getContext().put("id", id);
		return "addUI";
	}
	
	//发表主题实现方法
	public String add()
	{
		System.out.println("版块id2222: "+id);
		topicService.add(title,content,id);
		return "add";
	}
	
	
	public String showReply()
	{		
		return "showReply";
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	


	
}
