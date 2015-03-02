package xml;

import java.io.*; 
import java.util.*; 
import org.dom4j.*; 
import org.dom4j.io.*;

public class check {

	private List<xmlResult_new> results = new ArrayList<xmlResult_new>();
	
	public void setXmlScore(String idSet,String score,String path){
		Document doc = getXmlDoc(path);
		Element root = doc.getRootElement();
		Element record = root.elementByID(idSet);
		record.attribute("score").setValue(score);
		saveXmlDoc(path,doc);
	}
	
	@SuppressWarnings({ "unchecked" })
	public void setXmlResults(List<Element> items){
		 for(Element item : items){
			xmlResult_new itemResult = new xmlResult_new();
         	List<xmlResult_new> cItemResults = new ArrayList<xmlResult_new>();
         	itemResult.setID(item.attributeValue("ID"));
         	itemResult.setPrefix(item.attributeValue("prefix"));
         	itemResult.setCheckType(item.attributeValue("checkType"));
         	itemResult.setScore(item.attributeValue("score"));
         	itemResult.setExpanded("true");
         	List<Element> records = item.elements();
         	for(Element record:records){
	            xmlResult_new result = new xmlResult_new();
	            result.setID(record.attributeValue("ID"));
	            result.setAttr(record.attributeValue("attr"));
	            result.setValue(record.attributeValue("value"));
	            result.setCheckType(record.attributeValue("checkType"));
	            result.setScore(record.attributeValue("score"));
	            if(record.elements().size() >0){
	            	List<Element> cldEles = record.elements();
	            	List<xmlResult_new> cldResults = new ArrayList<xmlResult_new>();
	            	for(Element cldEle : cldEles){
	            		xmlResult_new cldResult = new xmlResult_new();
	            		cldResult.setID(cldEle.attributeValue("ID"));
	            		cldResult.setAttr(cldEle.attributeValue("attr"));
	            		cldResult.setValue(cldEle.attributeValue("value"));
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
	public List<xmlResult_new> showCheck(String path) {
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
	
	public void deleteNode(String nodeID,String path,String valuePath){
		Document doc = getXmlDoc(path);
		Element root = doc.getRootElement();
		Element node = root.elementByID(nodeID);
		Element fnode = node.getParent();
		List<Element> valEles = new ArrayList<Element>();
		if(node.attributeValue("checkType").equals("小题")){
			//设置总题数
			Element itemCount = root.element("itemCount");
			int i = Integer.valueOf(itemCount.getTextTrim());
			i--;
			itemCount.setText(""+i);
			fnode.remove(node);
			//重新设置该小题后面的题号,nowID-1
			int nowId = Integer.valueOf(nodeID.substring(1)) + 1;//去掉负号
			i++;
			for( ;nowId<=i;nowId++){
				int changeId = nowId - 1;
				String fnowId = "-" + nowId;//加上负号
				String fchangeId = "-" + changeId;//加上负号
				Element nextNode = root.elementByID(fnowId);
				nextNode.attribute("ID").setValue(fchangeId);
				nextNode.attribute("prefix").setValue("第"+changeId+"小题");
			}
		}
		else if(node.attributeValue("checkType").equals("") && fnode.elements().size()==1){
			Element ffnode = fnode.getParent();
			ffnode.remove(fnode);
		}
		else{
			fnode.remove(node);
		}
		saveXmlDoc(path,doc);
		setUnSelected(node,valuePath);
	}
	
	public void addItem(String path){
		Document doc = getXmlDoc(path);
		Element root = doc.getRootElement();
		int i = Integer.valueOf(root.element("itemCount").getTextTrim());
		i++;
		Element item = root.addElement("item");
		item.addAttribute("ID", "-"+i);
		item.addAttribute("checkType", "小题");
		item.addAttribute("prefix", "第"+i+"小题");
		item.addAttribute("score", "0");
		Element itemCount = root.element("itemCount");
		itemCount.setText(""+i);
		saveXmlDoc(path,doc);
	}
	
	public void singleCheck(String itemID,List<String> checks,String path){
		Document doc = getXmlDoc(path);
		Element root = doc.getRootElement();
		Element item = root.elementByID(itemID);
		for(String str:checks){
			String[] array = str.split("&&");
			Element record = item.addElement("record");
			record.addAttribute("ID", array[0]);
			record.addAttribute("prefix", array[1]);
			record.addAttribute("attr", array[2]);
			if(array.length == 3)
				record.addAttribute("value", "");
			else
				record.addAttribute("value", array[3]);
			record.addAttribute("checkType", "部分匹配");
			record.addAttribute("leaf", "true");
			record.addAttribute("score", "0");
		}
		saveXmlDoc(path,doc);
	}
	
	public void multiCheck(String itemID,List<String> checks,String path){
		Document doc = getXmlDoc(path);
		Element root = doc.getRootElement();
		Element item = root.elementByID(itemID);
		boolean has = false;
		Element record = null;
		List<Element> eles = item.elements("record");
		for(Element ele:eles){
			if(ele.attributeValue("checkType").equals("全部匹配")){
				record = ele;
				has = true;
				break;
			}
		}
		if(!has){
			record = item.addElement("record");
			record.addAttribute("ID", itemID+"0000000");//要能转化为int的大数
			record.addAttribute("checkType", "全部匹配");
			record.addAttribute("score", "0");
		}
		for(String str:checks){
			Element cldRecord = record.addElement("record");
			String[] array = str.split("&&");
			cldRecord.addAttribute("ID", array[0]);
			cldRecord.addAttribute("prefix", array[1]);
			cldRecord.addAttribute("attr", array[2]);
			if(array.length == 3)
				cldRecord.addAttribute("value", "");
			else
				cldRecord.addAttribute("value", array[3]);
			cldRecord.addAttribute("checkType", "");
			cldRecord.addAttribute("leaf", "true");
		}
		saveXmlDoc(path,doc);
	}
	
	//标记属性已勾选
	public void setSelected(List<String> checks,String valuePath){
		Document doc = getXmlDoc(valuePath);
		Element root = doc.getRootElement();
		for(String str:checks){
			String[] array = str.split("&&");
			Element record = root.elementByID(array[0]);
			record.attribute("checkType").setValue("已勾选");
		}
		saveXmlDoc(valuePath,doc);
	}
	
	//标记属性未勾选
	public void setUnSelected(Element node,String valuePath){
		//修改属性attr的checkType
		Document doc = getXmlDoc(valuePath);
		Element root = doc.getRootElement();
		if(node.attributeValue("checkType").equals("小题")){
			List<Element> eles = node.elements();
			for(Element ele:eles){
				if(ele.attributeValue("checkType").equals("全部匹配")){
					List<Element> es = ele.elements();
					for(Element e:es){
						Element record = root.elementByID(e.attributeValue("ID"));
						record.attribute("checkType").setValue("null");
					}
				}
				else {
					Element record = root.elementByID(ele.attributeValue("ID"));
					record.attribute("checkType").setValue("null");
				}
			}
		}
		else if(node.attributeValue("checkType").equals("部分匹配")){
			Element record = root.elementByID(node.attributeValue("ID"));
			record.attribute("checkType").setValue("null");
		}
		else if(node.attributeValue("checkType").equals("全部匹配")){
			List<Element> eles = node.elements();
			for(Element ele:eles){
				Element record = root.elementByID(ele.attributeValue("ID"));
				record.attribute("checkType").setValue("null");
			}
		}
		else {
			Element record = root.elementByID(node.attributeValue("ID"));
			record.attribute("checkType").setValue("null");
		}
		saveXmlDoc(valuePath,doc);
	}
	
	public Document getXmlDoc(String path){
		Document doc = null;
		try { 
			File file = new File(path);
			SAXReader reader = new SAXReader();
			doc = reader.read(file);
		} catch (Exception e) { 
			e.printStackTrace();
		}
		return doc;
	}
	
	public void saveXmlDoc(String savePath,Document doc){
		try { 
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("utf-8");
			XMLWriter xmlWriter = new XMLWriter(new FileWriter(savePath),format);
			xmlWriter.write(doc);
			xmlWriter.close();
		} catch (Exception e) { 
			e.printStackTrace();
		}
	}
	
	public List<xmlResult_new> getResults() {
		return results;
	}

	public void setResults(List<xmlResult_new> results) {
		this.results = results;
	}
	
}
