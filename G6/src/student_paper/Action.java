package student_paper;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Remote;
import javax.naming.NamingException;
import javax.persistence.Query;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import paper_manager.PaperManager;
import teacher_qualification.qualification;
import teacher_qualification.qualificationBeanRemote;

import com.opensymphony.xwork2.ActionSupport;

import common.tools;

public class Action extends ActionSupport{
	
	public List<studentPaperExtends> get_studentPaper;
	
	HttpSession session = ServletActionContext.getRequest().getSession();
    String name=(String)session.getAttribute("name");
    Integer studentid = (Integer)session.getAttribute("id");
	final String pjName = new tools().moduleName();
	private Integer start;
	private Integer limit ;
	private Integer length ; //分页三巨头 
    private String search ;
    private String term;
    
	public StudentPaperExtendsRemote StudentPaperExtendsRemote(){
		StudentPaperExtendsRemote remote = null;
		try {
			remote = (StudentPaperExtendsRemote)new tools().getContext().lookup(pjName+"StudentPaperExtendsdao!student_paper.StudentPaperExtendsRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	

 	
	
	@SuppressWarnings("unchecked")
	public String get() throws Exception
	{
		is_Search_end();//判断search是否为"",如果是term为""
		System.out.println(getTerm());	
	
		List<studentPaperExtends> temp = new ArrayList<studentPaperExtends>();
		
		switch (getTerm()) {
		//	['考试名称'],['考试日期'],['出卷人'],['开始时间'],['结束时间']
			case "考试名称":
				temp = StudentPaperExtendsRemote().get_by_Examname(studentid, getSearch());
				break;
			case "考试日期":
				temp = StudentPaperExtendsRemote().get_by_examdate(studentid, getSearch());
				break;
			case "出卷人":
				temp = StudentPaperExtendsRemote().get_by_create_user(studentid,getSearch());
				break;
			case "开始时间":
				temp = StudentPaperExtendsRemote().get_by_start_time(studentid, getSearch());
				break;
			case "结束时间":
				temp = StudentPaperExtendsRemote().get_by_End_time(studentid, getSearch());
				break;
			default:
				temp = StudentPaperExtendsRemote().show(studentid);
				break;
			}
		if(temp == null)
		{
			length = 0 ;
			
		}
		else
		{
			length = temp.size();
			get_studentPaper = (List<studentPaperExtends>) new tools().page(start, limit, temp);
		}
		return SUCCESS;
	}

	public List<studentPaperExtends> getGet_studentPaper() {
		return get_studentPaper;
	}

	public void setGet_studentPaper(List<studentPaperExtends> get_studentPaper) {
		this.get_studentPaper = get_studentPaper;
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
}
