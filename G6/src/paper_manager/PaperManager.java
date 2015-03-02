package paper_manager;

import java.io.Serializable;

import javax.persistence.*;


/**
 * The persistent class for the PAPER_MANAGER database table.
 * 
 */
@Entity
@Table(name="PAPER_MANAGER")
@NamedQuery(name="PaperManager.findAll", query="SELECT p FROM PaperManager p")
public class PaperManager implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "paper",sequenceName = "PAPER_QUESTION",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "paper")
	private Integer id;

	@Column(name="CREATE_PAPAER_USER")
	private String createPapaerUser;

	@Column(name="CREATE_PAPER_TIME")
	private String createPaperTime;

	@Column(name="END_TIME")
	private String endTime;

	private String exam_date;
	


	private String examname;

	@Column(name="LAST_CHANGE_TIME")
	private String lastChangeTime;

	@Column(name="LAST_CHANGE_USER")
	private String lastChangeUser;

	private String score;

	@Column(name="START_TIME")
	private String startTime;

	public PaperManager() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCreatePapaerUser() {
		return this.createPapaerUser;
	}

	public void setCreatePapaerUser(String createPapaerUser) {
		this.createPapaerUser = createPapaerUser;
	}

	public String getCreatePaperTime() {
		return this.createPaperTime;
	}

	public void setCreatePaperTime(String createPaperTime) {
		this.createPaperTime = createPaperTime;
	}

	public String getEndTime() {
		return this.endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getExamname() {
		return this.examname;
	}

	public void setExamname(String examname) {
		this.examname = examname;
	}

	public String getLastChangeTime() {
		return this.lastChangeTime;
	}

	public void setLastChangeTime(String lastChangeTime) {
		this.lastChangeTime = lastChangeTime;
	}

	public String getLastChangeUser() {
		return this.lastChangeUser;
	}

	public void setLastChangeUser(String lastChangeUser) {
		this.lastChangeUser = lastChangeUser;
	}

	public String getScore() {
		return this.score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getStartTime() {
		return this.startTime;
	}

	public PaperManager(String createPapaerUser, String createPaperTime,
			String endTime, String exam_date, String examname,
			String lastChangeTime, String lastChangeUser, String score,
			String startTime) {
		super();
		this.createPapaerUser = createPapaerUser;
		this.createPaperTime = createPaperTime;
		this.endTime = endTime;
		this.exam_date = exam_date;
		this.examname = examname;
		this.lastChangeTime = lastChangeTime;
		this.lastChangeUser = lastChangeUser;
		this.score = score;
		this.startTime = startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getExam_date() {
		return exam_date;
	}

	public void setExam_date(String exam_date) {
		this.exam_date = exam_date;
	}
}