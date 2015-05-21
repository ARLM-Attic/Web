package com.longpo.serviceimpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longpo.dao.ForumDao;
import com.longpo.model.Forum;
import com.longpo.service.ForumService;

@Service
@Transactional
public class ForumServiceImpl implements ForumService {

	@Resource
	public ForumDao forumDao;

	@Override
	public List<Forum> getAll() {
		//position递增集合
		return forumDao.getAsc();
	}

	@Override
	public void save(String name, String description) {
		//获取position的最大值和最小值
		int[] len=forumDao.getMaxValue();
		Forum ok=new Forum();
		ok.setDescription(description);
		ok.setName(name);
    
		//最大值加一
		ok.setPosition(len[0]+1);
		
		forumDao.save(ok);
	}

	@Override
	public void delete(Long id) {
		forumDao.detele(id);
	}

	@Override
	public Forum getById(Long id) {
		// TODO Auto-generated method stub
		return forumDao.getById(id);
	}

	@Override
	public void update(Long id, String name, String description) {
		
		Forum ok=forumDao.getById(id);
		ok.setName(name);
		ok.setDescription(description);
		
		forumDao.update(ok);
		
	}

	//上移操作
	@Override
	public void up(Long id) {

		//获取递增数据
		List<Forum>lists=forumDao.getAsc();
		Forum temp=getById(id);
		//不是最小,即不再最上面
		if(temp.getPosition()!=lists.get(0).getPosition())
		{
			for(int i=1;i<lists.size();i++)
			{
				//与前一个版块交换position
				if(temp.getPosition()==lists.get(i).getPosition())
				{
					Forum ok=forumDao.getById(lists.get(i-1).getId());
					
					int position=ok.getPosition();
					
					ok.setPosition(temp.getPosition());
					forumDao.update(ok);
					
					temp.setPosition(position);
					forumDao.update(temp);
					
					break;
				}
			}
		}
	}

	//下移
	@Override
	public void down(Long id) {

		// 获取递增数据
		List<Forum> lists = forumDao.getAsc();
		Forum temp = getById(id);
		// 不是最大,即不再最下面
		if (temp.getPosition() != lists.get(lists.size()-1).getPosition()) {
			for (int i = 0; i < lists.size()-1; i++) {
				// 与前一个版块交换position
				if (temp.getPosition() == lists.get(i).getPosition()) {
					Forum ok = forumDao.getById(lists.get(i + 1).getId());

					int position = ok.getPosition();

					ok.setPosition(temp.getPosition());
					forumDao.update(ok);

					temp.setPosition(position);
					forumDao.update(temp);

					break;
				}
			}
		}
	}

}
