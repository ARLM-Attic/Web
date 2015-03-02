package score;

import java.io.Serializable;

public class studentScore implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public studentScore(String examname, String stuName, Integer stuId,
			String score,String teachername,Integer paperid) {
		super();
		this.examname = examname;
		this.stuName = stuName;
		this.stuId = stuId;
		this.score = score;
		this.teachername = teachername;
		this.paperid  = paperid;
	}
	private String examname;
	private String stuName;//学生姓名
	private Integer stuId;
	private String score;
	private String teachername ;
	private Integer paperid;
	public String getExamname() {
		return examname;
	}
	public void setExamname(String examname) {
		this.examname = examname;
	}
	public String getStuName() {
		return stuName;
	}
	public void setStuName(String stuName) {
		this.stuName = stuName;
	}
	public Integer getStuId() {
		return stuId;
	}
	public void setStuId(Integer stuId) {
		this.stuId = stuId;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getTeachername() {
		return teachername;
	}
	public void setTeachername(String teachername) {
		this.teachername = teachername;
	}
	public Integer getPaperid() {
		return paperid;
	}
	public void setPaperid(Integer paperid) {
		this.paperid = paperid;
	}
}
