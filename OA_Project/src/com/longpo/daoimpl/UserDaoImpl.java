package com.longpo.daoimpl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.longpo.dao.UserDao;
import com.longpo.model.User;

@Repository
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

	@SuppressWarnings("unchecked")
	@Override
	public User getByName(String name) {
				
		List<User> users = getSession().createQuery(
						"FROM " + class_type.getSimpleName() + " where loginName=?")
				.setString(0, name).list();//0表示第一个占位符
		System.out.println(users);
		if(users.size()>0)
		    return users.get(0);
		else {
			return null;
		}
	}

}
