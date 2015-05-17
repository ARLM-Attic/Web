package com.longpo.model;

import java.util.HashSet;
import java.util.Set;

/**
 * 用户
 * @author tyg
 * 
 */
public class User {
	public Long id;
	//对应一个部门
	public Department department;	
    //一个用户对应多个岗位
	public Set<Role> roles = new HashSet<Role>();

	public String loginName; // 登录名
	public String password; // 密码
	public String name; // 真实姓名
	public String gender; // 性别
	public String phoneNumber; // 电话号码
	public String email; // 电子邮件
	public String description; // 说明
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	
}
