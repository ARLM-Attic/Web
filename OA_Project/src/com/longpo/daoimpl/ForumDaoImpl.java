package com.longpo.daoimpl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.longpo.dao.ForumDao;
import com.longpo.model.Forum;

@Repository
public class ForumDaoImpl extends BaseDaoImpl<Forum> implements ForumDao{

	//自己特有的数据操作方法，获取数据中最大的position值
	@Override
	public int[] getMaxValue() {
		List<Forum>lists=this.getAll();
		int max=Integer.MIN_VALUE,min=Integer.MAX_VALUE;
		for(int i=0;i<lists.size();i++ )
		{
			if(lists.get(i).getPosition()>max)
				max=lists.get(i).getPosition();
			if(lists.get(i).getPosition()<min)
				min=lists.get(i).getPosition();
		}
		//返回最大最小值
		int []result={max,min};
		return result;
	}

	//获取position递增的集合
	@SuppressWarnings("unchecked")
	@Override
	public List<Forum> getAsc() {
		
		return getSession().createQuery("FROM Forum o order by o.position").list();
	}

	

}
