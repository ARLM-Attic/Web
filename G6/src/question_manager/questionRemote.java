package question_manager;

import java.util.List;

import javax.ejb.Remote;
import javax.swing.ListModel;

import freemarker.cache.StrongCacheStorage;

@Remote
public interface questionRemote {
	
	public Integer insert(question q);
	
	public void delete(Integer id); //根据id删除
	
	public List<question> get_by_like_id(String id);

	
	public List<question> get(); //获得所有的题目
	
	//public question_container get(Integer start,Integer limit);
	
	public List<question> get_word(String title);
	
	public List<question> get_ppt(String title);
	
	public List<question> get_excel(String title);
	
	public List<question> get_by_user(String user);  //根据用户名查找
	
		//data : [['题目编号'],['题目标题'],['文件名'],['创建人'],['创建时间'],['最后修改人'],['最后修改时间'],['Word题目'], [ 'PowerPoint题目'], [ 'Excel题目']]  
	public List<question> get_by_title(String title);
	
	public List<question> get_by_fileName(String filename);
	
	public List<question> get_by_create_user(String arg_User);
	
	public List<question> get_by_create_time(String arg_time); 
	
	public List<question> get_by_last_change_user(String arg_User);
	
	public List<question> get_by_last_change_time(String arg_time);
	
	public question get_by_id(Integer id);  //根据题目id查找
	
	public void change_file(String title,String type,String question,String fileroute,String filename,String user,String time,Integer ID);//更改上传文件的路径
	
	public void change_Question(String title,String type,String question,String user,String time,Integer ID);//更改 题干的信息
	
	
}
