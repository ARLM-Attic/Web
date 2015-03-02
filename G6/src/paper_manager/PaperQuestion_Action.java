package paper_manager;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import oracle.sql.ARRAY;
import question_manager.question;
import question_manager.questionRemote;

import com.opensymphony.xwork2.ActionSupport;

import common.tools;

public class PaperQuestion_Action extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer qid;
	private Integer pid;
	private Integer id;
	private String isdelete;
	private List<question> paper_question_list;
	private List<question> teacher_paper_questionlist; //老师试卷的试题
	
	HttpSession session = ServletActionContext.getRequest().getSession();
    String name=(String)session.getAttribute("name");
	final String pjName = new tools().moduleName();

	public PaperQuestionRemote remote(){
		PaperQuestionRemote remote = null;
		try {
			remote = (PaperQuestionRemote)new tools().getContext().lookup(pjName+"PaperQuestiondao!paper_manager.PaperQuestionRemote");
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
	
	public questionRemote qremote(){
		questionRemote remote = null;
		try {
			remote = (questionRemote)new tools().getContext().lookup(pjName+"questiondao!question_manager.questionRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	
	public questionRemote questionRemote(){
		questionRemote remote = null;
		try {
			remote = (questionRemote)new tools().getContext().lookup(pjName+"questiondao!question_manager.questionRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	
	
	
	public String add()
	{
		
			PaparQuestion q = new PaparQuestion();
			System.out.println("试卷的id:"+qid);
			System.out.println("题库的id"+pid);
			q.setParentId(qid);
			q.setQuestionId(pid);
			remote().add(q);

		question qq = questionRemote().get_by_id(pid);
		PaperManager pp = PaperManagerRemote().get_by_id(qid);
		Double ppsocreDouble  = Double.parseDouble(pp.getScore());
		System.out.println("题库的分数"+ppsocreDouble);
		Double qqScoreDouble = Double.parseDouble(qq.getScore());
		ppsocreDouble += qqScoreDouble;		
		System.out.println("试卷的分数"+ppsocreDouble);
		PaperManagerRemote().changeScore(ppsocreDouble.toString(), qid);
		return SUCCESS;
	}
	
	public String change()
	{
		if(isdelete.equals("0"))
		{
			remote().delete(qid);
			Date date = new Date();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String TIME = df.format(date);
			PaperManagerRemote().change_last_Edit_time_and_user(name, TIME, qid);
			
		}
		else if(isdelete.equals("-1"))
		{
			remote().delete(qid);
			return SUCCESS;
		}
		
		
			PaparQuestion q = new PaparQuestion();
			System.out.println("试卷的id:"+qid);
			System.out.println("题库的id"+pid);
			q.setParentId(qid);
			q.setQuestionId(pid);
			remote().add(q);
			
			question qq = questionRemote().get_by_id(pid);
			PaperManager pp = PaperManagerRemote().get_by_id(qid);
			Double ppsocreDouble  = Double.parseDouble(pp.getScore());
			System.out.println("题库的分数"+ppsocreDouble);
			Double qqScoreDouble = Double.parseDouble(qq.getScore());
			ppsocreDouble += qqScoreDouble;		
			System.out.println("试卷的分数"+ppsocreDouble);
			PaperManagerRemote().changeScore(ppsocreDouble.toString(), qid);
			return SUCCESS;
	}
	
	public String show()
	{
		paper_question_list = new ArrayList<question>();
		System.out.println("id："+id);
		List<PaparQuestion> p = remote().show(id);
		System.out.println("PaparQuestion长度"+p.size());
		for(int i = 0 ; i < p.size();i++)
		{
			System.out.println(p.get(i).getQuestionId());
			question question = qremote().get_by_id(p.get(i).getQuestionId());
			
			paper_question_list.add(question);
		}
		System.out.println("paper_question_list长度:"+paper_question_list.size());
		return SUCCESS;
	}



	public Integer getQid() {
		return qid;
	}


	public void setQid(Integer qid) {
		this.qid = qid;
	}


	public Integer getPid() {
		return pid;
	}


	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public List<question> getPaper_question_list() {
		return paper_question_list;
	}
	public void setPaper_question_list(List<question> paper_question_list) {
		this.paper_question_list = paper_question_list;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<question> getTeacher_paper_questionlist() {
		return teacher_paper_questionlist;
	}

	public void setTeacher_paper_questionlist(
			List<question> teacher_paper_questionlist) {
		this.teacher_paper_questionlist = teacher_paper_questionlist;
	}

	public String getIsdelete() {
		return isdelete;
	}

	public void setIsdelete(String isdelete) {
		this.isdelete = isdelete;
	}
			
}
