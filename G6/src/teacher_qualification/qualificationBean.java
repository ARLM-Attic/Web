package teacher_qualification;

import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
@Remote(qualificationBeanRemote.class)
public class qualificationBean implements qualificationBeanRemote {

	
	@PersistenceContext
	 EntityManager em;
	
	@Override
	public void save(qualification temp) {
		em.persist(temp);
	}

	@Override
	public void update(qualification temp) {
		em.merge(temp);

	}

	@Override
	public void delete(Integer id) {
		em.remove(em.getReference(qualification.class, id));
	}

	@Override
	public qualification getqualification(Integer id) {
		return em.find(qualification.class, id);
	}



	@SuppressWarnings("unchecked")
	@Override
	public List<qualification> getqualificationParts(Integer studentid,Integer testid) {
		return em.createQuery("select o from qualification o where STUDENTID='" + studentid  + "'AND TESTID='" + testid  + "' order by o.testid desc").getResultList();
	}
	
 
}
