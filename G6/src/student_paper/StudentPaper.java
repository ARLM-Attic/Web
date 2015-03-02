package student_paper;

import java.io.Serializable;

import javax.persistence.*;

import java.math.BigDecimal;


/**
 * The persistent class for the STUDENT_PAPER database table.
 * 
 */
@Entity
@Table(name="STUDENT_PAPER")
@NamedQuery(name="StudentPaper.findAll", query="SELECT s FROM StudentPaper s")
public class StudentPaper implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "generatorStudentPaper",sequenceName = "SEQ_StudentPaper",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "generatorStudentPaper")
	private Integer sid;

	private Integer paperid;

	private String stu_score;

	private Integer studentid;

	private String studentname;

	public String qualify;
	
	public StudentPaper() {
	}



	public Integer getPaperid() {
		return paperid;
	}

	public void setPaperid(Integer paperid) {
		this.paperid = paperid;
	}

	public String getStu_score() {
		return stu_score;
	}

	public void setStu_score(String stu_score) {
		this.stu_score = stu_score;
	}

	public Integer getStudentid() {
		return studentid;
	}

	public void setStudentid(Integer studentid) {
		this.studentid = studentid;
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



	public Integer getSid() {
		return sid;
	}



	public void setSid(Integer sid) {
		this.sid = sid;
	}



}