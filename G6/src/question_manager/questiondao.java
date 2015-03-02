package question_manager;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import student_paper.StudentPaper;


@Stateless
@Remote(questionRemote.class)
public class questiondao implements questionRemote {

	@PersistenceContext
    protected EntityManager em;
	
	
	public Integer insert(question q) {
//		String tempdata = q.getLastEditTime();
		em.persist(q);	
		return q.getId();
	}

	
	public void delete(Integer id) {
		
		em.remove(em.find(question.class,id));
	}


	@SuppressWarnings("unchecked")	
	public List<question> get() {
		
		Query query=em.createQuery("select q from question q order by q.id desc");
		List<question> result= query.getResultList();
		
		return result;
		
	}





	@SuppressWarnings("unchecked")	
	public List<question> get_by_user(String user) {
		Query query=em.createQuery("select q from question q where q.createUsers='"+user+"'order by q.id desc");
		return query.getResultList();
	}


	
	public question get_by_id(Integer id) {
		return em.find(question.class, id);
	}
	
	@SuppressWarnings("unchecked")
	public List<question> get_by_like_id(String id)
	{
		Query query=em.createQuery("select q from question q where  q.id like '%"+id+"%' order by q.id desc");
		
		return query.getResultList();
	}
	
	
	
	@SuppressWarnings("unchecked")
	public List<question> get_word(String title) {
			if(title.equals(""))
			{
				Query query = em.createQuery("select q from question q where q.type=:type order by q.id desc");
				query.setParameter("type", "Word题目");		
				return query.getResultList();
			}
			else {
				System.out.println(title);			
				Query query=em.createQuery("select q from question q where q.type='Word题目' and q.title like '%"+title+"%' order by q.id desc");	
				return query.getResultList();
			}
	}


	
	@SuppressWarnings("unchecked")
	public List<question> get_ppt(String title) {
		if(title.equals(""))
		{
			Query query = em.createQuery("select q from question q where q.type=:type order by q.id desc");
			query.setParameter("type", "PowerPoint题目");		
			return query.getResultList();
		}
		else {
			Query query=em.createQuery("select q from question q where q.type='PowerPoint题目' and q.title like '%"+title+"%' order by q.id desc");	
			return query.getResultList();
		}
	}

	
	@SuppressWarnings("unchecked")
	public List<question> get_excel(String title) {
		if(title.equals(""))
		{
			Query query = em.createQuery("select q from question q where q.type=:type order by q.id desc");
			query.setParameter("type", "Excel题目");		
			return query.getResultList();
		}
		else {
			Query query=em.createQuery("select q from question q where q.type='Excel题目' and q.title like '%"+title+"%' order by q.id desc");	
			return query.getResultList();
		}
	}

	
	

	public void change_file(String title,String type,String question,String fileroute,String filename,String user,String time,Integer ID) {
		Query query=em.createQuery("update question as q set q.title=:title,q.type=:type,q.question=:question,q.file_route=:file_route, q.filename=:filename,q.lastEditUser=:lastEditUser, q.lastEditTime=:lastEditTime where q.id ="+ID);
		query.setParameter("title",title);
		query.setParameter("type",type);
		query.setParameter("question",question);
		query.setParameter("file_route", fileroute);
		query.setParameter("filename",filename);
		query.setParameter("lastEditUser", user);
		query.setParameter("lastEditTime", time);
		query.executeUpdate();
		
	}


	public void change_Question(String title,String type,String question,String user,String time,Integer ID) {
		Query query=em.createQuery("update question as q set q.title=:title,q.type=:type,q.question=:question,q.lastEditUser=:lastEditUser, q.lastEditTime=:lastEditTime where q.id ="+ID);
		query.setParameter("title",title);
		query.setParameter("type",type);
		query.setParameter("question",question);
		query.setParameter("lastEditUser", user);
		query.setParameter("lastEditTime", time);
		query.executeUpdate();
	}


	@SuppressWarnings("unchecked")
	/*public question_container get(Integer start, Integer limit) {
		// TODO 自动生成的方法存根
		Query query=em.createQuery("select q from question q order by q.id desc");
		List<question> result= query.getResultList();
		int length= result.size();
		int num = start + limit;
		if(num>length)
		{
			num = length-1;
		}
		List<question> result2 =  query.setMaxResults(2).setFirstResult(1).getResultList();

		return new question_container(length, result2);
	}
*/

	public List<question> get_by_title(String title) {
		Query query=em.createQuery("select q from question q where q.title like '%"+title+"%' order by q.id desc");	
		return query.getResultList();
	}


	@SuppressWarnings("unchecked")
	public List<question> get_by_fileName(String filename) {
		Query query=em.createQuery("select q from question q where q.filename like '%"+filename+"%' order by q.id desc");	
		return query.getResultList();		
	}


	
	@SuppressWarnings("unchecked")
	public List<question> get_by_create_user(String arg_User) {
		Query query=em.createQuery("select q from question q where q.createUsers like '%"+arg_User+"%' order by q.id desc");	
		return query.getResultList();
	}


	
	@SuppressWarnings("unchecked")
	public List<question> get_by_create_time(String arg_time) {
		Query query=em.createQuery("select q from question q where q.createTime like '%"+arg_time+"%' order by q.id desc");	
		return query.getResultList();
	}


	
	@SuppressWarnings("unchecked")
	public List<question> get_by_last_change_user(String arg_User) {
		Query query=em.createQuery("select q from question q where q.lastEditUser like '%"+arg_User+"%' order by q.id desc");	
		return query.getResultList();
	}


	
	@SuppressWarnings("unchecked")
	public List<question> get_by_last_change_time(String arg_time) {
		Query query=em.createQuery("select q from question q where q.lastEditTime like '%"+arg_time+"%' order by q.id desc");	
		return query.getResultList();
	}





}
	

