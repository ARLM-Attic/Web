package xml;

import java.io.*; 
import java.util.*; 
import org.dom4j.*; 
import org.dom4j.io.*;

public class node {
	
	private List<xmlTree> children = new ArrayList<xmlTree>();
	
	public void setXmlTree(List<Element> eles){
		 for(Element e : eles){
             xmlTree tree = new xmlTree();
             tree.setId(e.attributeValue("ID"));
             tree.setFid(e.attributeValue("fid"));
             tree.setPrefix(e.attributeValue("prefix"));
             tree.setNode(e.attributeValue("node"));
             tree.setContent(e.attributeValue("content"));
             tree.setLeaf(e.attributeValue("leaf"));
             tree.setPaper(e.attributeValue("paper"));
             tree.setUserid(e.attributeValue("userid"));
             children.add(tree);
		 }
	}
	
	public List<xmlTree> getJsonTree(List<xmlTree> e2tList) {
		Map<String, List<xmlTree>> jsonTreeMap = new HashMap<String, List<xmlTree>>();
		for (xmlTree jt : e2tList) {
			xmlTree e2t = jt;
			String fatherId = jt.getFid().toString();
			if (jsonTreeMap.get(fatherId) == null) {
				List<xmlTree> list = new ArrayList<xmlTree>();
				list.add(e2t);
				jsonTreeMap.put(fatherId, list);
			} else {
				List<xmlTree> valueList = jsonTreeMap.get(fatherId);
				valueList.add(e2t);
				jsonTreeMap.put(fatherId, valueList);
			}
		}
		for (Map.Entry<String, List<xmlTree>> entry : jsonTreeMap.entrySet()) {
			List<xmlTree> smallTreeList = new ArrayList<xmlTree>();
			smallTreeList = entry.getValue();
			int nodeListSize = smallTreeList.size();
			for (int i = 0; i < nodeListSize; i++) {
				String findID = smallTreeList.get(i).getId().toString();
				List<xmlTree> findList = jsonTreeMap.get(findID);
				smallTreeList.get(i).setChildren(findList);
			}
		}
		List<xmlTree> rootNodeList = jsonTreeMap.get("0");
		return rootNodeList;
	}
	
	@SuppressWarnings("unchecked")
	public List<xmlTree> execute(String path) { 
		long lasting = System.currentTimeMillis(); 
		try { 
			File file = new File(path); 
			SAXReader reader = new SAXReader(); 
			Document doc = reader.read(file); 
			Element root = doc.getRootElement(); 
			List<Element> nodes = root.elements(); 
			setXmlTree(nodes);
			children = getJsonTree(children);
		} catch (Exception e) { 
			e.printStackTrace();
		} 
		lasting = System.currentTimeMillis()-lasting; 
		System.out.println("处理时间："+lasting+"ms");
		return children;
	}

	public List<xmlTree> getChildren() {
		return children;
	}

	public void setChildren(List<xmlTree> children) {
		this.children = children;
	}
}