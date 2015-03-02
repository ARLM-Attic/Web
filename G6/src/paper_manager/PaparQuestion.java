package paper_manager;

import java.io.Serializable;

import javax.persistence.*;

import question_manager.question;


/**
 * The persistent class for the PAPAR_QUESTION database table.
 * 
 */
@Entity
@Table(name="PAPAR_QUESTION")
@NamedQuery(name="PaparQuestion.findAll", query="SELECT p FROM PaparQuestion p")
public class PaparQuestion/*extends question*/ implements Serializable  {
	private static final long serialVersionUID = 1L;

	
	@Id
	@SequenceGenerator(name = "paper_question",sequenceName = "PAPAER",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "paper_question")
	private Integer id;

	@Column(name="PARENT_ID")
	private Integer parentId;

	@Column(name="QUESTION_ID")
	private Integer questionId;
	
	public PaparQuestion() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getParentId() {
		return this.parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getQuestionId() {
		return this.questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

}