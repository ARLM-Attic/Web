package jacob;
import com.jacob.activeX.*;
import com.jacob.com.*;

public class Docx_Compare {
	
	static String CONNSTR="Data source=orcl;User id=root;Password=root";
	static String score;
	public String Work(int STU_ID,int PAPER_ID,String SCORE){
		try {
			ActiveXComponent dotnetCom = null;
			dotnetCom = new ActiveXComponent("comparsion.Class1");
			Variant vartxt=Dispatch.call(dotnetCom,"Getscore", STU_ID,PAPER_ID);// 学生ID,试卷ID,总分
			 score=vartxt.toString();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return score;
	}
}