package com.longpo.serviceimpl;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longpo.dao.ForumDao;
import com.longpo.dao.TopicDao;
import com.longpo.model.Forum;
import com.longpo.model.Topic;
import com.longpo.model.User;
import com.longpo.service.TopicService;
import com.opensymphony.xwork2.ActionContext;

@Service
@Transactional
public class TopicServiceImpl implements TopicService {

	@Resource
	public TopicDao topicDao;
	
	@Resource
	public ForumDao forumDao;

	@Override
	public void add(String title, String content,Long id) {

		Topic ok=new Topic();
		
		//设置发表参数
		ok.setContent(content);
		ok.setTitle(title);
		//发布时间和更新时间
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");//设置日期格式	
		String time=df.format(new Date());
		System.out.println("++++++++++++++++++++++++++"+time);
		ok.setPostTime(time);
		ok.setLastUpdateTime(time);
		//设置发表人
		ok.setAuthor((User)ActionContext.getContext().getSession().get("user"));
		//设置为普通帖
		ok.setType(Topic.TYPE_NORMAL);
		//设置发布的ip
		InetAddress addr;
		try {
			addr = InetAddress.getLocalHost();
			ok.setIpAddr(addr.getHostAddress().toString());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		//初始回复数0
		ok.setReplyCount(0);
		//所属版块
		ok.setForum(forumDao.getById(id));
		
		topicDao.save(ok);
		
		//发完贴后跟新版块信息
		Forum dao=forumDao.getById(id);
		//主题和文章数加一
		dao.setTopicCount(dao.getTopicCount()+1);
		dao.setArticleCount(dao.getArticleCount()+1);
		//设置该主题为最后发表主题
		dao.setLastTopic(ok);
		forumDao.update(dao);
		
	}

	@Override
	public List<Topic> getAll() {
		List<Topic>lists=topicDao.getAll();
		return lists;
	}
	
	
}
