package com.longpo.serviceimpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longpo.dao.RoleDao;
import com.longpo.model.Role;
import com.longpo.service.RoleService;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@Resource
	public RoleDao roleDao;
	
	@Override
	public List<Role> getAll() {
		
		//调用Roledao实现数据获取
	    List<Role>ok=roleDao.getAll();
	   
		return ok;
	}
	
	//增加岗位
	@Override
	public void add(String name, String description) {
		
		roleDao.save(new Role(name, description));
	}

	//删除岗位
	@Override
	public void delete(Long id) {

		roleDao.detele(id);
	}

	//修改岗位
	@Override
	public void update(Long id, String name, String description) {
		Role role=roleDao.getById(id);
		role.setDescription(description);
		role.setName(name);
		//更新
		roleDao.update(role);
	}

	@Override
	public Role getById(Long id) {
		
		return roleDao.getById(id);
	}




}
