package xml;

import java.io.*;
import org.dom4j.*;
import org.dom4j.io.*;
import java.util.*;

public class compare {
	
	private double totalScore = 0;
	private double score = 0;
	private List<Element> stuList = new ArrayList<Element>();
	private String imgPath = "";
	
	public Element eleCompare(Element teaEle) throws Exception, IOException{
		boolean status = false;
		teaEle.addAttribute("stuValue", "");
		for(Element stuEle : stuList){
			if(teaEle.attributeValue("prefix").equals(stuEle.attributeValue("prefix")) && teaEle.attributeValue("attr").equals(stuEle.attributeValue("attr"))){
				teaEle.attribute("stuValue").setValue(stuEle.attributeValue("value"));
				//对比
				if(teaEle.attributeValue("attr").equals("资源文件")){
					String img1 = imgPath + teaEle.attributeValue("value");
					String img2 = imgPath + stuEle.attributeValue("value");
					if(imgCompare(img1,img2)){
						stuList.remove(stuEle);
						status = true;
						break;
					}
				}
				else if(teaEle.attributeValue("value").equals(stuEle.attributeValue("value"))){
					stuList.remove(stuEle);
					status = true;
					break;
				}
			}
		}
		if(status == true){
			teaEle.addAttribute("status","true");
			teaEle.addAttribute("stuScore",teaEle.attributeValue("score"));
			score += Double.valueOf(teaEle.attributeValue("score"));
		}
		else{
			teaEle.addAttribute("status","false");
			teaEle.addAttribute("stuScore","0");
		}
		return teaEle;
	}
	
	public Element chilEleCompare(Element teaEle) throws Exception, IOException{
		int trueCout = 0;
		List<Element> chilEles = teaEle.elements("record"); 
		for(Element chilEle:chilEles){
			boolean status = false;
			chilEle.addAttribute("stuValue", "");
			for(Element stuEle : stuList){
				if(chilEle.attributeValue("prefix").equals(stuEle.attributeValue("prefix")) && chilEle.attributeValue("attr").equals(stuEle.attributeValue("attr"))){
					chilEle.attribute("stuValue").setValue(stuEle.attributeValue("value"));
					//对比
					if(chilEle.attributeValue("attr").equals("资源文件")){
						String img1 = imgPath + chilEle.attributeValue("value");
						String img2 = imgPath + stuEle.attributeValue("value");
						if(imgCompare(img1,img2)){
							stuList.remove(stuEle);
							status = true;
							trueCout++;
							break;
						}
					}
					else if(chilEle.attributeValue("value").equals(stuEle.attributeValue("value"))){
						stuList.remove(stuEle);
						status = true;
						trueCout++;
						break;
					}
				}
			}
			chilEle.addAttribute("status",status==true?"true":"false");
		}
		if(trueCout==chilEles.size()){
			teaEle.addAttribute("status","true");
			teaEle.addAttribute("stuScore",teaEle.attributeValue("score"));
			score += Double.valueOf(teaEle.attributeValue("score"));
		}
		else{
			teaEle.addAttribute("status","false");
			teaEle.addAttribute("stuScore","0");
		}
		return teaEle;
	}
	
	@SuppressWarnings("resource")
	public boolean imgCompare(String str1,String str2) throws IOException{
		try{
			BufferedInputStream inFile1 = new BufferedInputStream(new FileInputStream(str1));
	        BufferedInputStream inFile2 = new BufferedInputStream(new FileInputStream(str2));
	        if(inFile1.available() == inFile2.available())
	        {
	            while(inFile1.read() != -1 && inFile2.read() != -1)
	                if(inFile1.read() != inFile2.read())
	                    return false;
	            return true;
	        }
		}catch(Exception e){
				System.out.println("ERROR 对比时获取图片出错...");
				return false;
		}
        return false;
	}
	
	@SuppressWarnings("unchecked")	//获取并分类标准答案的所有勾选数据
	public Document doCompare(Document teaDoc) throws IOException, Exception{
		
		Document resultDoc = DocumentHelper.createDocument();
		Element root = resultDoc.addElement("root");
		
		List<Element> teaList = teaDoc.getRootElement().elements("item");

		for(Element item:teaList){
			Element newItem = root.addElement("item");
			List<Element> teaRecords = item.elements("record");
			double itemScore = 0;
			double itemTotalScore = 0;
			for(Element rec:teaRecords){
				//加总分
				totalScore += Double.valueOf(rec.attributeValue("score"));
				itemTotalScore  += Double.valueOf(rec.attributeValue("score"));
				Element newRecord = newItem.addElement("record");
				if(rec.elements().size() > 0){
					//全部对比
					rec = chilEleCompare(rec);
					List<Element> chilRecs = rec.elements();
					for(Element chil:chilRecs){
						Element newChil = newRecord.addElement("record");
						newChil.setAttributes(chil.attributes());
					}
				}
				else{
					//部分对比
					rec = eleCompare(rec);
				}
				itemScore += Double.valueOf(rec.attributeValue("stuScore"));
				newRecord.setAttributes(rec.attributes());;
			}
			item.addAttribute("stuScore",""+itemScore);
			item.attribute("score").setValue(""+itemTotalScore);
			newItem.setAttributes(item.attributes());;
		}
		return resultDoc;
	}
	
	@SuppressWarnings("unchecked")
	public String execute(String teaPath,String stuPath,String resultPath,String imgSavePath) throws IOException {
		System.out.println(teaPath);
		teaPath = teaPath.substring(0, teaPath.length()-8) + "check.xml";
		//System.out.println(teaPath);
		try {
			//读xml
			File resource = new File(teaPath);
			File target = new File(stuPath);
			SAXReader reader = new SAXReader();
			Document teaDoc = reader.read(resource);
			Document stuDoc = reader.read(target);
			//获取标准答案勾选数据集合
			stuList = stuDoc.getRootElement().elements("record");
			imgPath = imgSavePath + "/images/";
			teaDoc = doCompare(teaDoc);
			//写xml
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("utf-8");
			XMLWriter xmlWriter = new XMLWriter(new FileWriter(resultPath),format);
			xmlWriter.write(teaDoc);
			xmlWriter.close();
			
		} catch (Exception e) { 
			e.printStackTrace();
		}
		System.out.println("得分: "+score+"/"+totalScore);
		String result = ""+score+"/"+totalScore;
		return result;
		
	}
	
}
