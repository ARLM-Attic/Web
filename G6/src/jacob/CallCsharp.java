package jacob;

import java.io.FileWriter;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import com.jacob.activeX.*;
import com.jacob.com.*;

public class CallCsharp {

	public String Work(int PAPER,int ID,String PATH,String savePath){
		String path=savePath+"\\"+PAPER+"-"+ID+"-"+"check.xml";
		try {
			ActiveXComponent dotnetCom = null;
			dotnetCom = new ActiveXComponent("Xml_Dll.Class1");
			Variant str = Dispatch.call(dotnetCom,"Main",PAPER,ID,PATH,savePath);
			//----------生成XML空文件---------------
			Document newDoc = DocumentHelper.createDocument();
			Element root = newDoc.addElement("root");
			root.addElement("itemCount").setText("0");
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("utf-8");
			XMLWriter xmlWriter = new XMLWriter(new FileWriter(path),format);
			xmlWriter.write(newDoc);
			xmlWriter.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "End";
	}
}
