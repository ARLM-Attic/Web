package com.longpo.service;

import java.util.List;

import com.longpo.model.Department;


public interface DepartmentService {

	public List<Department> getAll();

	//增加部门
	public void save(String name, String description);

	//根据id删除部门
	public void delete(Long id);

	public Department getById(Long id);

	public void update(Long id, String name, String description);
	

}
