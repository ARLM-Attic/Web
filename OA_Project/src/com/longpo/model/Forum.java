package com.longpo.model;
/**
 * 版块实体
 * @author HuangZhiLong
 *
 */
public class Forum {

	public Long id;
	
	public String name;
	
	public String description;
	
	public int position;//指定版块位置

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
	
	
}
