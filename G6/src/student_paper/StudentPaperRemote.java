package student_paper;

import java.util.List;

import javax.ejb.Remote;

@Remote
public interface StudentPaperRemote {
	public void change_by_id(Integer ID,String score);
	
	public void add(StudentPaper s);
	
	public String getScore(Integer paperid,Integer sid);
	
	public List<StudentPaper> get_by_paperid_studentid(Integer paperid,Integer sid);

	public List<StudentPaper> get_by_studentid(Integer sid);
	
	public void deleted(Integer id);
	//模糊搜索
	public List<StudentPaper> get();//根据考试的权限搜索
	
	public List<StudentPaper> get_by_studentID(String id);
	
	public List<StudentPaper> get_by_studentName(String name);
	
	public List<StudentPaper> get_by_paperid(Integer paperid);
	
	public void change_score_by_paperid_and_studentid(Integer paperid,Integer studentid,String score);
 }
