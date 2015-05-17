package com.longpo.daoimpl;

import static org.junit.Assert.*;

import org.hibernate.SessionFactory;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.sun.accessibility.internal.resources.accessibility;

public class UserDaoImplTest {

	@Test
	public void test() {
		
		UserDaoImpl temp=new UserDaoImpl();
		
		//System.out.println(temp.getAll());
		
	}
	
	private ApplicationContext aContext=new ClassPathXmlApplicationContext("applicationContext.xml");
	
	@Test
	public void TestSessionFactory()
	{
		SessionFactory sessionFactory=(SessionFactory) aContext.getBean("sessionFactory");
		System.out.println(sessionFactory);
	}

}
