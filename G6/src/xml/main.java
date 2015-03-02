package xml;

import java.io.IOException;

public class main {
	
	public static void main(String[] args) throws IOException {
        long lasting = System.currentTimeMillis(); 
        String result = new xml.compare_new().execute("C:/Users/D/Desktop/teaCheck.xml", "C:/Users/D/Desktop/stuAttrs.xml", "C:/Users/D/Desktop/myResult.xml", "C:/Users/D/Desktop");
        System.out.println(result);
		lasting = System.currentTimeMillis()-lasting; 
		System.out.println("处理时间:"+lasting+"ms");
	}
	
}