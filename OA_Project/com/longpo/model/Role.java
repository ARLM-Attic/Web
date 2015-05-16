package com.longpo.model;

/**
 * 岗位实体
 * @author HuangZhiLong
 *
 */
public class Role {

	public Long id;
	
    //hibernate的查询需要使用无参构造方法
	public Role() {
		super();
	}
	
	public Role(String name, String description) {
		this.name = name;
		this.description = description;
	}

	
	public Role(Long id, String name, String description) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
	}


	public String name;
	
	public String description;

	
	@Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + ", description="
				+ description + "]";
	}

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
	
	
}
