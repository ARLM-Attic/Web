package score;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Remote;
import javax.naming.NamingException;

import paper_manager.PaperManager;
import paper_manager.PaperManagerRemote;
import session.StudentBeanRemote;
import student_paper.StudentPaper;
import student_paper.StudentPaperRemote;
import teacher_qualification.qualification;
import teacher_qualification.qualificationBeanRemote;

import com.opensymphony.xwork2.ActionSupport;

import common.tools;

public class Action extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	final String pjName = new tools().moduleName();
	private List<studentScore> stu_Scores;
	private Integer start;
	private Integer limit ;
	private Integer length ; //分页三巨头 
	private String term;
	private String search; 
	public qualificationBeanRemote qualificationBeanRemote(){
		qualificationBeanRemote remote = null;
		try {
			remote = (qualificationBeanRemote) new tools().getContext().lookup(pjName+"qualificationBean!teacher_qualification.qualificationBeanRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	

	public StudentPaperRemote StudentPaperRemote(){
		StudentPaperRemote remote= null;
		try {
			remote = (StudentPaperRemote) new tools().getContext().lookup(pjName+"StudentPaperdao!student_paper.StudentPaperRemote");
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
	
	
	
	@SuppressWarnings({  "unchecked" })
	public String get() throws UnsupportedEncodingException
	{
		is_Search_end();//判断search是否为"",如果是term为""
		boolean flag  = true;
		List<StudentPaper> stuCondition = null;
		List<PaperManager> paperManagers = null;
		List<studentScore> studentScoretemp = new ArrayList<studentScore>();
		switch (getTerm()) {
		case "学号":
			stuCondition = StudentPaperRemote().get_by_studentID(getSearch());
			break;
		case "学生名字":
			stuCondition = StudentPaperRemote().get_by_studentName(getSearch());
			break;
		case "考试名称":		
			paperManagers = PaperManagerRemote().get_by_examname(getSearch());
			flag  = false;
			break;
		case "出卷老师":
			paperManagers = PaperManagerRemote().get_by_create_user(getSearch());
			flag  = false;
			break;
		default:
			stuCondition = StudentPaperRemote().get();				
		}
		if (flag) // 如果是true的情况
		{
			if (stuCondition.toString() == "[]") 
			{
				length = 0;
				stu_Scores = null;
				return SUCCESS;
			} 
			else
			{
				studentScoretemp = Use_studentPaper_get_paperManeger(stuCondition, studentScoretemp);
			}
		} 
		
		else//如果是false
		{
			if (paperManagers.toString() == "[]") 
			{
				length = 0;
				stu_Scores = null;
				return SUCCESS;
			} 
			else 
			{
				studentScoretemp = Use_paperManeger_studentPaper(paperManagers,studentScoretemp);
				if(studentScoretemp == null)
				{ 
					length = 0;
				    stu_Scores = null;
				    return SUCCESS;
				}
				
			}
		}

		length = studentScoretemp.size();
		stu_Scores = (List<studentScore>) new tools().page(start, limit,studentScoretemp);
		
		return SUCCESS;

	}

	public List<studentScore> getStu_Scores() {
		return stu_Scores;
	}

	public void setStu_Scores(List<studentScore> stu_Scores) {
		this.stu_Scores = stu_Scores;
	}


	public Integer getStart() {
		return start;
	}


	public void setStart(Integer start) {
		this.start = start;
	}


	public Integer getLimit() {
		return limit;
	}


	public void setLimit(Integer limit) {
		this.limit = limit;
	}


	public Integer getLength() {
		return length;
	}


	public void setLength(Integer length) {
		this.length = length;
	}


	public String getTerm() throws UnsupportedEncodingException {
		if(term==null)
		{
			setTerm("");
		}
		return term;
	}


	public void setTerm(String term) throws UnsupportedEncodingException {
		this.term = URLDecoder.decode(term,"UTF-8");;
	}


	public String getSearch() throws UnsupportedEncodingException {
		if(search==null)
		{
			setSearch("");			
		}
		return search;
	}
	
	public void setSearch(String search) throws UnsupportedEncodingException {	
		this.search = URLDecoder.decode(search,"UTF-8");	
	}
	
	public void is_Search_end() throws UnsupportedEncodingException
	{
		if(getSearch().equals(""))
		{	
			setTerm("");;
		}	
	}

	public List<studentScore> Use_studentPaper_get_paperManeger(List<StudentPaper> stuCondition,List<studentScore> studentScoretemp)
	{
		for (StudentPaper studentPaper : stuCondition) {
			PaperManager p = PaperManagerRemote().get_by_id(studentPaper.getPaperid());
			if (p == null)
				continue;
			else {
				studentScore studentScoreTemp = new studentScore(
						p.getExamname(), 
						studentPaper.getStudentname(),
						studentPaper.getStudentid(),
						studentPaper.getStu_score(),
						p.getCreatePapaerUser(),
						p.getId()
						);
					studentScoretemp.add(studentScoreTemp);
			}
		}
		return studentScoretemp;
	}
	
	public List<studentScore> Use_paperManeger_studentPaper(List<PaperManager> paperManager,List<studentScore> studentScoretemp)
	{
		for (PaperManager p : paperManager) {
			List<StudentPaper> studentPapertemp = StudentPaperRemote().get_by_paperid(p.getId());
			if (studentPapertemp.toString()=="[]")
				return null;
			else {
				for(StudentPaper s :studentPapertemp)
				{
				studentScore studentScoreTemp = new studentScore(p.getExamname(), s.getStudentname(),
						s.getStudentid(),
						s.getStu_score(),
						p.getCreatePapaerUser(),
						p.getId()
						);
				studentScoretemp.add(studentScoreTemp);
				}
			}
		}
		return studentScoretemp;
	}
	
}
