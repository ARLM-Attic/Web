package com.longpo.model;

/**
 * 回复Reply实体，继承Arctile类的属性
 *
 */
public class Reply extends Article {
	
	private Topic topic; // 所属的主题

	public Topic getTopic() {
		return topic;
	}

	public void setTopic(Topic topic) {
		this.topic = topic;
	}
}
