package session;

import javax.ejb.Remote;


import student.Student;

import java.util.*;

@Remote
public interface StudentBeanRemote {
	public Integer Login(Integer id,String password);
	public List<Student> List_Infro();
	public boolean Re(Integer id,String name, String password,String ident);
	public boolean delete(Integer id);
	public void update(Student student);
	public Student getStudent(Integer id);
	public List<Student>Partstudents(String ident);
}
