package student_paper;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import paper_manager.PaperManager;
import question_manager.question;
@Stateless
@Remote(StudentPaperRemote.class)
public class StudentPaperdao implements StudentPaperRemote{

	@PersistenceContext
    protected EntityManager em;

	
	public void change_by_id(Integer ID,String score) {
		Query query=em.createQuery("update StudentPaper as q set q.stu_score=:stu_score where q.id ="+ID);
		query.executeUpdate();
	}

	@Override
	public void add(StudentPaper s) {
		em.persist(s);
	}
	
	@SuppressWarnings("unchecked")
	public String getScore(Integer paperid,Integer sid)
	{
		Query query=em.createQuery("select s from StudentPaper s where s.paperid='"+paperid+"'and s.studentid='"+sid+"' order by s.paperid desc");

		List<StudentPaper> result=  query.getResultList();
		System.out.println(result.toString());
		return result.toString()=="[]"?"未作答":result.get(0).getStu_score();
	
	}
	
	@SuppressWarnings("unchecked")
	public List<StudentPaper> get_by_paperid_studentid(Integer paperid,Integer sid)
	{
		Query query=em.createQuery("select s from StudentPaper s where s.paperid='"+paperid+"'and s.studentid='"+sid+"' order by s.paperid desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<StudentPaper> get_by_studentid(Integer sid) {
		Query query=em.createQuery("select s from StudentPaper s where s.studentid='"+sid+"' order by s.paperid desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<StudentPaper> get() {
		Query query=em.createQuery("select s from StudentPaper s where s.qualify='1' order by s.paperid desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<StudentPaper> get_by_studentID(String id) {
		Query query=em.createQuery("select s from StudentPaper s where s.studentid like '%"+id+"%' order by s.paperid desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<StudentPaper> get_by_studentName(String name) {
		Query query=em.createQuery("select s from StudentPaper s where s.studentname like '%"+name+"%' order by s.paperid desc");
		return query.getResultList();
	}

	
	@SuppressWarnings("unchecked")
	public List<StudentPaper> get_by_paperid(Integer paperid) {
		Query query=em.createQuery("select s from StudentPaper s where s.paperid = '"+paperid+"' order by s.paperid desc");
		return query.getResultList();
	}

	@Override
	public void deleted(Integer id) {
		em.remove(em.find(StudentPaper.class, id));
	}

	@Override
	public void change_score_by_paperid_and_studentid(Integer paperid,Integer studentid, String score) {
		Query query=em.createQuery("update StudentPaper as q set q.stu_score=:stu_score where q.paperid =:paperid and q.studentid=:studentid");
		query.setParameter("stu_score", score);
		query.setParameter("paperid", paperid);
		query.setParameter("studentid", studentid);
		query.executeUpdate();
		
	}
}
