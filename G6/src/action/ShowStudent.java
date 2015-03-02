package action;

import com.opensymphony.xwork2.ActionSupport;
import common.tools;
import java.util.*;
import session.StudentBeanRemote;
import student.Student;
import javax.naming.*;

@SuppressWarnings("serial")
public class ShowStudent extends ActionSupport {
	
	final String pjName = new tools().moduleName();
	public List<Student> Students;
	public List<Student> getStudents() {
		return Students;
	}
	public void setStudents(List<Student> students) {
		this.Students = students;
	}
	
	public StudentBeanRemote remote(){
		StudentBeanRemote remote = null;
		try {
			remote = (StudentBeanRemote) new tools().getContext().lookup(pjName+"StudentBean!session.StudentBeanRemote?stateful");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}
	
	public String ShowList() {
		Students = remote().List_Infro();
		return SUCCESS;
	}
	
}
