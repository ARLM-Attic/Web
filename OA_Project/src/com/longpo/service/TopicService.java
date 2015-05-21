package com.longpo.service;

import java.util.List;

import com.longpo.model.Topic;



public interface TopicService {

	//发表新主题
	public void add(String title, String content,Long id);

	//获取所有主题
	public List<Topic> getAll();


}
