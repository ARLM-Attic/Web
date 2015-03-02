package xml;

import java.util.List;

public class xmlResult_new {
	
	private String ID;
	private String prefix;
	private String attr;
	private String value;
	private String stuValue;
	private String score;
	private String stuScore;
	private String status;
	private String checkType;
	private String leaf;
	private String expanded;
	private List<xmlResult_new> results;
	
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
	public String getCheckType() {
		return checkType;
	}
	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}
	public List<xmlResult_new> getResults() {
		return results;
	}
	public void setResults(List<xmlResult_new> children) {
		this.results = children;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getExpanded() {
		return expanded;
	}
	public void setExpanded(String expanded) {
		this.expanded = expanded;
	}
	public String getStuScore() {
		return stuScore;
	}
	public void setStuScore(String stuScore) {
		this.stuScore = stuScore;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}