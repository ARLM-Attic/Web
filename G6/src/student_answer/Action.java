package student_answer;

import jacob.CallCsharp;
import jacob.Excel;
import jacob.comTest;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.util.ServletContextAware;
import org.omg.CORBA.PUBLIC_MEMBER;

import paper_manager.PaparQuestion;
import paper_manager.PaperManagerRemote;
import paper_manager.PaperQuestionRemote;
import question_manager.question;
import question_manager.questionRemote;
import student_paper.StudentPaper;
import student_paper.StudentPaperRemote;
import xml.compare;

import com.opensymphony.xwork2.ActionSupport;

import common.tools;

public class Action extends ActionSupport implements Serializable, ServletContextAware{

     /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer paperid;
    private Integer studentid;
    private Integer questionid;
    private String question;
 	private String type ;
 	private String title;	    
 	private File answer;
 	private Integer id;
 	private String answerFileName;
 	private Integer start;
	private Integer limit ;
	private Integer length ; //分页三巨头 
	private	String term ;
	private String search;
	private ServletContext servletContext;
	private List<StudentAnswer> student_answer_list;
	private boolean success =true;
 	HttpSession session = ServletActionContext.getRequest().getSession();
    String name=(String)session.getAttribute("name");
    Integer sid = (Integer)session.getAttribute("id");
	final String pjName = new tools().moduleName();
    
