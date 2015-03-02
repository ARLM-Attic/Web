package jacob;

import java.io.FileWriter;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;


public class comTest {

	public String pptParse(Integer paper,Integer stu,String presentationFile, String xmlPath) {
		// TODO Auto-generated method stub
		String path=xmlPath+paper+"-"+stu+"-"+"check.xml";
		try {
			ActiveXComponent dotnetCom = null;
			dotnetCom = new ActiveXComponent("PPT_0309.getPptResult"); // COMTest命名空间，COMTestCLass类名			
			Dispatch.call(dotnetCom, "doMain", paper, stu, presentationFile, xmlPath);
			//----------生成XML空文件---------------
			//----------生成XML空文件---------------
			Document newDoc = DocumentHelper.createDocument();
			Element root = newDoc.addElement("root");
			root.addElement("itemCount").setText("0");
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("utf-8");
			XMLWriter xmlWriter = new XMLWriter(new FileWriter(path),format);
			xmlWriter.write(newDoc);
			xmlWriter.close();
			return "SUCCESS";
		} catch (Exception ex) {
			ex.printStackTrace();
			return "ERROR";
		}

	}

}
