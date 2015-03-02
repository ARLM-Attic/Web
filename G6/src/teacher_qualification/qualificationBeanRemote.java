package teacher_qualification;

import java.util.List;

import javax.ejb.Remote;


@Remote
public interface qualificationBeanRemote {
	
	    public void save (qualification temp);
		
		public void update (qualification temp);
		
		public void delete (Integer id);//根据id进行删除
		
		public qualification getqualification(Integer id);
		
		
		public List<qualification> getqualificationParts(Integer studentid,Integer testid);



		
}
