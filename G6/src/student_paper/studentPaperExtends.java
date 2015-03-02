package student_paper;

import java.io.Serializable;

import paper_manager.PaperManager;


public class studentPaperExtends implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//SELECT p.ID,P.CREATE_PAPAER_USER,P.EXAMNAME,P.EXAM_DATE,P.START_TIME,P.END_TIME,P.SCORE,STUDENTID,STUDENTNAME,STU_SCORE

	private Integer ID ;
	private String CREATE_PAPAER_USER;
	private String EXAMNAME;
	private String EXAM_DATE;
	private String START_TIME;
	private String END_TIME;
	private String SCORE;
	private Integer STUDENTID;
	private String STUDENTNAME;
	private String STU_SCORE;
	public studentPaperExtends()	
	{
		super();
	}
	
	public studentPaperExtends(PaperManager agr_PaperManager, StudentPaper agr_StudentPaper)
	{
		ID = agr_PaperManager.getId();
		CREATE_PAPAER_USER = agr_PaperManager.getCreatePapaerUser();
		EXAMNAME = agr_PaperManager.getExamname();
		EXAM_DATE = agr_PaperManager.getExam_date();
		START_TIME = agr_PaperManager.getStartTime();
		END_TIME = agr_PaperManager.getEndTime();
		SCORE = agr_PaperManager.getScore();
		STUDENTID = agr_StudentPaper.getStudentid();
		STUDENTNAME = agr_StudentPaper.getStudentname();
		STU_SCORE = agr_StudentPaper.getStu_score();
	}
	
	
	public studentPaperExtends(Integer iD, String cREATE_PAPAER_USER,
			String eXAMNAME, String eXAM_DATE, String sTART_TIME,
			String eND_TIME, String sCORE, Integer sTUDENTID,
			String sTUDENTNAME, String sTU_SCORE) {
		super();
		ID = iD;
		CREATE_PAPAER_USER = cREATE_PAPAER_USER;
		EXAMNAME = eXAMNAME;
		EXAM_DATE = eXAM_DATE;
		START_TIME = sTART_TIME;
		END_TIME = eND_TIME;
		SCORE = sCORE;
		STUDENTID = sTUDENTID;
		STUDENTNAME = sTUDENTNAME;
		STU_SCORE = sTU_SCORE;
	}
	//	//p.id,p.createPapaerUser,p.examname,p.exam_date,p.startTime,
	//p.endTime,score,studentid,studentname,stu_score

	public studentPaperExtends(Object[] obj) {
		this.ID = Integer.valueOf(obj[0].toString());
		this.CREATE_PAPAER_USER = obj[1]==null?"":obj[1].toString();
		this.EXAMNAME = obj[2]==null?"":obj[2].toString();
		this.EXAM_DATE = obj[3]==null?"":obj[3].toString();
		this.START_TIME = obj[4]==null?"":obj[4].toString();
		this.END_TIME = obj[5]==null?"":obj[5].toString();
		this.SCORE = obj[6]==null?"":obj[6].toString();
		this.STUDENTID =obj[7]==null?-1:Integer.valueOf(obj[7].toString());
		this.STUDENTNAME= obj[8]==null?"":obj[8].toString();
		this.STU_SCORE= obj[9]==null?"未作答":obj[9].toString();
	}

	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getCREATE_PAPAER_USER() {
		return CREATE_PAPAER_USER;
	}
	public void setCREATE_PAPAER_USER(String cREATE_PAPAER_USER) {
		CREATE_PAPAER_USER = cREATE_PAPAER_USER;
	}
	public String getEXAMNAME() {
		return EXAMNAME;
	}
	public void setEXAMNAME(String eXAMNAME) {
		EXAMNAME = eXAMNAME;
	}
	public String getEXAM_DATE() {
		return EXAM_DATE;
	}
	public void setEXAM_DATE(String eXAM_DATE) {
		EXAM_DATE = eXAM_DATE;
	}
	public String getSTART_TIME() {
		return START_TIME;
	}
	public void setSTART_TIME(String sTART_TIME) {
		START_TIME = sTART_TIME;
	}
	public String getEND_TIME() {
		return END_TIME;
	}
	public void setEND_TIME(String eND_TIME) {
		END_TIME = eND_TIME;
	}
	public String getSCORE() {
		return SCORE;
	}
	public void setSCORE(String sCORE) {
		SCORE = sCORE;
	}
	public Integer getSTUDENTID() {
		return STUDENTID;
	}
	public void setSTUDENTID(Integer sTUDENTID) {
		STUDENTID = sTUDENTID;
	}
	public String getSTUDENTNAME() {
		return STUDENTNAME;
	}
	public void setSTUDENTNAME(String sTUDENTNAME) {
		STUDENTNAME = sTUDENTNAME;
	}
	public String getSTU_SCORE() {
		return STU_SCORE;
	}
	public void setSTU_SCORE(String sTU_SCORE) {
		STU_SCORE = sTU_SCORE;
	}
	
	

}
