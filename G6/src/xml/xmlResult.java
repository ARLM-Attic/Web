package xml;

import java.util.List;

public class xmlResult {
	
	private String prefix;
	private String attr;
	private String teaValue;
	private String stuValue;
	private String score;
	private String status;
	private String checkType;
	private String leaf;
	private List<xmlResult> results;
	
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public String getAttr() {
		return attr;
	}
	public void setAttr(String attr) {
		this.attr = attr;
	}
	public String getTeaValue() {
		return teaValue;
	}
	public void setTeaValue(String teaValue) {
		this.teaValue = teaValue;
	}
	public String getStuValue() {
		return stuValue;
	}
	public void setStuValue(String stuValue) {
		this.stuValue = stuValue;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCheckType() {
		return checkType;
	}
	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}
	public List<xmlResult> getResults() {
		return results;
	}
	public void setResults(List<xmlResult> children) {
		this.results = children;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	
}