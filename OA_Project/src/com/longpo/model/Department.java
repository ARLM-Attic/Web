package com.longpo.model;

import java.util.HashSet;
import java.util.Set;

/**
 * 部门
 * 
 * @author tyg
 * 
 * 数据的存储和获取都是根据实体类的属性，不是直接看表的属性,只要映射好表,只需要操作属性就可
 * 
 */
public class Department {
	public Long id;
	public Set<User> users = new HashSet<User>();
	public Department parent;
	
	public Set<Department> children = new HashSet<Department>();

	
	public String name;
	public String description;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	public Department getParent() {
		return parent;
	}
	public void setParent(Department parent) {
		this.parent = parent;
	}
	public Set<Department> getChildren() {
		return children;
	}
	public void setChildren(Set<Department> children) {
		this.children = children;
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
