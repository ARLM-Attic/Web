package com.longpo.dao;

import java.util.List;
/**
 * 使用泛型,该接口作为所有dao的根接口
 * @author HuangZhiLong
 *
 * @param <T>
 */
public interface BaseDao<T> {

	//增加
	public void save(T entity);
	
	//删除
	public void detele(Long id);
	
	//更新
	public void update(T entity);
	
	//根据id获取
	public T getById(Long id);
	
	//根据id数组获取
	public List<T> getByIds(Long[] ids);
		
	//获取所有
	public List<T> getAll();
}
