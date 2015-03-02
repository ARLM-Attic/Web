package paper_manager;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
@Remote(PaperManagerRemote.class)
public class PaperManagerdao implements PaperManagerRemote {

	@PersistenceContext
	protected EntityManager em;

	@SuppressWarnings("unchecked")
	public List<PaperManager> show() {
		Query query = em.createQuery("select p from PaperManager p order by p.id desc");
		List<PaperManager> result = query.getResultList();
		return result;
	}

	public void del(Integer ID) {
		em.remove(em.find(PaperManager.class, ID));

	}

	@Override
	public Integer add(PaperManager p) {
		em.persist(p);
		em.flush();
		return p.getId();
	}

	@Override
	public PaperManager get_by_id(Integer ID) {
		return em.find(PaperManager.class, ID);
	}

	@Override
	public void changeScore(String score, Integer ID) {
		Query query = em.createQuery("update PaperManager as s set s.score=:score where s.id=:id ");
		query.setParameter("score", score);
		query.setParameter("id", ID);

		query.executeUpdate();
	}

	public void change_last_Edit_time_and_user(String lastuser,String lasttime, Integer id) {
		Query query = em.createQuery("update PaperManager as s set s.lastChangeTime=:lasttime , s.lastChangeUser=:lastuser where s.id=:id ");
		query.setParameter("lasttime", lasttime);
		query.setParameter("lastuser", lastuser);
		query.setParameter("id", id);

		query.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getPaperName(Integer id) {
		Query query = em.createQuery("select p from PaperManager p where p.id= '" + id+ "'");
		List<PaperManager> result = query.getResultList();
		return result.get(0).getExamname();

	}



	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_lastChangeTime(String lastChangeTime) {
		Query query = em
				.createQuery("select q from PaperManager q where q.lastChangeTime like '%"
						+ lastChangeTime + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_lastChangeUser(String user) {
		Query query = em
				.createQuery("select q from PaperManager q where q.lastChangeUser like '%"
						+ user + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_examname(String examname) {
		Query query = em
				.createQuery("select q from PaperManager q where q.examname like '%"
						+ examname + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_examdate(String examdate) {
		Query query = em
				.createQuery("select q from PaperManager q where q.exam_date like '%"
						+ examdate + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_start_time(String startTime) {
		Query query = em
				.createQuery("select q from PaperManager q where q.startTime like '%"
						+ startTime + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_end_time(String endtime) {
		Query query = em
				.createQuery("select q from PaperManager q where q.endTime like '%"
						+ endtime + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_create_user(String user) {
		Query query = em
				.createQuery("select q from PaperManager q where q.lastChangeUser like '%"
						+ user + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<PaperManager> get_by_create_time(String time) {
		Query query = em
				.createQuery("select q from PaperManager q where q.createPaperTime like '%"
						+ time + "%' order by q.id desc");
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PaperManager> show(Integer start, Integer limit) {
		Query query = em
				.createQuery("select p from PaperManager p order by p.id desc");
		List<PaperManager> result = query.setFirstResult(start)
				.setMaxResults(2).getResultList();
		return result;
	}

	@Override
	public Integer showLength() {
		return Integer.parseInt(em
				.createQuery("select count(*) from PaperManager")
				.getSingleResult().toString());
	}

}
