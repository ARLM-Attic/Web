package student_answer;

import java.io.Serializable;

import javax.persistence.*;

import java.math.BigDecimal;


/**
 * The persistent class for the STUDENT_ANSWER database table.
 * 
 */
@Entity
@Table(name="STUDENT_ANSWER")
@NamedQuery(name="StudentAnswer.findAll", query="SELECT s FROM StudentAnswer s")
public class StudentAnswer implements Serializable {
	private static final long serialVersionUID = 1L;

	
	@Id
	@SequenceGenerator(name = "generatorStudentAnswer",sequenceName = "SEQ_StudentAnswer",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "generatorStudentAnswer")
	private Integer id;

	private Integer paper;

	private Integer questionid;

	@Column(name="STU_ANSWER")
	private String stuAnswer;

	@Column(name="STU_ID")
	private Integer stuId;

	@Column(name="STU_SCORE")
	private String stuScore;

	@Column(name="STU_ANSWER_NAME")
	private String stuAnswerName;
	public StudentAnswer() {
	}

	private String title;
	private String question;
	private String type;

	@Column(name="SCONDITION")
	private String condition;
	
	private String temp;

	private String question_score;

	public StudentAnswer(Integer paper, Integer questionid, String stuAnswer,
			Integer stuId, String stuScore, String stuAnswerName, String title,
			String question, String type, String condition,String questionscore) {
		super();
		this.paper = paper;
		this.questionid = questionid;
		this.stuAnswer = stuAnswer;
		this.stuId = stuId;
		this.stuScore = stuScore;
		this.stuAnswerName = stuAnswerName;
		this.title = title;
		this.question = question;
		this.type = type;
		this.condition = condition;
		this.question_score = questionscore;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPaper() {
		return this.paper;
	}

	public void setPaper(Integer paper) {
		this.paper = paper;
	}

	public Integer getQuestionid() {
		return this.questionid;
	}

	public void setQuestionid(Integer questionid) {
		this.questionid = questionid;
	}

	public String getStuAnswer() {
		return this.stuAnswer;
	}

	public void setStuAnswer(String stuAnswer) {
		this.stuAnswer = stuAnswer;
	}

	public Integer getStuId() {
		return this.stuId;
	}

	public void setStuId(Integer stuId) {
		this.stuId = stuId;
	}

	public String getStuScore() {
		return this.stuScore;
	}

	public void setStuScore(String stuScore) {
		this.stuScore = stuScore;
	}

	public String getStuAnswerName() {
		return stuAnswerName;
	}

	public void setStuAnswerName(String stuAnswerName) {
		this.stuAnswerName = stuAnswerName;
	}



	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
	}



	public String getQuestion() {
		return question;
	}



	public void setQuestion(String question) {
		this.question = question;
	}



	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}



	public String getCondition() {
		return condition;
	}



	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public String getQuestion_score() {
		return question_score;
	}

	public void setQuestion_score(String question_score) {
		this.question_score = question_score;
	}

}