package action;

//import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionSupport;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import java.util.*;

import student.Student;

import javax.naming.*;
import javax.servlet.http.HttpServletRequest;

import session.StudentBeanRemote;

@SuppressWarnings("serial")
public class test extends ActionSupport implements SessionAware {
	public int I;
	
	public Integer tmp;
	
	public Integer getTmp() {
		return tmp;
	}
	public void setTmp(Integer tmp) {
		this.tmp = tmp;
	}

	public boolean suc;
	public boolean isSuccess() {
		return suc;
	}
	public void setSuccess(boolean success) {
		this.suc = success;
	}
	
	public Integer id;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String message;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String username;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String password;
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String ident;
	public String getIdent() {
		return ident;
	}
	public void setIdent(String ident) {
		this.ident = ident;
	}

	public List<Student> Students;
	public List<Student> getStudents() {
		return Students;
	}
	public void setStudents(List<Student> students) {
		this.Students = students;
	}
	
	private String CheckCode;
	public String getCheckCode() {
		return CheckCode;
	}
	public void setCheckCode(String checkCode) {
		CheckCode = checkCode;
	}
	
	public Map session;
	public void setSession(Map session) {
		this.session = session;
	}

	public String execute() {
		I= new ShowStudent().remote().Login(id,password);
		Student temp=new Student();
		if(new ShowStudent().remote().getStudent(id)!=null)
		{
			temp=new ShowStudent().remote().getStudent(id);
			String name=temp.getNAME();
			System.out.println("登陆----------!!!!!!"+name);
			HttpServletRequest request = ServletActionContext.getRequest();		
			request.getSession().setAttribute("name",name );//存放登入人姓名
		}
		switch(I){
		case 1: {
			message=((Student)session.get("LoginedUser")).getIDENT();
			suc=true;break;}
		case 2: {message="账号不存在";suc=false;break;}
		case 3: {message="密码错误";suc=false;break;}
		default: {message="登陆出错";suc=false;break;}
		}
		
		return SUCCESS;
	}

	public String Registered(){
		suc=new ShowStudent().remote().Re(id,username,password,ident);
		if(suc)
			message="成功添加"+ident+": "+username;
		else
			message="帐号已存在，请重新输入!";
		return SUCCESS;	
	}
	
	public String Delete(){
		suc=new ShowStudent().remote().delete(id);
		if(suc)
			message="删除成功";
		else
			message="删除失败";
       return SUCCESS;	
	}
	
	public String update(){
		Student student=new Student(id,username,password,ident);
		new ShowStudent().remote().update(student);
		return SUCCESS;
	}
	
	public String SessionClear(){
		session.clear();
		if(session.isEmpty()){
			System.out.println("成功退出，清除session");
			return Action.SUCCESS;
		}else{
			return Action.ERROR;
		}
	}
}