package student_answer;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import question_manager.question;

@Stateless
@Remote(student_answer_remote.class)
public class student_answer_dao implements student_answer_remote {

	@PersistenceContext
	protected EntityManager em;

	public void add(StudentAnswer s) {

		em.persist(s);
	}

	public List<StudentAnswer> show(Integer studentid, Integer paperid) {
		Query query = em
				.createQuery("select s from StudentAnswer s where s.stuId=:stuId and s.paper=:paper");
		query.setParameter("stuId", studentid);
		query.setParameter("paper", paperid);

		@SuppressWarnings("unchecked")
		List<StudentAnswer> list = query.getResultList();

		System.out.println("fanhui:" + list.size());
		return list;

	}

	public List<StudentAnswer> get(Integer studentid, Integer paperid) {
		Query query = em
				.createQuery("select s from StudentAnswer s where s.stuId=:stuId and s.paper=:paper");
		query.setParameter("stuId", studentid);
		query.setParameter("paper", paperid);
		@SuppressWarnings("unchecked")
		List<StudentAnswer> list = query.getResultList();
		return list;
	}

	@SuppressWarnings("unchecked")
	public void change(Integer studentid, Integer paperid, Integer questionid,
			String filename, String fileroute) {
		// TODO Auto-generated method stub
		Query query = em
				.createQuery("update StudentAnswer as s set s.condition=:condition,s.stuAnswer=:stuAnswer,s.stuAnswerName=:stuAnswerName where s.stuId=:stuId and s.paper=:paper and s.questionid=:questionid");
		query.setParameter("stuAnswer", fileroute);
		query.setParameter("stuAnswerName", filename);
		query.setParameter("questionid", questionid);
		query.setParameter("stuId", studentid);
		query.setParameter("paper", paperid);
		query.setParameter("condition", "已上传");
		query.executeUpdate();
	}

	public void change_by_id(Integer id, String filename, String fileroute,
			String score) {
		Query query = em
				.createQuery("update StudentAnswer as s set s.condition=:condition,s.stuAnswer=:stuAnswer,s.stuAnswerName=:stuAnswerName ,s.temp=:temp where s.id=:id");
		query.setParameter("stuAnswer", fileroute);
		query.setParameter("stuAnswerName", filename);

		query.setParameter("id", id);
		query.setParameter("temp", score);
		query.setParameter("condition", "已上传");
		query.executeUpdate();

	}

	public void change_score(Integer id, String score) {
		Query query = em.createQuery("update StudentAnswer as s set "
				+ "s.stuScore=:stuScore  " + "where s.id=:id");
		query.setParameter("stuScore", score);

		query.setParameter("id", id);

		query.executeUpdate();
	}

	public void change_temp(Integer id, String temp) {
		Query query = em
				.createQuery("update StudentAnswer as s set s.temp=:temp  where s.id=:id");
		query.setParameter("temp", temp);

		query.setParameter("id", id);

		query.executeUpdate();

	}

	@SuppressWarnings("unchecked")
	public List<StudentAnswer> get_word(String term, String search,
			Integer studentid, Integer paperid) {
		if (search.equals("")) {
			Query query = em
					.createQuery("select q from StudentAnswer q where q.type=:type and q.stuId=:stuId and q.paper=:paper");
			query.setParameter("stuId", studentid);
			query.setParameter("paper", paperid);
			query.setParameter("type", "Word题目");
			return query.getResultList();
		} else {
			System.out.println(search);
			Query query = em
					.createQuery("select q from StudentAnswer q where q.type='Word题目' and q.title like '%"
							+ search + "%' q.stuId=:stuId and q.paper=:paper");
			query.setParameter("stuId", studentid);
			query.setParameter("paper", paperid);
			return query.getResultList();
		}
	}

	@SuppressWarnings("unchecked")
	public List<StudentAnswer> get_ppt(String term, String search,
			Integer studentid, Integer paperid) {
		if (search.equals("")) {
			Query query = em
					.createQuery("select q from StudentAnswer q where q.type=:type and q.stuId=:stuId and q.paper=:paper");
			query.setParameter("stuId", studentid);
			query.setParameter("paper", paperid);
			query.setParameter("type", "PowerPoint题目");
			return query.getResultList();
		} else {
			System.out.println(search);
			Query query = em
					.createQuery("select q from StudentAnswer q where q.type='PowerPoint题目' and q.title like '%"
							+ search + "%' s.stuId=:stuId and s.paper=:paper");
			query.setParameter("stuId", studentid);
			query.setParameter("paper", paperid);
			return query.getResultList();
		}
	}

	@SuppressWarnings("unchecked")
	public List<StudentAnswer> get_excel(String term, String search,
			Integer studentid, Integer paperid) {
		if (search.equals("")) {
			Query query = em
					.createQuery("select q from StudentAnswer q where q.type=:type and q.stuId=:stuId and q.paper=:paper");
			query.setParameter("stuId", studentid);
			query.setParameter("paper", paperid);
			query.setParameter("type", "Excel题目");
			return query.getResultList();
		} else {
			System.out.println(search);
			Query query = em
					.createQuery("select q from StudentAnswer q where q.type='Excel题目' and q.title like '%"
							+ search + "%' and q.stuId=:stuId and q.paper=:paper");
			query.setParameter("stuId", studentid);
			query.setParameter("paper", paperid);
			return query.getResultList();
		}
	}

	@SuppressWarnings("unchecked")
	public List<StudentAnswer> get_title(String search, Integer studentid,
			Integer paperid) {
		Query query = em
				.createQuery("select q from StudentAnswer q where  q.title like '%"
						+ search
						+ "%' and "
						+ "q.stuId=:stuId and "
						+ "q.paper=:paper ");
		query.setParameter("stuId", studentid);
		query.setParameter("paper", paperid);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<StudentAnswer> get_answer_condition(String search,
			Integer studentid, Integer paperid) {
		Query query = em.createQuery("select q from StudentAnswer q where  "
				+ "q.condition like '%" + search + "%' and "
				+ "q.stuId=:stuId and q.paper=:paper");
		query.setParameter("stuId", studentid);
		query.setParameter("paper", paperid);
		return query.getResultList();
	}

}
