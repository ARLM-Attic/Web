package student_paper;


import java.util.ArrayList;
import java.util.List;

import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import common.tools;
import paper_manager.PaperManager;
import paper_manager.PaperManagerRemote;
import teacher_qualification.qualificationBeanRemote;




@Stateless
@Remote(StudentPaperExtendsRemote.class)
public class StudentPaperExtendsdao implements StudentPaperExtendsRemote {
	final String pjName = new tools().moduleName();

	public qualificationBeanRemote qualificationBeanRemote(){
		qualificationBeanRemote remote1 = null;
		try {
			remote1 = (qualificationBeanRemote) new tools().getContext().lookup(pjName+"qualificationBean!teacher_qualification.qualificationBeanRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote1;
	}
	
	
 	public StudentPaperRemote StudentPaperRemote(){
 		StudentPaperRemote remote = null;
		try {
			remote = (StudentPaperRemote)new tools().getContext().lookup(pjName+"StudentPaperdao!student_paper.StudentPaperRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
 	
	
	public PaperManagerRemote PaperManagerRemote(){
		PaperManagerRemote remote = null;
		try {
			remote = (PaperManagerRemote)new tools().getContext().lookup(pjName+"PaperManagerdao!paper_manager.PaperManagerRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
 	

	@PersistenceContext
    protected EntityManager em;
	
	public List<studentPaperExtends> show(Integer sid) {

		List<studentPaperExtends> studentPaperExtendsListTemp = null;
		// 先搜索学生试卷的页面
		List<StudentPaper> studentPaperTemp = StudentPaperRemote().get_by_studentid(sid);
		// 如果搜不到
		if (studentPaperTemp.toString() == "") {
			return null;
		} else {
			studentPaperExtendsListTemp = new ArrayList<studentPaperExtends>();
			for (StudentPaper s : studentPaperTemp) {
				PaperManager p = PaperManagerRemote().get_by_id(s.getPaperid());
				studentPaperExtends studentPaperExtendsTemp = new studentPaperExtends(p, s);
				studentPaperExtendsListTemp.add(studentPaperExtendsTemp);
			}
		}
		return studentPaperExtendsListTemp;
	}


	@Override
	public List<studentPaperExtends> get_by_Examname(Integer sid,String examname) {
		List<studentPaperExtends> studentPaperExtendsListTemp = null;
		// 先搜索学生试卷的页面
		List<StudentPaper> studentPaperTemp = StudentPaperRemote().get_by_studentid(sid);
		// 如果搜不到
		if (studentPaperTemp.toString() == "") {
			return null;
		} else {
			studentPaperExtendsListTemp = new ArrayList<studentPaperExtends>();
			for (StudentPaper s : studentPaperTemp) {
				PaperManager p = PaperManagerRemote().get_by_id(s.getPaperid());
				if(p.getExamname().indexOf(examname)!=-1)
				{
					studentPaperExtends studentPaperExtendsTemp = new studentPaperExtends(p, s);
					studentPaperExtendsListTemp.add(studentPaperExtendsTemp);
				}
				else continue;
			}
		}
		return studentPaperExtendsListTemp;
	}

	
	
	public List<studentPaperExtends> get_by_examdate(Integer sid,String exam_date) {
		List<studentPaperExtends> studentPaperExtendsListTemp = null;
		// 先搜索学生试卷的页面
		List<StudentPaper> studentPaperTemp = StudentPaperRemote().get_by_studentid(sid);
		// 如果搜不到
		if (studentPaperTemp.toString() == "") {
			return null;
		} else {
			studentPaperExtendsListTemp = new ArrayList<studentPaperExtends>();
			for (StudentPaper s : studentPaperTemp) {
				PaperManager p = PaperManagerRemote().get_by_id(s.getPaperid());
				if(p.getExam_date().indexOf(exam_date)!=-1)
				{
					studentPaperExtends studentPaperExtendsTemp = new studentPaperExtends(p, s);
					studentPaperExtendsListTemp.add(studentPaperExtendsTemp);
				}
				else continue;
			}
		}
		return studentPaperExtendsListTemp;
	}


	@Override
	public List<studentPaperExtends> get_by_create_user(Integer sid, String user) {
		List<studentPaperExtends> studentPaperExtendsListTemp = null;
		// 先搜索学生试卷的页面
		List<StudentPaper> studentPaperTemp = StudentPaperRemote().get_by_studentid(sid);
		// 如果搜不到
		if (studentPaperTemp.toString() == "") {
			return null;
		} else {
			studentPaperExtendsListTemp = new ArrayList<studentPaperExtends>();
			for (StudentPaper s : studentPaperTemp) {
				PaperManager p = PaperManagerRemote().get_by_id(s.getPaperid());
				if(p.getCreatePapaerUser().indexOf(user)!=-1)
				{
					studentPaperExtends studentPaperExtendsTemp = new studentPaperExtends(p, s);
					studentPaperExtendsListTemp.add(studentPaperExtendsTemp);
				}
				else continue;
			}
		}
		return studentPaperExtendsListTemp;
	}
	


	public List<studentPaperExtends> get_by_start_time(Integer sid,String startTime) {
		List<studentPaperExtends> studentPaperExtendsListTemp = null;
		// 先搜索学生试卷的页面
		List<StudentPaper> studentPaperTemp = StudentPaperRemote().get_by_studentid(sid);
		// 如果搜不到
		if (studentPaperTemp.toString() == "") {
			return null;
		} else {
			studentPaperExtendsListTemp = new ArrayList<studentPaperExtends>();
			for (StudentPaper s : studentPaperTemp) {
				PaperManager p = PaperManagerRemote().get_by_id(s.getPaperid());
				if(p.getStartTime().indexOf(startTime)!=-1)
				{
					studentPaperExtends studentPaperExtendsTemp = new studentPaperExtends(p, s);
					studentPaperExtendsListTemp.add(studentPaperExtendsTemp);
				}
				else continue;
			}
		}
		return studentPaperExtendsListTemp;
	}


	@Override
	public List<studentPaperExtends> get_by_End_time(Integer sid, String EndTime) {
		List<studentPaperExtends> studentPaperExtendsListTemp = null;
		// 先搜索学生试卷的页面
		List<StudentPaper> studentPaperTemp = StudentPaperRemote().get_by_studentid(sid);
		// 如果搜不到
		if (studentPaperTemp.toString() == "") {
			return null;
		} else {
			studentPaperExtendsListTemp = new ArrayList<studentPaperExtends>();
			for (StudentPaper s : studentPaperTemp) {
				PaperManager p = PaperManagerRemote().get_by_id(s.getPaperid());
				if(p.getEndTime().indexOf(EndTime)!=-1)
				{
					studentPaperExtends studentPaperExtendsTemp = new studentPaperExtends(p, s);
					studentPaperExtendsListTemp.add(studentPaperExtendsTemp);
				}
				else continue;
			}
		}
		return studentPaperExtendsListTemp;
	}
}
