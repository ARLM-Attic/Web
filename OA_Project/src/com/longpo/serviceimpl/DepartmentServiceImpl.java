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
	public void save(String name, String description,Long id) {
		
		Department ok=new Department();
		ok.setName(name);
		ok.setDescription(description);
		//获取相应id的部门---根据实体来存储
		if(id!=-1){
		  Department father=departmentDao.getById(id);
		  ok.setParent(father);
		}
		
		departmentDao.save(ok);
		
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
	public void update(Long id, String name, String description,Long fatherid) {

		Department ok=departmentDao.getById(id);
		
		ok.setName(name);
		ok.setDescription(description);
		
		//-----不要关数据库表信息,根据实体属性去存储
		Department fatehrDepartment=departmentDao.getById(fatherid);
		ok.setParent(fatehrDepartment);
		departmentDao.update(ok);
	}


}
