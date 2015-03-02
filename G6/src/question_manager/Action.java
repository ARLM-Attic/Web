package question_manager;
import jacob.CallCsharp;
import jacob.Excel;
import jacob.comTest;

import java.io.File;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import javax.servlet.ServletContext;
import javax.naming.NamingException;
import javax.servlet.http.HttpSession;

import org.apache.struts2.util.ServletContextAware;

import paper_manager.PaperQuestionRemote;


import com.opensymphony.xwork2.ActionSupport;

import common.tools;



public class Action extends ActionSupport implements Serializable, ServletContextAware  {

	private static final long serialVersionUID = 1L;
	private List<question> question_manager ;
	private String question;
	private String type ;
	private String title;	
	private File answer;
	private String answerFileName;
	private Integer	ID;
    private String search ;
    private String term;
	private boolean success = true ;
	final String pjName = new tools().moduleName();
    private String judge; 
	private ServletContext servletContext;
	HttpSession session = ServletActionContext.getRequest().getSession();
    String name=(String)session.getAttribute("name");
    public Integer start;
    public Integer limit;
    private Integer length;//分页三巨头


	public questionRemote remote(){
		questionRemote remote = null;
		try {
			remote = (questionRemote)new tools().getContext().lookup(pjName+"questiondao!question_manager.questionRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	
	public PaperQuestionRemote PaperQuestionRemote(){
		PaperQuestionRemote remote = null;
		try {
			remote = (PaperQuestionRemote)new tools().getContext().lookup(pjName+"PaperQuestiondao!paper_manager.PaperQuestionRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	
	
	public String del()
	{
		//判断有没有出来试卷
		judge =PaperQuestionRemote().is_Paper_Use_question(getID());
		
		System.out.println("judge:"+judge);
		if(judge.equals("0")) // 没有出了试卷
		{
			remote().delete(getID());
			return SUCCESS;
		}
		else
		{
			success = false;
			return SUCCESS;
		}
		
	}
	
	@SuppressWarnings({ "unchecked" })
	public String get() throws UnsupportedEncodingException
	{
		List<question> temp = new ArrayList<question>();

		if(getTerm()==null)
		{
			System.out.println("空");
			term ="";					
		}
		if(getSearch()==null)
		{
			search ="";					
		}
		term=URLDecoder.decode(term,"UTF-8");
		
		search = URLDecoder.decode(search,"UTF-8");
		
		if(!(term!="Word题目"||term!="PowerPoint题目"||term!="Excel题目")&&search.equals(""))
		{	
			term="";
		}
		System.out.println(term);
		//	data : [['题目编号'],['题目标题'],['文件名'],['创建人'],['创建时间'],['最后修改人'],['最后修改时间'],['Word题目'], [ 'PowerPoint题目'], [ 'Excel题目']]  

		switch (term) {
		case "题目标题":
			temp = remote().get_by_title(search);
			break;
		case "文件名":
			temp = remote().get_by_fileName(search)	;
			break;
		case "创建人":
			temp = remote().get_by_create_user(search);
			break;
		case "创建时间":
			temp = remote().get_by_create_time(search);
			break;
		case "最后修改人":
			temp = remote().get_by_create_user(search);
			break;
		case "最后修改时间":
			temp = remote().get_by_last_change_time(search);
			break;
		case "Word题目":
			temp = remote().get_word(search);
			break;
		case "PowerPoint题目":
			temp = remote().get_ppt(search);
			break;
		case "Excel题目"	:
			temp = remote().get_excel(search);
			break;		
		default:
			temp= remote().get();			/*question_container p = remote().get(start, limit);
			length  = p.getLength();
			question_manager = p.getList();*/
		
			System.out.println("可以了？");
			break;
		}
		
		length = temp.size();
		question_manager = (List<question_manager.question>) new tools().page(start, limit, temp);	
		
		return SUCCESS;
	}
	public String change_question()
	{
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		String TIME = df.format(date);
		remote().change_Question(title, type, question, name, TIME, ID);
		return SUCCESS;
	}
	
	public String change_file() 
	{
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		String TIME = df.format(date);
		String route;
		try {
			route = upload(TIME, type, answer, answerFileName);
			remote().change_file(title, type, question, route, answerFileName, name, TIME, ID);
		} catch (Exception e) {
			success =false ;
			e.printStackTrace();
		}
		
		return SUCCESS;
	}
	
	public String add() 
	{
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss ");
		String TIME = df.format(date);
		System.out.println(TIME);		
	
		
			String route;
			try {
				route = upload(TIME, type, answer, answerFileName);
	
			question q =new question(TIME, name, TIME,name, question,type,route,"已上传", title,answerFileName);
			q.setScore("0");
			//remote().insert(q);	
			Integer fid = remote().insert(q);	
			System.out.println("id:"+fid);
			int i = answerFileName.lastIndexOf(".");
			String s = answerFileName.substring(i+1); //文件扩展名
			System.out.println("扩展名"+s);
			if(s.equals("docx")){
				
				try{
					String imgPath=servletContext.getRealPath("/data/word");
					new CallCsharp().Work(fid, 0, route,imgPath);	
				}
				catch(Exception e){
					System.out.println("调用word解析错误" + e.getMessage().toString());
					success = false ;				
					e.printStackTrace();
					return ERROR;
				}
				//调用解析，，.	 String c = new CallCsharp().Work(ID, 0, filePath);//试卷ID,教师为0,文档路径
				
			}
			else if(s.equals("pptx")){
				//调用解析，，，
				try{
					String xmlpath=servletContext.getRealPath("/data/word")+"\\";
					new comTest().pptParse(fid, 0, route, xmlpath);		
				}
				catch(Exception e){
					System.out.println("调用PPT解析错误" + e.getMessage().toString());
					success = false ;				
					e.printStackTrace();
					return ERROR;
				}
				
			}
			else if(s.equals("xlsx")){
				try{
					Excel temp=new Excel();
					//"。。。"
					String picturepath=servletContext.getRealPath("/data/word/images")+"\\";
					String xmlpath=servletContext.getRealPath("/data/word")+"\\";
					long startTime=System.currentTimeMillis(); 
					temp.Connection(route,fid,picturepath,xmlpath,0);
					long endTime=System.currentTimeMillis(); 
					System.out.println("运行时间： "+(startTime-endTime)+"ms");
				}
				catch(Exception e){
					System.out.println("调用Excel解析错误" + e.getMessage().toString());
					success = false ;				
					e.printStackTrace();
					return ERROR;
				}
				
			}
			else{
				System.out.println("未知文件...");
				success=false;
				return ERROR;
			}
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				success = false ;				
				e1.printStackTrace();
				return ERROR;
			}
		return SUCCESS;
	}
	
	public String upload(String date,String type,File answer,String filename) throws Exception
	{	
		date= date.replace(" ", "-");
		String realpath = servletContext.getRealPath("/data/upload");
	   File dirFile = new File(realpath,date+filename);
	   if (!dirFile.getParentFile().exists()){
		   System.out.println("新建文件夹");
			dirFile.getParentFile().mkdirs();
		}
		System.out.println(dirFile.toString());
		FileUtils.copyFile(answer, dirFile);
		return dirFile.toString();
	}
	

	public List<question> getQuestion_manager() {
		return question_manager;
	}
	public void setQuestion_manager(List<question> question_manager) {
		this.question_manager = question_manager;
	}

	public String getQuestion() {
		return question;
	}


	public void setQuestion(String question) {
		this.question = question;
	}
	
	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isSuccess() {
		return success;
	}


	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	


	public Integer getID() {
		return ID;
	}


	public void setID(Integer iD) {
		ID = iD;
	}


	public String getAnswerFileName() {
		return answerFileName;
	}


	public void setAnswerFileName(String answerFileName) {
		this.answerFileName = answerFileName;
	}


	public File getAnswer() {
		return answer;
	}


	public void setAnswer(File answer) {
		this.answer = answer;
	}
	@Override
	public void setServletContext(ServletContext context) {
		this.servletContext=context;
	}

	public String getJudge() {
		return judge;
	}

	public void setJudge(String judge) {
		this.judge = judge;
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

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}



	




}
