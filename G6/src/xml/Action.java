package xml;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletContext;
import org.apache.struts2.util.ServletContextAware;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class Action extends ActionSupport implements Serializable, ServletContextAware {
	private static final long serialVersionUID = 1L;
	private Integer PAPER;
	private Integer USERID;
	private String PREFIX;
	private xmlTree tree;
	private List<xmlTree> children = new ArrayList<xmlTree>();
	private String idSet;
	private String score;
	private String status;
	private xmlValue value;
	private List<xmlValue> values = new ArrayList<xmlValue>();
	private xmlResult_new result;
	private List<xmlResult_new> results = new ArrayList<xmlResult_new>();
	private List<String> checks = new ArrayList<String>();
	private ServletContext servletContext;
	private int start;
	private int limit;
	private int totalCount;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String setPREFIX() {
		Map session=ActionContext.getContext().getSession();
		System.out.println("Session:-------->"+PAPER+" "+USERID+" "+PREFIX);
		if(USERID != null)
			session.put("USERID",USERID);
		if(PAPER != null)
			session.put("PAPER",PAPER);
		session.put("PREFIX",PREFIX);
		return SUCCESS;
	}
	
	@SuppressWarnings("rawtypes")
	public String showTrees() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		System.out.println("ShowXmlTrees(PAPER,USERID)----------------->"+PAPER+" "+USERID);
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"node.xml";
		children = new node().execute(path);
		return SUCCESS;
	}
	
	@SuppressWarnings("rawtypes")
	public String showValues() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		PREFIX = session.get("PREFIX").toString();
		System.out.println("ShowValues(PAPER,USERID,PREFIX)----------------->"+PAPER+" "+USERID+" "+PREFIX);
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"attr.xml";
		values = new value().execute(path,PREFIX);
		totalCount = values.size();
		int end = start + limit;
		if(values.size() < end)
			end = values.size();
		System.out.println("start:"+start+" end:"+end);
		values = values.subList(start, end);
		return SUCCESS;
	}
	
	public String updateValues() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		PREFIX = session.get("PREFIX").toString();
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"attr.xml";
		new value().updateXmlValue(path, idSet, status);
		return SUCCESS;
	}

	public String showCheck() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"check.xml";
		results = new check().showCheck(path);
		return SUCCESS;
	}

	public String addItem() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"check.xml";
		new check().addItem(path);
		return SUCCESS;
	}
	
	public String singleCheck() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"check.xml";
		String valuePath = savePath+"/"+PAPER+"-"+0+"-"+"attr.xml";
		new check().setSelected(checks, valuePath);
		new check().singleCheck(idSet,checks, path);
		return SUCCESS;
	}
	
	public String multiCheck() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"check.xml";
		String valuePath = savePath+"/"+PAPER+"-"+0+"-"+"attr.xml";
		new check().setSelected(checks, valuePath);
		new check().multiCheck(idSet,checks, path);
		return SUCCESS;
	}
	
	public String deleteNode() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"check.xml";
		String valuePath = savePath+"/"+PAPER+"-"+0+"-"+"attr.xml";
		new check().deleteNode(idSet, path, valuePath);
		return SUCCESS;
	}
	
	public String updateNode() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+0+"-"+"check.xml";
		new check().setXmlScore(idSet,score,path);
		return SUCCESS;
	}
	
	//学生查看
	public String showResult() {
		Map session=ActionContext.getContext().getSession();
		PAPER = Integer.valueOf(session.get("PAPER").toString());
		USERID = Integer.valueOf(session.get("USERID").toString());
		String savePath=servletContext.getRealPath("/data/word");
		String path = savePath+"/"+PAPER+"-"+USERID+"-"+"result.xml";
		results = new result_new().execute(path);
		return SUCCESS;
	}

	public Integer getPAPER() {
		return PAPER;
	}

	public Integer getUSERID() {
		return USERID;
	}

	public List<xmlTree> getChildren() {
		return children;
	}

	public void setPAPER(Integer pAPER) {
		PAPER = pAPER;
	}

	public void setUSERID(Integer uSERID) {
		USERID = uSERID;
	}

	public void setChildren(List<xmlTree> trees) {
		this.children = trees;
	}

	public xmlTree getTree() {
		return tree;
	}

	public void setTree(xmlTree tree) {
		this.tree = tree;
	}
	
	public void setServletContext(ServletContext context) {
		this.servletContext=context;
	}

	public String getIdSet() {
		return idSet;
	}

	public void setIdSet(String idSet) {
		this.idSet = idSet;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String staSet) {
		this.status = staSet;
	}

	public xmlValue getValue() {
		return value;
	}

	public void setValue(xmlValue value) {
		this.value = value;
	}

	public List<xmlValue> getValues() {
		return values;
	}

	public void setValues(List<xmlValue> values) {
		this.values = values;
	}

	public String getPREFIX() {
		return PREFIX;
	}

	public void setPREFIX(String pREFIX) {
		PREFIX = pREFIX;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public List<xmlResult_new> getResults() {
		return results;
	}

	public void setResults(List<xmlResult_new> checks) {
		this.results = checks;
	}

	public xmlResult_new getResult() {
		return result;
	}

	public void setResult(xmlResult_new result) {
		this.result = result;
	}

	public List<String> getChecks() {
		return checks;
	}

	public void setChecks(List<String> checks) {
		this.checks = checks;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

}
