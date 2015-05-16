package com.longpo.model;

public class User {

	private Long id;
	
	private String name;
	
	
	private String password;
	
	private String department;
	/**
	 * 当查询的时候返回的实体类是一个对象实例，是hibernate动态通过反射生成的
                       反射的Class.forName("className").newInstance();需要对应的类提供一个无参构造函数
	 */
	public User()
	{
		
	}	

	public User(Long id, String name, String password, String department) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.department = department;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}


	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + "]";
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
	
	
}
