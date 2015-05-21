package com.longpo.model;


/**
 * Topic 和Reply实体公有的属性，是把Topic和Reply的公有属性抽取出来
 * 不是真正使用的实体，不需要编写映射文件
 * @author HuangZhiLong
 *
 */
public class Article {
	
	private Long id;
	private String title; // 标题
	
	private String content;// 内容---字数大于255Varchar时要标注类型为text
	
	private User author;// 作者
	
	private String postTime;// 发表时间
	
	private String ipAddr;// 发表文章时所用的IP地址

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

   
	public String getPostTime() {
		return postTime;
	}

	public void setPostTime(String postTime) {
		this.postTime = postTime;
	}

	public String getIpAddr() {
		return ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

}