	public PaperQuestionRemote paperremote(){
		PaperQuestionRemote remote = null;
		try {
			remote = (PaperQuestionRemote)new tools().getContext().lookup(pjName+"PaperQuestiondao!paper_manager.PaperQuestionRemote");
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
	
	
 	public student_answer_remote remote(){
 		student_answer_remote remote = null;
		try {
			remote = (student_answer_remote)new tools().getContext().lookup(pjName+"student_answer_dao!student_answer.student_answer_remote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
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
 	
    public String f()
    {
    	
    	List<StudentAnswer> List = remote().get(sid, paperid);
    	System.out.println(List.size());
    	/*将temp的分数转移到score*/
    	Double score = (double) 0 ;  // 学生的得分
    	Double scoreall = (double) 0 ; // 计算题目的总分
    	for(int i = 0;i<List.size();i++)
    	{
    		remote().change_score(List.get(i).getId(), List.get(i).getTemp());
    		String  number = List.get(i).getTemp();
    		
    		int temp= number.indexOf(" 总分:");
    		
    		String tempScore = number.substring(3, temp);
    		String tempScoreAll = number.substring(temp+4,number.length());
    		score += Double.parseDouble(tempScore);
    		scoreall += Double.parseDouble(tempScoreAll);
    	}
		System.out.println("转移了");

    	String k = "得分:"+score.toString() + " 总分:"+scoreall.toString();
     
    	/*StudentPaper s = new StudentPaper();
   
    	s.setPaperid(paperid);
    	s.setStu_score(k);
    	s.setStudentid(sid);
    	s.setStudentname(name);*/
    	StudentPaperRemote().change_score_by_paperid_and_studentid(paperid, sid, k);
    	success = true;
    	return SUCCESS;
    }
 	
	@SuppressWarnings("unchecked")
	public String get() throws UnsupportedEncodingException
	{
		List<StudentAnswer> temp= new ArrayList<StudentAnswer>();
		is_Search_end();//判断search是否为"",如果是term为""
		System.out.println(getTerm());
		switch (getTerm())
		{
			//['题目标题'],['作答情况'],['Word题目'], [ 'PowerPoint题目'], [ 'Excel题目']
		case "题目标题":
			temp = remote().get_title(getSearch(),sid, paperid);
			break;
		case "作答情况":
			temp = remote().get_answer_condition(getSearch(),sid, paperid);
			break;
		case "Word题目":
			temp = remote().get_word(getTerm(), getSearch(),sid, paperid);
			break;
		case "PowerPoint题目":
			temp = remote().get_ppt(getTerm(), getSearch(),sid, paperid);
			break;
		case "Excel题目":
			temp = remote().get_excel(getTerm(), getSearch(),sid, paperid);
			break;
		default:
			temp = remote().show(sid, paperid);
			if(temp.toString()=="[]")
			{
				List<question> gList= get_all_question(paperid);
				for(question i :gList)
				{
					StudentAnswer s  = new StudentAnswer(paperid, i.getId(), "",sid, "未提交", "", i.getTitle(),i.getQuestion(),i.getType(), "未作答",i.getScore());				
					s.setTemp("得分:0"+" 总分:0");
					remote().add(s);
				}
				temp= remote().show(sid, paperid);
			}
		}
		length = temp.size();
		student_answer_list = (List<StudentAnswer>) new tools().page(start, limit, temp);
		return SUCCESS;
					
	}
	
	public String add() throws Exception 
	{
		String STU_SCORE = "0";//考试得分...初始化为0。。。前台传来总分SCORE

		String realpath = servletContext.getRealPath("/data/upload");
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		String TIME = df.format(date);
		System.out.println(id);
	
		File dirFile = new File(realpath,TIME+answerFileName);
		if (!dirFile.getParentFile().exists()){
			dirFile.getParentFile().mkdirs();
		}
		try {
			FileUtils.copyFile(answer, dirFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			success  = false ;		
			e.printStackTrace();
			return ERROR;
		}
		String filePath = dirFile.toString();
		System.out.println("questionid:"+questionid);
		System.out.println("id:"+id);
		System.out.println("studenid:"+sid);
		System.out.println("上传成功");
		//上传文件后更改数据库
		/*StudentAnswer s = new StudentAnswer(paperid, questionid, dirFile.toString(), studentid, "0", answerFileName);
		s.setCondition("已上传");*/
		int i = answerFileName.lastIndexOf(".");
		String s = answerFileName.substring(i+1); //文件扩展名 
		//remote().change_by_id(id, answerFileName, dirFile.toString());
		if(s.equals("docx")){
			//调用解析，，，
			String savePath=servletContext.getRealPath("/data/word");
			System.out.println(filePath );
			System.out.println(savePath);
			new CallCsharp().Work(questionid, sid, filePath, savePath);
			//调用对比	SCORE
			String resPath = savePath+"/"+questionid+"-"+"0"+"-"+"attr.xml";
			String tarPath = savePath+"/"+questionid+"-"+sid+"-"+"attr.xml";
			String resultPath = savePath+"/"+questionid+"-"+sid+"-"+"result.xml";
			STU_SCORE = new compare().execute(resPath, tarPath, resultPath, savePath);
			STU_SCORE = "得分:"+STU_SCORE.replace("/", " 总分:");
			remote().change_by_id(id,answerFileName, dirFile.toString(),STU_SCORE);
		}
		else if(s.equals("pptx")){
			//调用解析，，，
			try{
				String xmlpath=servletContext.getRealPath("/data/word")+"\\";
				new comTest().pptParse(questionid, sid, filePath, xmlpath);
				System.out.println("PPT解析完成" + questionid + sid);
			}
			catch(Exception e){
				System.out.println("调用PPT解析错误" + e.getMessage().toString());
			}
			//调用对比	SCORE
			String savePath=servletContext.getRealPath("/data/word");
			String resPath = savePath+"/"+questionid+"-"+"0"+"-"+"attr.xml";
			String tarPath = savePath+"/"+questionid+"-"+sid+"-"+"attr.xml";
			String resultPath = savePath+"/"+questionid+"-"+sid+"-"+"result.xml";
			STU_SCORE = new compare().execute(resPath, tarPath, resultPath, savePath);
			STU_SCORE = "得分:"+STU_SCORE.replace("/", " 总分:");
			remote().change_by_id(id,answerFileName, dirFile.toString(),STU_SCORE);
		}
		else if(s.equals("xlsx")){
			
			Excel temp=new Excel();
			//"。。。"
			String picturepath=servletContext.getRealPath("/data/word/images")+"\\";
			String xmlpath=servletContext.getRealPath("/data/word")+"\\";
			temp.Connection(filePath,questionid,picturepath,xmlpath,sid);
			//调用对比	SCORE
			String savePath=servletContext.getRealPath("/data/word");
			String resPath = savePath+"/"+questionid+"-"+"0"+"-"+"attr.xml";
			String tarPath = savePath+"/"+questionid+"-"+sid+"-"+"attr.xml";
			String resultPath = savePath+"/"+questionid+"-"+sid+"-"+"result.xml";
			STU_SCORE = new compare().execute(resPath, tarPath, resultPath, savePath);
			STU_SCORE = "得分:"+STU_SCORE.replace("/", " 总分:");
			remote().change_by_id(id,answerFileName, dirFile.toString(),STU_SCORE);
		}
		else{
			System.out.println("未知文件...");
			success=false;
			return ERROR;
		}
	//	remote().add(s);
		success = true;
		return SUCCESS;
	}
	
	//老师获取学生分数的
	@SuppressWarnings("unchecked")
	public String teacher_get() throws UnsupportedEncodingException
	{
		List<StudentAnswer> temp= new ArrayList<StudentAnswer>();
		is_Search_end();//判断search是否为"",如果是term为""
		System.out.println(getTerm());
		switch (getTerm())
		{
			//['题目标题'],['作答情况'],['Word题目'], [ 'PowerPoint题目'], [ 'Excel题目']
		case "题目标题":
			temp = remote().get_title(getSearch(),studentid, paperid);
			break;
		case "作答情况":
			temp = remote().get_answer_condition(getSearch(),studentid, paperid);
			break;
		case "Word题目":
			temp = remote().get_word(getTerm(), getSearch(),studentid, paperid);
			break;
		case "PowerPoint题目":
			temp = remote().get_ppt(getTerm(), getSearch(),studentid, paperid);
			break;
		case "Excel题目":
			temp = remote().get_excel(getTerm(), getSearch(),studentid, paperid);
			break;
		default:
			temp = remote().show(studentid, paperid);
			if(temp.toString()=="[]")
			{
				List<question> gList= get_all_question(paperid);
				for(question i :gList)
				{
					StudentAnswer s  = new StudentAnswer(paperid, i.getId(), "",studentid, "未提交", "", i.getTitle(),i.getQuestion(),i.getType(), "未作答",i.getScore());				
					s.setTemp("得分:0"+" 总分:0");
					remote().add(s);
				}
				temp= remote().show(studentid, paperid);
			}
		}
		length = temp.size();
		student_answer_list = (List<StudentAnswer>) new tools().page(start, limit, temp);
		return SUCCESS;
	}
	
	public List<question> get_all_question(Integer paperid)
	{
		//首先就根据paperid 获取所有 试卷对应题目的id
		List<question>	paper_question_list = new ArrayList<question>();
		
		List<PaparQuestion> p = paperremote().show(paperid);
		System.out.println("PaparQuestion长度"+p.size());
		
		for(int i = 0 ; i < p.size();i++)
		{
			System.out.println(p.get(i).getQuestionId());
			//找到所有题目
			question question = qremote().get_by_id(p.get(i).getQuestionId());
			
			paper_question_list.add(question);
		}
		System.out.println("paper_question_list长度:"+paper_question_list.size());
		return paper_question_list;
	}
	
	public Integer getPaperid() {
		return paperid;
	}
	public void setPaperid(Integer paperid) {
		this.paperid = paperid;
	}
	public Integer getStudentid() {
		return studentid;
	}
	public void setStudentid(Integer studentid) {
		this.studentid = studentid;
	}
	public Integer getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Integer questionid) {
		this.questionid = questionid;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}


	@Override
	public void setServletContext(ServletContext context) {
		this.servletContext=context;
	}


	public File getAnswer() {
		return answer;
	}


	public void setAnswer(File answer) {
		this.answer = answer;
	}


	public String getAnswerFileName() {
		return answerFileName;
	}


	public void setAnswerFileName(String answerFileName) {
		this.answerFileName = answerFileName;
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

	public List<StudentAnswer> getStudent_answer_list() {
		return student_answer_list;
	}

	public void setStudent_answer_list(List<StudentAnswer> student_answer_list) {
		this.student_answer_list = student_answer_list;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
		
		String temp = getTerm();
		if(!(temp!="Word题目"||temp!="PowerPoint题目"||temp!="Excel题目")&&getSearch().equals(""))
		{	
			setTerm("");;
		}
		
	}
	
	
}
