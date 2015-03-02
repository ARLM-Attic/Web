package jacob;

public class test {

	static String PATH = "‪D:\\Personal\\Desktop\\学生-尾注位置错.docx";
	
	public static void main(String[] args) {
		//4个参数 	   int PAPER , int ID , String PATH , String imgPath
		String c = new CallCsharp().Work(101, 0, PATH,"C:\\Users\\D\\Desktop");//PAPER,ID,PATH
	}

}
