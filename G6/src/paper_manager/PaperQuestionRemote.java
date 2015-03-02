package paper_manager;

import java.util.List;

import javax.ejb.Remote;
@Remote
public interface PaperQuestionRemote {
	public void add(PaparQuestion p);

	public List<PaparQuestion> show(Integer id);
	public String is_Paper_Use_question(Integer ID);
	
	public void delete(Integer paperid);
}
