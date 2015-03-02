package session;

//import java.util.List;

import java.util.*;

import javax.ejb.Stateful;
import javax.ejb.Remote;
import javax.persistence.*;

import com.opensymphony.xwork2.ActionContext;

import student.Student;

@Stateful
@Remote(StudentBeanRemote.class)
public class StudentBean implements StudentBeanRemote {

	@PersistenceContext(unitName = "unit")
	EntityManager em;

	// @PersistenceContext EntityManager em;
	public StudentBean() {

	}

	@SuppressWarnings("unchecked")
	@Override
	public Integer Login(Integer id, String password) {
		  try {
				 Student stu=em.find(Student.class,id);
				if(stu!=null)
				  {
					  if(stu.getPASSWORD().equals(password)){
						  Map session=ActionContext.getContext().getSession();
						  session.put("LoginedUser",stu);
						  session.put("name",stu.getNAME());
						  session.put("id",stu.getID());
						  System.out.println("session has been put,name:"+((Student)session.get("LoginedUser")).getNAME());
					  return 1;        //登陆成功
					  }
					  else return 3;      //密码错误
				  }
				  else return 2;  // 账号不存在
			} catch (Exception e) {
				e.printStackTrace();
				return 4; //登陆出错
			}

	}
	
	public List<Student> List_Infro()
	{
		Map session=ActionContext.getContext().getSession();
		Student User=(Student)session.get("LoginedUser");
		String sql="select s from Student s ";
		if(User.getIDENT().equals("教师"))
		  sql="select s from Student s where s.IDENT='学生'";
		if(User.getIDENT().equals("学生"))
		  sql="select s from Student s where s.ID="+User.getID();
		Query query=em.createQuery(sql);
		List<Student> result=query.getResultList();
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Student>Partstudents(String ident)
	{
		return em.createQuery("select o from Student o where IDENT='" + ident + "' ").getResultList();
		
	}
	
	public boolean Re(Integer id,String name, String password,String ident)
	{
		if(em.find(Student.class, id)!=null)
			return false;
		Student st=new Student(id,name,password,ident);
		em.persist(st);
		return true;
	}
	
	public boolean delete(Integer id)
	{
		if(em.find(Student.class, id)!=null){
		em.remove(em.find(Student.class, id));
		return true;}
		else return false;
	}
	
	public void update(Student student)
	{
		em.merge(student);
	}
	
	public Student getStudent(Integer id)
	{
		return em.find(Student.class, id);
	}
}
