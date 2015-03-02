package teacher_qualification;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="QUALIFICATION")
public class qualification implements Serializable{
	
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id @Column(name="ID",nullable=false)@GeneratedValue(strategy=GenerationType.SEQUENCE)
	public Integer id;
	
	@Column(name="STUDENTID",nullable=false)
	public Integer studentid;
	
	@Column(name="TESTID",nullable=true)
	public Integer testid;
	
	@Column(name="STUDENTNAME",nullable=true)
	public String studentname;
	
	@Column(name="QUALIFY",nullable=true)
	public String qualify;
	
	@Column(name="SPARE",nullable=true)
	public String spare;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getStudentid() {
		return studentid;
	}

	public void setStudentid(Integer studentid) {
		this.studentid = studentid;
	}

	public Integer getTestid() {
		return testid;
	}

	public void setTestid(Integer testid) {
		this.testid = testid;
	}

	public String getStudentname() {
		return studentname;
	}

	public void setStudentname(String studentname) {
		this.studentname = studentname;
	}

	public String getQualify() {
		return qualify;
	}

	public void setQualify(String qualify) {
		this.qualify = qualify;
	}

	public String getSpare() {
		return spare;
	}

	public void setSpare(String spare) {
		this.spare = spare;
	}
	
	

}
