package paper_manager;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import oracle.sql.ARRAY;
import question_manager.question;

@Stateless
@Remote(PaperQuestionRemote.class)

public class PaperQuestiondao implements PaperQuestionRemote{

	@PersistenceContext
    protected EntityManager em;
	
	public void add(PaparQuestion p) {
		// TODO Auto-generated method stub
		em.persist(p);
		
	}
	@SuppressWarnings("unchecked")
	public List<PaparQuestion> show(Integer id) {
		Query query=em.createQuery("select p from PaparQuestion p where p.parentId='"+id+"'order by p.id desc");

		List<PaparQuestion>	result= query.getResultList();
		return result;
		
	}
	
	@SuppressWarnings("unchecked")
	public String is_Paper_Use_question(Integer ID) {
		Query query=em.createQuery("select p from PaparQuestion p where p.questionId='"+ID+"'order by p.id desc");
		List<PaparQuestion>	result= query.getResultList();
		if(result.toString()=="[]")
		{
			System.out.println(result.toString());
			return "0";
		}	
		else 
		{
			String allResult = "";
			for(PaparQuestion temp : result)
			{
				query=em.createQuery("select p from PaperManager p where p.id='"+temp.getParentId()+"'order by p.id desc");
				PaperManager temPaperManager = (PaperManager) query.getSingleResult();
				allResult=temPaperManager.getExamname().toString()+"\n";
			}
			System.out.println(allResult);
			return allResult;
		}
	}
	@Override
	public void delete(Integer paperid) {
		Query query=em.createQuery("delete  from  PaparQuestion  p where p.parentId='"+paperid+"'");
		query.executeUpdate();
	}

}
