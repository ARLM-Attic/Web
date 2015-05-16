package com.longpo.serviceimpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longpo.dao.DepartmentDao;
import com.longpo.model.Department;
import com.longpo.service.DepartmentService;


@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

	@Resource
	public DepartmentDao departmentDao;
	
	@Override
	public List<Department> getAll() {
		
	    List<Department>ok=departmentDao.getAll();
	   
		return ok;
	}

	//增加部门
	@Override
	public void save(String name, String description) {
		
		departmentDao.save(new Department(name,description));
		
	}

	//删除
	@Override
	public void delete(Long id) {

       departmentDao.detele(id);
		
	}

	@Override
	public Department getById(Long id) {
		// TODO Auto-generated method stub
		return departmentDao.getById(id);
	}

	@Override
	public void update(Long id, String name, String description) {

		Department ok=departmentDao.getById(id);
		
		ok.setName(name);
		ok.setDescription(description);
		departmentDao.update(ok);
	}


}
