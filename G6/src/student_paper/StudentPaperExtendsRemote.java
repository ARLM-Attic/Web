package student_paper;


import java.util.List;

import javax.ejb.Remote;

@Remote
public interface StudentPaperExtendsRemote {
	public List<studentPaperExtends> show(Integer sid);
	//['考试名称'],['考试日期'],['出卷人'],['开始时间'],['结束时间']
	public List<studentPaperExtends> get_by_Examname(Integer sid,String examname);
	
	public List<studentPaperExtends> get_by_examdate(Integer sid,String exam_date);
	
	public List<studentPaperExtends> get_by_create_user(Integer sid,String user);
	
	public List<studentPaperExtends> get_by_start_time(Integer sid,String startTime);
	
	public List<studentPaperExtends> get_by_End_time(Integer sid,String EndTime);
	
	
}
