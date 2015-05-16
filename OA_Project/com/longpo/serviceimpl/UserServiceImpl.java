package com.longpo.serviceimpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longpo.dao.UserDao;
import com.longpo.model.User;
import com.longpo.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Resource
	public UserDao userDao;
	
	@Override
	public List<User> getAll() {
		
		//调用Userdao实现数据获取
	    List<User>ok=userDao.getAll();
	   
		return ok;
	}

	//用户登入验证
	@Override
	public User validate(String loginName, String password) {
		User user=userDao.getByName(loginName);
		if(user!=null)
		{
		   if(user.getPassword().equals(password))//验证成功,返回实体
			  return user;
		}
		return null;
		 
	}


}
