package question_manager;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;



/**
 * The persistent class for the QUESTION_KU database table.
 * 
 * 题库管理
 */
@Entity
@Table(name="QUESTION_KU")
@NamedQuery(name="question.findAll", query="SELECT q FROM question q")
public class question implements Serializable {

	
	/**
	 * 题库
	 */
	private static final long serialVersionUID = 1L;
	public question(String createTime, String createUsers, String lastEditTime,
			String lastEditUser, String question, String type,
			String file_route, String condition, String title, String filename) {
		super();
		this.createTime = createTime;
		this.createUsers = createUsers;
		this.lastEditTime = lastEditTime;
		this.lastEditUser = lastEditUser;
		this.question = question;
		this.type = type;
		this.file_route = file_route;
		this.condition = condition;
		this.title = title;
		this.filename = filename;
	}

	@Column(name="CREATE_TIME")
	private String createTime;

	@Column(name="CREATE_USERS")
	private String createUsers;

	@Id
	@SequenceGenerator(name = "question",sequenceName = "QUESTION",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "question")
	private Integer id;

	@Column(name="LAST_EDIT_TIME")
	private String lastEditTime;

	@Column(name="LAST_EDIT_USER")
	private String lastEditUser;

	@Column(name="QUESTION")
	private String question;

	@Column(name="TYPE")
	private String type;

	@Column(name="FILE_ROUTE")
	private String file_route;
	
	@Column(name="QCONDITION")
	private String condition;
	
	@Column(name="TITLE")
	private String title;
	
	@Column(name = "FILENAME")
	private String filename;
	
	@Column(name = "SCORE")
	private String score;
	
	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFile_route() {
		return file_route;
	}

	public void setFile_route(String file_route) {
		this.file_route = file_route;
	}

	public question() {
	}

	public String getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getCreateUsers() {
		return this.createUsers;
	}

	public void setCreateUsers(String createUsers) {
		this.createUsers = createUsers;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLastEditTime() {
		return this.lastEditTime;
	}

	public void setLastEditTime(String lastEditTime) {
		this.lastEditTime = lastEditTime;
	}

	public String getLastEditUser() {
		return this.lastEditUser;
	}

	public void setLastEditUser(String lastEditUser) {
		this.lastEditUser = lastEditUser;
	}

	public String getQuestion() {
		return this.question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}
}

