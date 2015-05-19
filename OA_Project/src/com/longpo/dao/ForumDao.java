package com.longpo.dao;

import java.util.List;

import com.longpo.model.Forum;


public interface ForumDao extends BaseDao<Forum>{
	
	//获取数据里pisotion的最大值--0和最小值--1
	public int[] getMaxValue();
	
	//按position递增顺序获取所以
	public List<Forum> getAsc();
	
}
