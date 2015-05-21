package com.longpo.model;

import java.util.HashSet;
import java.util.Set;

/**
 * 版块实体
 * @author HuangZhiLong
 *
 */
public class Forum {

	public Long id;
	
	public String name;//版块名
	
	public String description;//版块描述
	
	//定义为int要注意赋值,当获取到int为null时会出错,建议使用Integer
	public int position;//指定版块位置,显示排序时按position递增排序
	
	private Set<Topic> topics = new HashSet<Topic>();//一个版块对应多个主题
	
	//------特殊字段来解决复杂的查询问题
	private int topicCount; // 主题数量---使用字段记录，不用每次去查询
	
	private int articleCount; // 文章数量（主题+回复），避免去查询数据库计算直接记录下来
	
	private Topic lastTopic; // 最后发表的主题,使用字段直接记录下来，不用再去查询回复表

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

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public Set<Topic> getTopics() {
		return topics;
	}

	public void setTopics(Set<Topic> topics) {
		this.topics = topics;
	}

	public int getTopicCount() {
		return topicCount;
	}

	public void setTopicCount(int topicCount) {
		this.topicCount = topicCount;
	}

	public int getArticleCount() {
		return articleCount;
	}

	public void setArticleCount(int articleCount) {
		this.articleCount = articleCount;
	}

	public Topic getLastTopic() {
		return lastTopic;
	}

	public void setLastTopic(Topic lastTopic) {
		this.lastTopic = lastTopic;
	}
	
	
	
}
