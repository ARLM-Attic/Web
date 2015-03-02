package paper_manager;

import java.util.List;

import javax.ejb.Remote;

@Remote
public interface PaperManagerRemote {
	public List<PaperManager> show();
	public Integer showLength();
	public List<PaperManager> show(Integer start,Integer limit);
	public void del(Integer ID);
	public Integer add(PaperManager p);
	
	public PaperManager get_by_id(Integer ID);

	public List<PaperManager> get_by_lastChangeTime(String lastChangeTime);
	
	public List<PaperManager> get_by_lastChangeUser(String user);
	
	public List<PaperManager> get_by_examname(String examname);
	
	public List<PaperManager> get_by_examdate(String examdate);
	
	public List<PaperManager> get_by_start_time(String startTime);

	public List<PaperManager> get_by_end_time(String endtime);
	
	public List<PaperManager> get_by_create_user(String user);
	
	public List<PaperManager> get_by_create_time(String time);

	public void  changeScore(String score,Integer ID);
	
	public void change_last_Edit_time_and_user(String lastuser,String lasttime,Integer id);
	
	public String getPaperName(Integer id);
} 
