package xml;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class result_new {

	private List<xmlResult_new> results = new ArrayList<xmlResult_new>();
	
	@SuppressWarnings({ "unchecked" })
	public void setXmlResults(List<Element> items){
		 for(Element item : items){
			xmlResult_new itemResult = new xmlResult_new();
         	List<xmlResult_new> cItemResults = new ArrayList<xmlResult_new>();
         	itemResult.setID(item.attributeValue("ID"));
         	itemResult.setPrefix(item.attributeValue("prefix"));
         	itemResult.setScore(item.attributeValue("score"));
         	itemResult.setStuScore(item.attributeValue("stuScore"));
         	itemResult.setCheckType(item.attributeValue("checkType"));
         	itemResult.setExpanded("true");
         	List<Element> records = item.elements();
         	for(Element record:records){
	            xmlResult_new result = new xmlResult_new();
	            result.setID(record.attributeValue("ID"));
	            result.setAttr(record.attributeValue("attr"));
	            result.setValue(record.attributeValue("value"));
	            result.setStuValue(record.attributeValue("stuValue"));
	            result.setCheckType(record.attributeValue("checkType"));
	            result.setStatus(record.attributeValue("status"));
	            result.setScore(record.attributeValue("score"));
	            result.setStuScore(record.attributeValue("stuScore"));
	            if(record.elements().size() >0){
	            	List<Element> cldEles = record.elements();
	            	List<xmlResult_new> cldResults = new ArrayList<xmlResult_new>();
	            	for(Element cldEle : cldEles){
	            		xmlResult_new cldResult = new xmlResult_new();
	            		cldResult.setID(cldEle.attributeValue("ID"));
	            		cldResult.setAttr(cldEle.attributeValue("attr"));
	            		cldResult.setValue(cldEle.attributeValue("value"));
	            		cldResult.setStuValue(cldEle.attributeValue("stuValue"));
	            		//cldResult.setCheckType(cldEle.attributeValue("checkType"));
	            		cldResult.setStatus(cldEle.attributeValue("status"));
	            		cldResult.setLeaf("true");
	                    cldResults.add(cldResult);
	            	}
	            	result.setResults(cldResults);
	            }
	            else{
	            	result.setLeaf("true");
	            }
	            cItemResults.add(result);
         	}
         	itemResult.setResults(cItemResults);
            results.add(itemResult);
		 }
	}
	
	@SuppressWarnings("unchecked")
	public List<xmlResult_new> execute(String path) {
		long lasting = System.currentTimeMillis();
		try {
			File file = new File(path);
			SAXReader reader = new SAXReader();
			Document doc = reader.read(file);
			Element root = doc.getRootElement();
			setXmlResults(root.elements("item"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		lasting = System.currentTimeMillis()-lasting;
		System.out.println("处理时间："+lasting+"ms");
		return results;
	}

	public List<xmlResult_new> getResults() {
		return results;
	}

	public void setResults(List<xmlResult_new> results) {
		this.results = results;
	}
	
}