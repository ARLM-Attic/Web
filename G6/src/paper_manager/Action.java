package paper_manager;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.util.ServletContextAware;

import question_manager.question;

import com.opensymphony.xwork2.ActionSupport;

import common.tools;

public class Action extends ActionSupport implements Serializable,ServletContextAware {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<PaperManager> paperManagerList;
	private Integer ID;
	private String examname;
	private String startTime;
	private String endTime;
	private String examdate;
	private int length;
	private int limit;
	private int start;
	private String term;
	private String search;
	private boolean success = true;
	private ServletContext servletContext;

	HttpSession session = ServletActionContext.getRequest().getSession();
	String name = (String) session.getAttribute("name");

	final String pjName = new tools().moduleName();

	public PaperManagerRemote remote() {
		PaperManagerRemote remote = null;
		try {
			remote = (PaperManagerRemote) new tools()
					.getContext()
					.lookup(pjName
							+ "PaperManagerdao!paper_manager.PaperManagerRemote");
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return remote;
	}

	public String add() {
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss ");
		String TIME = df.format(date);
		PaperManager p = new PaperManager(name, TIME, endTime, examdate,
				examname, TIME, name, "0", startTime);
		ID = remote().add(p);
		System.out.println("ID:" + ID);
		// 将信息复制到学生那边

		success = true;
		return SUCCESS;
	}

	@SuppressWarnings("unchecked")
	public String get() throws UnsupportedEncodingException {
		List<PaperManager> temp = new ArrayList<PaperManager>();

		if (getTerm() == null) {
			System.out.println("空");
			term = "";
		}
		if (getSearch() == null) {
			search = "";
		}

		term = URLDecoder.decode(term, "UTF-8");

		search = URLDecoder.decode(search, "UTF-8");

		if (search.equals("")) {
			term = "";
		}
		System.out.println(term);
		switch (term) {
		case "考试名称":
			temp = remote().get_by_examname(search);
			break;
		case "考试日期":
			temp = remote().get_by_examdate(search);
			break;
		case "开始时间":
			temp = remote().get_by_start_time(search);
			break;
		case "结束时间":
			temp = remote().get_by_end_time(search);
			break;
		case "创建人":
			temp = remote().get_by_create_user(search);
			break;
		case "创建时间":
			temp = remote().get_by_create_time(search);
			break;
		case "最后修改人":
			temp = remote().get_by_lastChangeUser(search);
			break;
		case "最后修改时间":
			temp = remote().get_by_lastChangeTime(search);
			break;
		default:
			temp = remote().show();
			break;
		}
		paperManagerList = new ArrayList<PaperManager>();
		length = temp.size();
		paperManagerList = (List<PaperManager>) new tools().page(start, limit,
				temp);
		return SUCCESS;
	}

	public String del() {
		remote().del(ID);
		return SUCCESS;
	}

	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}

	public String getExamname() {
		return examname;
	}

	public void setExamname(String examname) {
		this.examname = examname;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	@Override
	public void setServletContext(ServletContext context) {
		this.servletContext = context;
	}

	public String getExamdate() {
		return examdate;
	}

	public void setExamdate(String examdate) {
		this.examdate = examdate;
	}

	public List<PaperManager> getPaperManagerList() {
		return paperManagerList;
	}

	public void setPaperManagerList(List<PaperManager> paperManagerList) {
		this.paperManagerList = paperManagerList;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

}
