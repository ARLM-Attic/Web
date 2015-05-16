package com.longpo.daoimpl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.annotation.Resource;

import org.aspectj.weaver.patterns.ThisOrTargetAnnotationPointcut;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;

import com.longpo.dao.BaseDao;

/**
 * 实现根接口BaseDao接口的方法,所有Dao将继承基本实现类
 * @author HuangZhiLong
 *
 * @param <T>
 */
@SuppressWarnings("unchecked")
public class BaseDaoImpl<T> implements BaseDao<T> {

	@Resource
	public SessionFactory sessionFactory;
	
	//获取泛型的真实类型
	public Class<T>class_type;
	
	//在构造方法里获取,创建实例时会先调用父类构造方法
	public BaseDaoImpl()
	{
	   //获取当前new对象的泛型的父类类型  
		ParameterizedType parameterizedType = (ParameterizedType) this.getClass().getGenericSuperclass();
		//<k,v,e>里面泛型【0】代表第一个泛型的类型,[1]代表第二个,依次类推
		this.class_type = (Class<T>) parameterizedType.getActualTypeArguments()[0];
		
		System.out.println(class_type);
	}
	
	//获取session操作事物---不要定义为私有,不然子类无法使用session	
	public Session getSession()
	{
		return sessionFactory.getCurrentSession();
	}

	//增加
	@Override
	public void save(T entity) {
		getSession().save(entity);
	}

	//删除
	@Override
	public void detele(Long id) {

		Object obj=getById(id);
		if(obj!=null)
		getSession().delete(obj);
	}

	//更新---需要获取需要更改的实体传入
	@Override
	public void update(T entity) {
		getSession().update(entity);
	}

	@Override
	public T getById(Long id) {
		//强制转换
		return (T)getSession().get(class_type, id);
	}

	@Override
	public List<T> getAll() {
		
		return getSession().createQuery("FROM "+class_type.getSimpleName()).list();
	}

	@Override
	public List<T> getByIds(Long[] ids) {
		//如 From User where id in,User代表model下的类名
		return getSession().createQuery("FROM "+class_type.getSimpleName()+" where id in(?)"
				).setParameterList("", ids).list();
	}

}
