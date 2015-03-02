package jacob;

import java.io.FileWriter;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

public class Excel {
	
	public void Connection(String path,Integer testid, String picturepath,String xmlpath,int ID)
	{
		
		try {
			ActiveXComponent dotnetCom = null;
			//dotnetCom = new ActiveXComponent("ExcelAnalyseDll.ExcelAnalyseDllClass"); // COMTest命名空间，COMTestCLass类名
			//Dispatch.call(dotnetCom, "say", info);//调用say方法
			dotnetCom = new ActiveXComponent("ExcelXmlDll.ExcelXmlDllClass");
			 Dispatch.call(dotnetCom, "ExcelAnalyse", path,testid,picturepath,xmlpath,ID);
			//----------生成XML空文件---------------
			 String path1=xmlpath+"\\"+testid+"-"+ID+"-"+"check.xml";
			//----------生成XML空文件---------------
				Document newDoc = DocumentHelper.createDocument();
				Element root = newDoc.addElement("root");
				root.addElement("itemCount").setText("0");
				OutputFormat format = OutputFormat.createPrettyPrint();
				format.setEncoding("utf-8");
				XMLWriter xmlWriter = new XMLWriter(new FileWriter(path1),format);
				xmlWriter.write(newDoc);
				xmlWriter.close();
		   }catch (Exception ex) {
				ex.printStackTrace();
		}


	}

}
