package student;

import java.io.Serializable;

import javax.persistence.*; 

@SuppressWarnings("serial")
@Entity (name="Student") 
@Table(name="STUDENT")

public class Student implements Serializable {

	private Integer ID;
	private String NAME;
	private String PASSWORD;
	private String IDENT;
	
	public Student(){};
	public Student(Integer id,String name,String password,String ident)
	{
		this.ID=id;
		this.NAME=name;
		this.PASSWORD=password;
		this.IDENT=ident;
	}
	
	@Id
	@Column(name="ID")
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		this.ID = iD;
	}
	
	@Column(name="IDENT")
	public String getIDENT() {
		return IDENT;
	}
	public void setIDENT(String IDENT) {
		this.IDENT = IDENT;
	}
	
	@Column(name="NAME")
	public String getNAME() {
		return NAME;
	}
	public void setNAME(String nAME) {
		this.NAME = nAME;
	}
	
	@Column(name="PASSWORD")
	public String getPASSWORD() {
		return PASSWORD;
	}
	public void setPASSWORD(String pASSWORD) {
		this.PASSWORD = pASSWORD;
	}
	

	
	
}
