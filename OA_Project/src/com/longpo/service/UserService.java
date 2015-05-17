package com.longpo.service;

import java.util.List;

import com.longpo.model.User;

public interface UserService {

	public List<User> getAll();
	
	//用户登入验证
	public User validate(String loginName, String password);
	
	public void save(User ok);

	public void delete(Long id);

	public void initPassword(Long id);


}
