package com.longpo.dao;

import java.util.List;

import com.longpo.model.User;

/**
 * user接口,User特有方法
 * 定义User自己的方法
 * @author HuangZhiLong
 *
 */
public interface UserDao extends BaseDao<User>{
	
	//根据用户名获取用户	
	public User getByName(String name);
}
