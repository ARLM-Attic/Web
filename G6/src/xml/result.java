package xml;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class result {

	private List<xmlResult> results = new ArrayList<xmlResult>();
	
	@SuppressWarnings({ "unused", "unchecked" })
	public void setXmlResults(List<Element> eles){
		 for(Element e : eles){
            xmlResult result = new xmlResult();
            result.setPrefix(e.attributeValue("prefix"));
            result.setScore(e.attributeValue("score"));
            result.setAttr(e.attributeValue("attr"));
            result.setTeaValue(e.attributeValue("teaValue"));
            result.setStuValue(e.attributeValue("stuValue"));
            result.setStatus(e.attributeValue("status")); 
            result.setCheckType(e.attributeValue("checkType"));
            result.setCheckType(e.attributeValue("checkType"));
            if(e.elements().size() >0){
            	result.setLeaf("false");
            	List<Element> cldEles = e.elements();
            	List<xmlResult> cldResults = new ArrayList<xmlResult>();
            	for(Element cldEle : cldEles){
            		xmlResult cldResult = new xmlResult();
            		cldResult.setPrefix(cldEle.attributeValue("prefix"));
            		cldResult.setScore(cldEle.attributeValue(""));
            		cldResult.setAttr(cldEle.attributeValue("attr"));
            		cldResult.setTeaValue(cldEle.attributeValue("teaValue"));
            		cldResult.setStuValue(cldEle.attributeValue("stuValue"));
            		cldResult.setStatus(cldEle.attributeValue("status"));
            		cldResult.setCheckType(cldEle.attributeValue("checkType"));
            		cldResult.setLeaf("true");
                    cldResults.add(cldResult);
            	}
            	result.setResults(cldResults);
            }
            else{
            	result.setLeaf("true");
            }
            results.add(result);
		 }
	}
	
	@SuppressWarnings("unchecked")
	public List<xmlResult> execute(String path) {
		long lasting = System.currentTimeMillis();
		try {
			File file = new File(path);
			SAXReader reader = new SAXReader();
			Document doc = reader.read(file);
			Element root = doc.getRootElement();
			setXmlResults(root.elements());
		} catch (Exception e) {
			e.printStackTrace();
		}
		lasting = System.currentTimeMillis()-lasting;
		System.out.println("处理时间："+lasting+"ms");
		return results;
	}

	public List<xmlResult> getResults() {
		return results;
	}

	public void setResults(List<xmlResult> results) {
		this.results = results;
	}
	
}