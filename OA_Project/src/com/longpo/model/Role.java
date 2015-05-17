package com.longpo.model;

import java.util.HashSet;
import java.util.Set;

/**
 * 岗位
 * 
 * @author tyg
 * 
 */
public class Role {
	public Long id;
	public String name;
	public String description;
	//一个岗位对应多个User
	public Set<User> users = new HashSet<User>();
	
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
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}

	

}
