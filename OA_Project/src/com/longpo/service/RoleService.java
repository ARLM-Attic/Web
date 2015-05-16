package com.longpo.service;

import java.util.List;

import com.longpo.model.Role;


public interface RoleService {

	//获取所有数据
	public List<Role> getAll();

	//增加岗位
	public void add(String name, String description);

	//删除岗位
	public void delete(Long id);

	//根据id修改
	public void update(Long id, String name, String description);

	//根据id获取对象
	public Role getById(Long id);


}
