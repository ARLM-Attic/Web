package xml;

import java.io.*; 
import java.util.*; 
import org.dom4j.*; 
import org.dom4j.io.*;

public class value {
	
	private List<xmlValue> values = new ArrayList<xmlValue>();
	
	public void updateXmlValue(String path,String idSet,String status){
		String []ids = idSet.split(",");
		try { 
			File file = new File(path); 
			SAXReader reader = new SAXReader(); 
			Document doc = reader.read(file); 
			Element root = doc.getRootElement();
			for(int i=0;i<ids.length;i++) {
				Element	e = root.elementByID(ids[i]);
				e.attribute("status").setValue(status);
	        }
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("utf-8");
			XMLWriter xmlWriter = new XMLWriter(new FileWriter(path),format);
			xmlWriter.write(doc);
			xmlWriter.close();
		} catch (Exception e) { 
			e.printStackTrace();
		}
	}
	
	public void setXmlValue(List<Element> eles,String prefix){
		for(Element e : eles){
			String s = e.attributeValue("prefix");
			if(s.equals(prefix) || s.startsWith(prefix)){
				xmlValue value = new xmlValue();
				value.setId(e.attributeValue("ID"));
	            value.setPrefix(e.attributeValue("prefix"));
	            value.setAttr(e.attributeValue("attr"));
	            value.setValue(e.attributeValue("value"));
	            //value.setScore(e.attributeValue("score"));
	            value.setStatus(e.attributeValue("status"));
	            //value.setPaper(e.attributeValue("paper"));
	            //value.setUserid(e.attributeValue("userid"));
	            value.setCheckType(e.attributeValue("checkType"));
	            values.add(value);				
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<xmlValue> execute(String path,String prefix) { 
		long lasting = System.currentTimeMillis(); 
		try { 
			File file = new File(path); 
			SAXReader reader = new SAXReader(); 
			Document doc = reader.read(file); 
			Element root = doc.getRootElement(); 
			List<Element> nodes = root.elements("record");
			setXmlValue(nodes,prefix);
		} catch (Exception e) { 
			e.printStackTrace();
		}
		lasting = System.currentTimeMillis()-lasting; 
		System.out.println("处理时间："+lasting+"ms");
		return values;
	}

	public List<xmlValue> getValues() {
		return values;
	}

	public void setValues(List<xmlValue> values) {
		this.values = values;
	}

}