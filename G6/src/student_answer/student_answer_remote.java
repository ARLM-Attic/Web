package student_answer;

import java.util.List;
import java.util.ListResourceBundle;

import javax.ejb.Remote;

@Remote
public interface student_answer_remote {
	public void add(StudentAnswer s );
	public List<StudentAnswer> show(Integer studentid,Integer paperid);
	
	
	public  List<StudentAnswer> get(Integer studentid,Integer paperid);
	public void change(Integer studentid,Integer paperid,Integer questionid,String filename,String fileroute);
	public void change_by_id(Integer id,String filename,String fileroute,String score);
	
	public void change_score(Integer id , String score);
	public void change_temp(Integer id , String temp);
	
	public List<StudentAnswer> get_word(String term,String search,Integer studentid,Integer paperid);
	public List<StudentAnswer> get_ppt(String term,String search,Integer studentid,Integer paperid);
	public List<StudentAnswer> get_excel(String term,String search,Integer studentid,Integer paperid);
	
	public List<StudentAnswer> get_title(String search,Integer studentid,Integer paperid);
	//学生的作答情况
	public List<StudentAnswer> get_answer_condition(String search,Integer studentid,Integer paperid);

	

}	
