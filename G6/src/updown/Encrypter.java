package updown;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * 对字符串进行编码操作的类
 * @author 
 *
 */
public class Encrypter {
	
	/**
	 * 对字符串进行32位MD5加密
	 * @param str - 需要加密的字符串
	 * @return 将字符串进行MD5加密后的值
	 */
	public static String md5(String str){
		MessageDigest messageDigest = null;     
	     
        try {     
            messageDigest = MessageDigest.getInstance("MD5");     
     
            messageDigest.reset();     
     
            messageDigest.update(str.getBytes("UTF-8"));     
        } catch (NoSuchAlgorithmException e) {     
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
        	e.printStackTrace();
        }     
     
        byte[] byteArray = messageDigest.digest();     
     
        StringBuffer md5StrBuff = new StringBuffer();     
     
        for (int i = 0; i < byteArray.length; i++) {                 
            if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)     
                md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));     
            else     
                md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));     
        }     
     
        return md5StrBuff.toString();   
	}
	
	/**
	 * 生成一个18位随机的文件名. 生成规则如下: 前面14位由日期时间生成,生成形式为"yyyyMMddHHmmss", 
	 * 后4位由伪随机数(0-9999,不足4位则补0)构成
	 * @return
	 */
	public static String randFileName(){
		String result = "";
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd--HH-mm-ss--");
		result += sdf.format(date);
		Double rand =  Math.random()*10000;
		if(rand < 10)
			result += "000" + rand.toString().substring(0, 1);
		else if(rand < 100)
			result += "00" + rand.toString().substring(0, 2);
		else if(rand < 1000)
			result += "0" + rand.toString().substring(0, 3);
		else
			result += rand.toString().substring(0, 4);
		
		return result;
	}
	
}
