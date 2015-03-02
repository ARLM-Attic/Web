package teacher_qualification;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import paper_manager.PaperManager;
import paper_manager.PaperManagerRemote;
import session.StudentBeanRemote;
import student.Student;
import student_paper.StudentPaper;
import student_paper.StudentPaperRemote;

import com.opensymphony.xwork2.ActionSupport;

import common.tools;

public class Action extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	final String pjName = new tools().moduleName();
	
	public List<Student>users;
	
	public List<Model>students;
	
	public String ids;
	
	public String testid;
	
	public Integer total;//分页。。。数据总数
	
	public Integer start;//分页。。。每页开始数据
	
	public Integer limit;//分页。。。每一页数据
	
	public StudentBeanRemote remote(){
		StudentBeanRemote remote = null;
		try {
			remote = (StudentBeanRemote) new tools().getContext().lookup(pjName+"StudentBean!session.StudentBeanRemote?stateful");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	
	public qualificationBeanRemote remote1(){
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
	public PaperManagerRemote remotePaper(){
		PaperManagerRemote remote = null;
		try {
			remote = (PaperManagerRemote)new tools().getContext().lookup(pjName+"PaperManagerdao!paper_manager.PaperManagerRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	
	
	public void setTest()
	{
		HttpServletRequest request = ServletActionContext.getRequest();		
	    request.getSession().setAttribute("testid", testid);
		System.out.println(testid);
		System.out.println(testid);
	}
	
	public String getstudent()
	{
		HttpServletRequest request = ServletActionContext.getRequest();	
		String oppo=(String) request.getSession().getAttribute("testid");
		int testid=Integer.parseInt(oppo);//试卷ID
		users=new ArrayList<Student>();
		users=remote().Partstudents("学生");//得到所有學生
		students=new ArrayList<Model>();
		//--获取当前时间
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowtime=df.format(new Date());
		System.out.println("nowtime is");
		System.out.println(nowtime);
		
		PaperManager paper=new PaperManager();
		paper=remotePaper().get_by_id(testid);
		String exam_data=paper.getExam_date()+" "+paper.getStartTime();
		System.out.println("考试时间 is");
		System.out.println(exam_data);
		
		//---------
		total=users.size();
		int end=start+limit;
		if(end>users.size())//不能超过学生总数
		{
			end=users.size();
		}
		for(int i=start;i<end;i++)//只加载当前页面数据
		{
			Model ok=new Model();
			ok.setID(users.get(i).getID());
			ok.setNAME(users.get(i).getNAME());
			ok.setIDENT(users.get(i).getIDENT());
			List <qualification>fuck=new ArrayList<qualification>();
			fuck=remote1().getqualificationParts(users.get(i).getID(), testid);
			if(fuck.size()>0)
			{
				ok.setQualify("true");
			}
			else
			{
				ok.setQualify("false");
			}
			ok.setExam_date(exam_data);
			ok.setNowtime(nowtime);
			students.add(ok);
		}
		System.out.println("start:"+start+" end:"+end);
		return "students";
		
	}
	
	public void qualifucation()
	{
		HttpServletRequest request = ServletActionContext.getRequest();	
		String oppo=(String) request.getSession().getAttribute("testid");
		int testid=Integer.parseInt(oppo);//试卷ID
		String []obj=ids.split(",");
		for(int i=0;i<obj.length;i++)
		{
			Student temp=new Student();
			temp=remote().getStudent(Integer.parseInt(obj[i]));
			qualification ok=new qualification();
			ok.setStudentid(Integer.parseInt(obj[i]));
			ok.setStudentname(temp.getNAME());
			ok.setTestid(testid);
			ok.setQualify("1");
			StudentPaper tempStudentPaper = new StudentPaper();
			tempStudentPaper.setQualify("1");
			tempStudentPaper.setPaperid(testid);
			tempStudentPaper.setStu_score("未作答");
			tempStudentPaper.setStudentname(temp.getNAME());
			tempStudentPaper.setStudentid(Integer.parseInt(obj[i]));
			remote1().save(ok);
			StudentPaperRemote().add(tempStudentPaper);
		}
		
	}
	
	
	public void Cancel()
	{
		HttpServletRequest request = ServletActionContext.getRequest();	
		String oppo=(String) request.getSession().getAttribute("testid");
		int testid=Integer.parseInt(oppo);//试卷ID
		String []obj=ids.split(",");
		for(int i=0;i<obj.length;i++)
		{
			List <qualification>fuck=new ArrayList<qualification>();
			fuck=remote1().getqualificationParts(Integer.parseInt(obj[i]), testid);
			for(int k=0;k<fuck.size();k++)
			{
				remote1().delete(fuck.get(k).getId());
			}
			List<StudentPaper> s  = StudentPaperRemote().get_by_paperid_studentid(testid, Integer.parseInt(obj[i]));
			for(StudentPaper temp:s)
			{
				StudentPaperRemote().deleted(temp.getSid());
			}
		} 
	}

	public List<Student> getUsers() {
		return users;
	}

	public void setUsers(List<Student> users) {
		this.users = users;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getTestid() {
		return testid;
	}

	public void setTestid(String testid) {
		this.testid = testid;
	}

	public List<Model> getStudents() {
		return students;
	}

	public void setStudents(List<Model> students) {
		this.students = students;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
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

	
	
	
    
	
	
}
